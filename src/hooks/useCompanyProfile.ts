import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CompanyProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  company_id: string | null;
  position: string | null;
  department: string | null;
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useCompanyProfile(userId: string | null, enabled: boolean = true) {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
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
        .from('company_profiles' as any)
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data as unknown as CompanyProfile | null);
    } catch (error: any) {
      console.error('Failed to fetch company profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<CompanyProfile>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('company_profiles' as any)
        .upsert({
          user_id: userId,
          ...updates,
        })
        .eq('user_id', userId);

      if (error) throw error;

      await fetchProfile();
      toast({
        title: 'Success',
        description: 'Company profile updated successfully',
      });
    } catch (error: any) {
      console.error('Failed to update company profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update company profile',
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
