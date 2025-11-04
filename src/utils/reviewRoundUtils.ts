import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";

export interface ReviewRound {
  id: string;
  name: string;
  description?: string;
  round_number: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  start_date: string;
  end_date?: string;
  default_deadline?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  total_products: number;
  total_assignments: number;
}

export interface ReviewRoundStats {
  id: string;
  round_id: string;
  total_assignments: number;
  completed_count: number;
  in_progress_count: number;
  pending_count: number;
  updated_at: string;
}

export interface ReviewerExpertise {
  user_id: string;
  category: string;
  priority: number;
  notes?: string;
}

export interface ReviewerWithExpertise {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  expertise: ReviewerExpertise[];
  current_workload: number;
}

/**
 * Creates a new review round
 */
export async function createReviewRound(roundData: {
  name: string;
  description?: string;
  round_number: number;
  start_date: string;
  end_date?: string;
  default_deadline?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('review_rounds')
    .insert({
      ...roundData,
      created_by: user?.id,
      status: 'draft'
    })
    .select()
    .single();

  if (error) throw error;
  return data as ReviewRound;
}

/**
 * Gets all reviewers with their expertise preferences
 */
export async function getReviewersByExpertise(category?: string): Promise<ReviewerWithExpertise[]> {
  // Get all users with reviewer role
  const { data: reviewerRoles, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', 'reviewer');

  if (rolesError) throw rolesError;
  if (!reviewerRoles || reviewerRoles.length === 0) return [];

  const reviewerIds = reviewerRoles.map(r => r.user_id);

  // Get reviewer profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name')
    .in('id', reviewerIds);

  if (profilesError) throw profilesError;

  // Get expertise for all reviewers
  const { data: expertise, error: expertiseError } = await supabase
    .from('reviewer_expertise')
    .select('*')
    .in('user_id', reviewerIds);

  if (expertiseError) throw expertiseError;

  // Get current workload (pending + in_progress reviews)
  const { data: reviews, error: reviewsError } = await supabase
    .from('product_reviews')
    .select('assigned_to')
    .in('assigned_to', reviewerIds)
    .in('status', ['pending', 'in_progress']);

  if (reviewsError) throw reviewsError;

  // Build reviewer objects with expertise
  const reviewers: ReviewerWithExpertise[] = profiles.map(profile => {
    const userExpertise = expertise?.filter(e => e.user_id === profile.id) || [];
    const workload = reviews?.filter(r => r.assigned_to === profile.id).length || 0;

    return {
      user_id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      expertise: userExpertise,
      current_workload: workload
    };
  });

  // Filter by category if specified
  if (category) {
    return reviewers.filter(r => 
      r.expertise.some(e => e.category === category)
    );
  }

  return reviewers;
}

/**
 * Calculates optimal workload distribution for reviewers
 */
export function calculateReviewerWorkload(
  reviewers: ReviewerWithExpertise[],
  totalProducts: number
): Map<string, number> {
  const workloadMap = new Map<string, number>();
  
  if (reviewers.length === 0) return workloadMap;

  // Base allocation
  const baseAllocation = Math.floor(totalProducts / reviewers.length);
  const remainder = totalProducts % reviewers.length;

  // Sort reviewers by current workload (ascending)
  const sortedReviewers = [...reviewers].sort((a, b) => 
    a.current_workload - b.current_workload
  );

  // Distribute evenly with consideration for current workload
  sortedReviewers.forEach((reviewer, index) => {
    let allocation = baseAllocation;
    
    // Give extra products to reviewers with lower current workload
    if (index < remainder) {
      allocation += 1;
    }
    
    workloadMap.set(reviewer.user_id, allocation);
  });

  return workloadMap;
}

/**
 * Assigns products to reviewers based on expertise and workload
 */
export async function bulkAssignProducts(
  roundId: string,
  productIds: string[],
  deadline?: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  try {
    // Get all reviewers with expertise
    const reviewers = await getReviewersByExpertise();
    
    if (reviewers.length === 0) {
      throw new Error('No reviewers with expertise found');
    }

    // Get product details from static data
    const products = ALL_PRODUCTS.filter(p => productIds.includes(p.id))
      .map(p => ({
        id: p.id,
        category: p.category
      }));

    // Calculate target workload per reviewer
    const workloadMap = calculateReviewerWorkload(reviewers, productIds.length);

    // Track assignments per reviewer
    const assignmentCount = new Map<string, number>();
    reviewers.forEach(r => assignmentCount.set(r.user_id, 0));

    // Create assignments
    const assignments = [];

    for (const product of products) {
      // Find reviewers with matching expertise
      const matchingReviewers = reviewers.filter(r =>
        r.expertise.some(e => e.category === product.category)
      ).sort((a, b) => {
        // Sort by: 1) priority (lower is better), 2) current assignments
        const aPriority = a.expertise.find(e => e.category === product.category)?.priority || 10;
        const bPriority = b.expertise.find(e => e.category === product.category)?.priority || 10;
        
        if (aPriority !== bPriority) return aPriority - bPriority;
        
        const aCount = assignmentCount.get(a.user_id) || 0;
        const bCount = assignmentCount.get(b.user_id) || 0;
        return aCount - bCount;
      });

      if (matchingReviewers.length === 0) {
        // No matching expertise, assign to reviewer with least workload
        const leastLoadedReviewer = reviewers.reduce((min, r) => {
          const count = assignmentCount.get(r.user_id) || 0;
          const minCount = assignmentCount.get(min.user_id) || 0;
          return count < minCount ? r : min;
        });

        assignments.push({
          product_id: product.id,
          assigned_to: leastLoadedReviewer.user_id,
          review_round_id: roundId,
          status: 'pending',
          priority: 'medium',
          deadline: deadline || null
        });

        assignmentCount.set(
          leastLoadedReviewer.user_id, 
          (assignmentCount.get(leastLoadedReviewer.user_id) || 0) + 1
        );
      } else {
        // Assign to best matching reviewer
        const assignedTo = matchingReviewers[0].user_id;
        
        assignments.push({
          product_id: product.id,
          assigned_to: assignedTo,
          review_round_id: roundId,
          status: 'pending',
          priority: 'medium',
          deadline: deadline || null
        });

        assignmentCount.set(assignedTo, (assignmentCount.get(assignedTo) || 0) + 1);
      }
    }

    // Insert all assignments
    const { error: insertError } = await supabase
      .from('product_reviews')
      .insert(assignments);

    if (insertError) throw insertError;

    success = assignments.length;

    // Update round totals
    await supabase
      .from('review_rounds')
      .update({
        total_products: productIds.length,
        total_assignments: assignments.length
      })
      .eq('id', roundId);

  } catch (error) {
    console.error('Bulk assignment error:', error);
    errors.push(error instanceof Error ? error.message : 'Unknown error');
    failed = productIds.length - success;
  }

  return { success, failed, errors };
}

/**
 * Gets statistics for a review round
 */
export async function getRoundStatistics(roundId: string): Promise<ReviewRoundStats | null> {
  const { data, error } = await supabase
    .from('review_round_stats')
    .select('*')
    .eq('round_id', roundId)
    .single();

  if (error) {
    console.error('Error fetching round stats:', error);
    return null;
  }

  return data;
}

/**
 * Updates the status of a review round
 */
export async function updateRoundStatus(
  roundId: string,
  status: 'draft' | 'active' | 'completed' | 'archived'
) {
  const { error } = await supabase
    .from('review_rounds')
    .update({ status })
    .eq('id', roundId);

  if (error) throw error;
}
