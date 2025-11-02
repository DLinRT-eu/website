import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ReviewerProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  institution: string | null;
  specialization: string | null;
  bio: string | null;
  linkedin_url: string | null;
  profile_image_url: string | null;
  public_display: boolean;
  is_core_team: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useReviewerProfile(userId: string | null, enabled: boolean = true) {
  const [profile, setProfile] = useState<ReviewerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId || !enabled) {
      setProfile(null);
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [userId, enabled]);

  const fetchProfile = async () => {
    if (!userId || !enabled) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviewer_profiles' as any)
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data as unknown as ReviewerProfile | null);
    } catch (error: any) {
      console.error('Failed to fetch reviewer profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ReviewerProfile>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('reviewer_profiles' as any)
        .upsert({
          user_id: userId,
          ...updates,
        })
        .eq('user_id', userId);

      if (error) throw error;

      await fetchProfile();
      toast({
        title: 'Success',
        description: 'Reviewer profile updated successfully',
      });
    } catch (error: any) {
      console.error('Failed to update reviewer profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update reviewer profile',
        variant: 'destructive',
      });
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
}
