import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  institution?: string | null;
  specialization?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  linkedin_url?: string | null;
  public_display?: boolean;
  is_core_team?: boolean;
  mfa_enabled?: boolean;
  mfa_enrolled_at?: string | null;
  mfa_backup_codes_generated_at?: string | null;
  notification_preferences?: any;
  approval_status?: 'pending' | 'approved' | 'rejected';
  approved_by?: string | null;
  approved_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [userId]);

  const ensureProfileExists = async (session: any) => {
    try {
      const uid = session?.user?.id;
      const email = session?.user?.email ?? null;
      const meta = session?.user?.user_metadata ?? {};
      if (!uid) return false;

      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: uid,
            email,
            first_name: meta.first_name ?? '',
            last_name: meta.last_name ?? '',
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.warn('Profile upsert failed:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('ensureProfileExists error', e);
      return false;
    }
  };

  const fetchProfile = async (retryCount = 0) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Log current auth context for debugging
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Fetching profile - userId:', userId, 'session.user.id:', session?.user?.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        // Retry logic for transient/permission errors
        if (retryCount < 3) {
          const delays = [500, 1000, 2000];
          const delay = delays[retryCount];
          console.warn(`Profile fetch error. Retrying in ${delay}ms (attempt ${retryCount + 1}/3)`, error);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchProfile(retryCount + 1);
        }
        throw error;
      }

      if (!data) {
        console.warn('No profile found. Attempting to create one for current user');
        const created = await ensureProfileExists(session);
        if (created) {
          // Re-fetch once after creating profile
          const { data: data2, error: err2 } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (!err2 && data2) {
            setProfile(data2 as Profile);
            return;
          }
        }

        // If still missing, retry with backoff
        if (retryCount < 3) {
          const delays = [500, 1000, 2000];
          const delay = delays[retryCount];
          console.warn(`Profile still missing. Retrying in ${delay}ms (attempt ${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchProfile(retryCount + 1);
        }

        // Give up gracefully
        setProfile(null);
        return;
      }

      setProfile(data as Profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      // Don't show toast for missing profile, just log it
      if (error.code !== 'PGRST116') {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      // Always set loading to false, even on error
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!userId) {
      throw new Error('No user ID');
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      setProfile(data as Profile);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
}
