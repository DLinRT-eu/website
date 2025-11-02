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

  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Check if it's an RLS error (no rows returned)
        if (error.code === 'PGRST116') {
          console.warn('Profile not found or RLS policy blocking access');
        }
        throw error;
      }

      setProfile(data);
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

      setProfile(data);
      
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
