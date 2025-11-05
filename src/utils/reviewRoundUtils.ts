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
  preference_type: 'category' | 'company' | 'product';
  category?: string;
  company_id?: string;
  product_id?: string;
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
    const userExpertise = (expertise?.filter(e => e.user_id === profile.id) || []) as ReviewerExpertise[];
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
      r.expertise.some(e => e.preference_type === 'category' && e.category === category)
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
 * Calculates proposed assignments without inserting them
 * Handles reviewers with and without expertise preferences
 */
export async function calculateProposedAssignments(
  productIds: string[],
  selectedReviewerIds?: string[]
): Promise<Array<{ product_id: string; assigned_to: string; match_score: number }>> {
  // Get all reviewers with expertise
  let reviewers = await getReviewersByExpertise();
  
  // Filter by selected reviewers if provided
  if (selectedReviewerIds && selectedReviewerIds.length > 0) {
    reviewers = reviewers.filter(r => selectedReviewerIds.includes(r.user_id));
  }
  
  if (reviewers.length === 0) {
    throw new Error('No reviewers available for assignment');
  }

  // Get product details from static data
  const products = ALL_PRODUCTS.filter(p => productIds.includes(p.id))
    .map(p => ({
      id: p.id,
      name: p.name,
      company: p.company,
      category: p.category
    }));

  // Separate reviewers by expertise status
  const reviewersWithExpertise = reviewers.filter(r => r.expertise.length > 0);
  const reviewersWithoutExpertise = reviewers.filter(r => r.expertise.length === 0);

  // Calculate target workload per reviewer (for balancing)
  const maxPerReviewer = Math.ceil(productIds.length / reviewers.length);
  
  // Track assignments per reviewer
  const assignmentCount = new Map<string, number>();
  reviewers.forEach(r => assignmentCount.set(r.user_id, 0));

  const assignments = [];

  // If all reviewers have no expertise, do pure random balanced distribution
  if (reviewersWithExpertise.length === 0) {
    // Shuffle products for random distribution
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    
    shuffledProducts.forEach((product, index) => {
      // Round-robin assignment for perfect balance
      const reviewerIndex = index % reviewers.length;
      const reviewer = reviewers[reviewerIndex];
      
      assignments.push({
        product_id: product.id,
        assigned_to: reviewer.user_id,
        match_score: 0 // No expertise match
      });
      
      const currentCount = assignmentCount.get(reviewer.user_id) || 0;
      assignmentCount.set(reviewer.user_id, currentCount + 1);
    });
    
    return assignments;
  }

  // Mixed approach: expertise-based + random
  for (const product of products) {
    // Calculate match score for reviewers WITH expertise
    const expertiseScores = reviewersWithExpertise.map(reviewer => {
      let score = 0;

      // Product match (highest weight = 5)
      const productMatch = reviewer.expertise.find(e => 
        e.preference_type === 'product' && e.product_id === product.id
      );
      if (productMatch) {
        score += (11 - productMatch.priority) * 5;
      }

      // Company match (medium weight = 2)
      const companyMatch = reviewer.expertise.find(e => 
        e.preference_type === 'company' && e.company_id === product.company.toLowerCase().replace(/\s+/g, '-')
      );
      if (companyMatch) {
        score += (11 - companyMatch.priority) * 2;
      }

      // Category match (base weight = 3)
      const categoryMatch = reviewer.expertise.find(e => 
        e.preference_type === 'category' && e.category === product.category
      );
      if (categoryMatch) {
        score += (11 - categoryMatch.priority) * 3;
      }

      const currentCount = assignmentCount.get(reviewer.user_id) || 0;

      return {
        reviewer,
        score,
        currentCount,
        hasExpertise: true
      };
    });

    // Include reviewers WITHOUT expertise for balanced distribution
    const noExpertiseScores = reviewersWithoutExpertise.map(reviewer => ({
      reviewer,
      score: 0,
      currentCount: assignmentCount.get(reviewer.user_id) || 0,
      hasExpertise: false
    }));

    // Combine all reviewers
    const allReviewerScores = [...expertiseScores, ...noExpertiseScores];

    // Sort by: 1) score (higher is better), 2) current count (fewer is better)
    const sortedReviewers = allReviewerScores
      .filter(rs => rs.currentCount < maxPerReviewer) // Don't exceed max
      .sort((a, b) => {
        // If both have good scores, prefer lower workload
        if (a.score > 0 && b.score > 0) {
          if (b.score !== a.score) return b.score - a.score;
          return a.currentCount - b.currentCount;
        }
        // Prefer any match over no match
        if (a.score > 0 && b.score === 0) return -1;
        if (b.score > 0 && a.score === 0) return 1;
        // Both have no match, just balance workload
        return a.currentCount - b.currentCount;
      });

    if (sortedReviewers.length === 0) {
      // All reviewers at max, find one with most capacity
      const leastLoaded = allReviewerScores.reduce((min, r) => 
        r.currentCount < min.currentCount ? r : min
      );
      
      assignments.push({
        product_id: product.id,
        assigned_to: leastLoaded.reviewer.user_id,
        match_score: leastLoaded.score
      });
      
      assignmentCount.set(leastLoaded.reviewer.user_id, leastLoaded.currentCount + 1);
    } else {
      const best = sortedReviewers[0];
      assignments.push({
        product_id: product.id,
        assigned_to: best.reviewer.user_id,
        match_score: best.score
      });
      
      assignmentCount.set(best.reviewer.user_id, best.currentCount + 1);
    }
  }

  return assignments;
}

