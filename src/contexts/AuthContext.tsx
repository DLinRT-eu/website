import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useProfile, Profile } from '@/hooks/useProfile';

type AppRole = 'admin' | 'reviewer' | 'company';

// Profile type is now imported from useProfile hook

interface SignUpData {
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, data: SignUpData) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  // Phase 2+ properties (stubs for now)
  profile: Profile | null;
  roles: AppRole[];
  highestRole: AppRole | null;
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
  activeRole: string | null;
  availableRoles: string[];
  requiresRoleSelection: boolean;
  setActiveRole: (role: string) => void;
  updateProfile: (data: Partial<Profile>) => Promise<{ data: any; error: any }>;
  resendVerificationEmail: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Phase 2: Use the useProfile hook to manage profile data
  const { profile, loading: profileLoading, updateProfile: updateProfileData } = useProfile(user?.id || null);

  // Set up auth state listener
  useEffect(() => {
    console.log('[Auth] Initializing auth listener');
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('[Auth] State change:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('[Auth] Initial session:', existingSession ? 'Found' : 'None');
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('[Auth] Signing in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[Auth] Sign in error:', error.message);
        return { error };
      }

      console.log('[Auth] Sign in successful');
      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign in exception:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, data: SignUpData) => {
    try {
      console.log('[Auth] Signing up...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (error) {
        console.error('[Auth] Sign up error:', error.message);
        return { error };
      }

      console.log('[Auth] Sign up successful - check email for verification');
      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign up exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('[Auth] Signing out...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[Auth] Sign out error:', error.message);
        return;
      }

      console.log('[Auth] Sign out successful');
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('[Auth] Sign out exception:', error);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (!user?.email) {
        return { error: new Error('No email address found') };
      }
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading: loading || profileLoading, // Combined loading state
    signIn,
    signUp,
    signOut,
    // Phase 2: Profile management (now implemented)
    profile,
    updateProfile: updateProfileData,
    resendVerificationEmail,
    // Phase 3+ stubs - will be implemented later
    roles: [] as AppRole[],
    highestRole: null,
    isAdmin: false,
    isReviewer: false,
    isCompany: false,
    activeRole: null,
    availableRoles: [],
    requiresRoleSelection: false,
    setActiveRole: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
