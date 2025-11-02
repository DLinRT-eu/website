import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  admin_level: string;
  permissions: any;
  created_at: string;
  updated_at: string;
}

export function useAdminProfile(userId: string | null, enabled: boolean = true) {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
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
        .from('admin_profiles' as any)
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Failed to fetch admin profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<AdminProfile>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('admin_profiles' as any)
        .upsert({
          user_id: userId,
          ...updates,
        })
        .eq('user_id', userId);

      if (error) throw error;

      await fetchProfile();
      toast({
        title: 'Success',
        description: 'Admin profile updated successfully',
      });
    } catch (error: any) {
      console.error('Failed to update admin profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update admin profile',
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
