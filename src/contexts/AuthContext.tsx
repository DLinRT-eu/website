import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import bcrypt from 'bcryptjs';

type AppRole = 'admin' | 'reviewer' | 'company';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  institution?: string;
  specialization?: string;
  bio?: string;
  profile_image_url?: string;
  linkedin_url?: string;
  public_display: boolean;
  display_order: number;
  mfa_enabled?: boolean;
  mfa_enrolled_at?: string;
  mfa_backup_codes_generated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  highestRole: AppRole | null;
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
  loading: boolean;
  mfaRequired: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; mfaRequired?: boolean }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  verifyMFA: (code: string, isBackupCode: boolean) => Promise<{ error: any }>;
  resendVerificationEmail: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const fetchRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (!error && data) {
      setRoles(data.map(r => r.role as AppRole));
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await fetchRoles(user.id);
    }
  };

  useEffect(() => {
    // Session timeout with inactivity detection (30 minutes)
    let inactivityTimer: NodeJS.Timeout;
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (user) {
        inactivityTimer = setTimeout(() => {
          signOut();
          toast({
            title: 'Session expired',
            description: 'You have been logged out due to inactivity.',
          });
        }, INACTIVITY_TIMEOUT);
      }
    };
    
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });
    
    resetTimer();
    
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [user]);

  // Helper function to hash strings for privacy
  const hashString = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile/roles fetching
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchRoles(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchRoles(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Check for account lockout (5 failed attempts in 15 minutes)
      const hashedEmail = await hashString(email);
      const { data: recentFailures } = await supabase
        .from('security_events')
        .select('*')
        .eq('event_type', 'failed_login')
        .eq('ip_hash', hashedEmail) // Using email hash as identifier for client-side
        .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString());
      
      if (recentFailures && recentFailures.length >= 5) {
        toast({
          title: "Account temporarily locked",
          description: "Too many failed login attempts. Please try again in 15 minutes.",
          variant: "destructive",
        });
        return { error: new Error('Account temporarily locked') };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Log failed login attempt
        await supabase.from('security_events').insert({
          event_type: 'failed_login',
          severity: 'medium',
          ip_hash: hashedEmail,
          details: { email, timestamp: new Date().toISOString() },
        });

        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Log successful login
      await supabase.from('security_events').insert({
        event_type: 'successful_login',
        severity: 'info',
        ip_hash: hashedEmail,
        details: { email, timestamp: new Date().toISOString() },
      });

      // Check if MFA is required
      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      const requiresMFA = aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2';
      
      if (requiresMFA) {
        setMfaRequired(true);
        return { error: null, mfaRequired: true };
      }

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const verifyMFA = async (code: string, isBackupCode: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { error: new Error('User not found') };

      // Check rate limiting
      const { data: recentAttempts } = await supabase
        .from('mfa_activity_log')
        .select('*')
        .eq('user_id', user.id)
        .eq('action', 'failed_verification')
        .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString());
      
      if (recentAttempts && recentAttempts.length >= 5) {
        return { error: new Error('Too many failed attempts. Please try again in 15 minutes.') };
      }

      if (isBackupCode) {
        // Verify backup code
        const { data: backupCodes, error: fetchError } = await supabase
          .from('mfa_backup_codes')
          .select('*')
          .eq('user_id', user.id)
          .eq('used', false);
        
        if (fetchError || !backupCodes?.length) {
          await supabase.from('mfa_activity_log').insert({
            user_id: user.id,
            action: 'failed_verification',
            factor_type: 'backup_code',
          });
          return { error: new Error('No valid backup codes found') };
        }
        
        // Check if code matches any unused backup code
        for (const dbCode of backupCodes) {
          const isMatch = await bcrypt.compare(code, dbCode.code_hash);
          if (isMatch) {
            // Mark as used
            await supabase
              .from('mfa_backup_codes')
              .update({ used: true, used_at: new Date().toISOString() })
              .eq('id', dbCode.id);
            
            // Log activity
            await supabase.from('mfa_activity_log').insert({
              user_id: user.id,
              action: 'verified_backup_code',
              factor_type: 'backup_code',
            });
            
            setMfaRequired(false);
            toast({
              title: "Verification successful",
              description: "You are now signed in using a backup code.",
            });
            return { error: null };
          }
        }
        
        // Log failed backup code attempt
        await supabase.from('mfa_activity_log').insert({
          user_id: user.id,
          action: 'failed_verification',
          factor_type: 'backup_code',
        });
        
        return { error: new Error('Invalid backup code') };
      }
      
      // TOTP verification
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.find((f) => f.status === 'verified');
      
      if (!factor) {
        return { error: new Error('No MFA factor found') };
      }

      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: factor.id,
      });

      if (challengeError) return { error: challengeError };

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: challenge.id,
        code,
      });

      if (verifyError) {
        // Log failed TOTP attempt
        await supabase.from('mfa_activity_log').insert({
          user_id: user.id,
          action: 'failed_verification',
          factor_type: 'totp',
        });
        return { error: verifyError };
      }

      // Log successful TOTP verification
      await supabase.from('mfa_activity_log').insert({
        user_id: user.id,
        action: 'verified_totp',
        factor_type: 'totp',
      });

      setMfaRequired(false);
      toast({
        title: "Verification successful",
        description: "You are now signed in.",
      });

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created successfully!",
        description: "Please check your email and click the verification link to activate your account. You must verify your email before requesting roles or accessing protected features.",
        duration: 10000,
      });
    }

    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('lastActivity');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
    }
  };

  const resendVerificationEmail = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "No user email found",
        variant: "destructive",
      });
      return { error: new Error('No user email found') };
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      toast({
        title: "Failed to resend",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email sent",
        description: "Check your inbox for the verification link.",
      });
    }

    return { error };
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      await fetchProfile(user.id);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }

    return { error };
  };

  const highestRole = roles.length > 0 
    ? (roles.includes('admin') ? 'admin' : roles.includes('reviewer') ? 'reviewer' : 'company')
    : null;

  const value: AuthContextType = {
    user,
    session,
    profile,
    roles,
    highestRole,
    isAdmin: roles.includes('admin'),
    isReviewer: roles.includes('reviewer'),
    isCompany: roles.includes('company'),
    loading,
    mfaRequired,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    verifyMFA,
    resendVerificationEmail,
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
