import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useProfile, Profile } from '@/hooks/useProfile';

type AppRole = 'admin' | 'reviewer' | 'company';

interface SignUpData {
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, data: SignUpData) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
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
  refreshProfile: () => Promise<void>;
}

// Create context with null as initial value instead of undefined
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use the useProfile hook to manage profile data (legacy profiles table)
  const { profile, loading: profileLoading, updateProfile: updateProfileData, refetch: refreshProfile } = useProfile(user?.id || null);

  // Set up auth state listener
  useEffect(() => {
    console.log('[Auth] Initializing auth listener');
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('[Auth] State change:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Add small delay to ensure session context is fully established
        if (currentSession?.user) {
          setTimeout(() => {
            console.log('[Auth] Session context ready after state change');
          }, 100);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('[Auth] Initial session:', existingSession ? 'Found' : 'None');
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
      
      // Add small delay to ensure session context is fully established
      if (existingSession?.user) {
        setTimeout(() => {
          console.log('[Auth] Session context ready for initial profile fetch');
        }, 100);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: new Error('Invalid email or password. Please try again.') };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: new Error('Please verify your email address before signing in.') };
        }
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign in failed');
      return { error };
    }
  };

  const signUp = async (email: string, password: string, data: SignUpData) => {
    try {
      // Check if email domain is institutional
      const emailDomain = email.toLowerCase().split('@')[1];
      const blockedDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'live.com', 'msn.com', 'aol.com', 'icloud.com',
        'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
        'gmx.com', 'inbox.com', 'fastmail.com', 'hushmail.com'
      ];
      
      if (blockedDomains.includes(emailDomain)) {
        return { error: new Error('Please use an institutional email address (e.g., university or company email).') };
      }
      
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
        // Provide user-friendly error messages
        if (error.message.includes('already registered')) {
          return { error: new Error('This email is already registered. Please sign in instead.') };
        }
        if (error.message.includes('email not confirmed')) {
          return { error: new Error('Please verify your email address before signing in.') };
        }
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      console.error('[Auth] Sign up failed');
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

  const value: AuthContextType = {
    user,
    session,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    profile,
    updateProfile: updateProfileData,
    resendVerificationEmail,
    refreshProfile,
    // Stubs - use useRoles() hook instead
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
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
