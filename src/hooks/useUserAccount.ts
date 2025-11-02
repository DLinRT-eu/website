import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserAccount {
  id: string;
  email: string;
  username: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserAccount(userId: string | null) {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      setAccount(null);
      setLoading(false);
      return;
    }
    fetchAccount();
  }, [userId]);

  const fetchAccount = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_accounts' as any)
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Auto-create account if missing
        const session = await supabase.auth.getSession();
        const { data: newAccount, error: insertError } = await supabase
          .from('user_accounts' as any)
          .insert({
            id: userId,
            email: session.data.session?.user?.email ?? '',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setAccount(newAccount as unknown as UserAccount);
        return;
      }

      setAccount(data as unknown as UserAccount);
    } catch (error: any) {
      console.error('Failed to fetch user account:', error);
      toast({
        title: 'Error',
        description: 'Failed to load account information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (updates: Partial<UserAccount>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_accounts' as any)
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      await fetchAccount();
      toast({
        title: 'Success',
        description: 'Account updated successfully',
      });
    } catch (error: any) {
      console.error('Failed to update account:', error);
      toast({
        title: 'Error',
        description: 'Failed to update account',
        variant: 'destructive',
      });
    }
  };

  return {
    account,
    loading,
    updateAccount,
    refetch: fetchAccount,
  };
}