/**
 * Assigns products to reviewers based on expertise and workload
 */
export async function bulkAssignProducts(
  roundId: string,
  productIds: string[],
  deadline?: string,
  proposedAssignments?: Array<{ product_id: string; assigned_to: string; match_score: number }>
): Promise<{ success: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  try {
    // Get current user for audit logging
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let assignments;
    
    // Use provided assignments or calculate new ones
    if (proposedAssignments && proposedAssignments.length > 0) {
      assignments = proposedAssignments.map(pa => ({
        product_id: pa.product_id,
        assigned_to: pa.assigned_to,
        review_round_id: roundId,
        status: 'pending' as const,
        priority: 'medium' as const,
        deadline: deadline || null
      }));
    } else {
      // Fallback to old behavior for backward compatibility
      const proposed = await calculateProposedAssignments(productIds);
      assignments = proposed.map(pa => ({
        product_id: pa.product_id,
        assigned_to: pa.assigned_to,
        review_round_id: roundId,
        status: 'pending' as const,
        priority: 'medium' as const,
        deadline: deadline || null
      }));
    }

    // Insert all assignments
    const { error: insertError } = await supabase
      .from('product_reviews')
      .insert(assignments);

    if (insertError) throw insertError;

    success = assignments.length;

    // Create assignment history records
    const historyRecords = assignments.map(a => ({
      review_round_id: roundId,
      product_id: a.product_id,
      assigned_to: a.assigned_to,
      changed_by: user.id,
      change_type: 'initial' as const,
      reason: 'Automatic assignment during round start'
    }));

    const { error: historyError } = await supabase
      .from('assignment_history')
      .insert(historyRecords);

    if (historyError) {
      console.error('Error creating assignment history:', historyError);
      // Don't fail the whole operation if history logging fails
    }

    // Get round details for notifications
    const { data: round } = await supabase
      .from('review_rounds')
      .select('name')
      .eq('id', roundId)
      .single();

    // Group assignments by reviewer for notifications
    const assignmentsByReviewer = new Map<string, string[]>();
    assignments.forEach(a => {
      const products = assignmentsByReviewer.get(a.assigned_to) || [];
      products.push(a.product_id);
      assignmentsByReviewer.set(a.assigned_to, products);
    });

    // Send email notifications to each reviewer
    const notificationPromises = Array.from(assignmentsByReviewer.entries()).map(
      async ([reviewerId, productIds]) => {
        try {
          const productNames = productIds
            .map(id => ALL_PRODUCTS.find(p => p.id === id)?.name)
            .filter(Boolean) as string[];

          await supabase.functions.invoke('notify-reviewer-assignment', {
            body: {
              reviewerId,
              roundName: round?.name || 'Review Round',
              assignmentCount: productIds.length,
              deadline: deadline || null,
              productNames
            }
          });
        } catch (error) {
          console.error(`Failed to send notification to reviewer ${reviewerId}:`, error);
          // Don't fail the whole operation if notifications fail
        }
      }
    );

    // Send notifications in parallel but don't wait for them
    Promise.all(notificationPromises).catch(err => 
      console.error('Some notifications failed:', err)
    );

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
