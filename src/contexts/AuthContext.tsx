import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  approval_status?: string;
  approved_by?: string;
  approved_at?: string;
  is_core_team?: boolean;
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
  activeRole: string | null;
  availableRoles: string[];
  requiresRoleSelection: boolean;
  loading: boolean;
  mfaRequired: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; mfaRequired?: boolean }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  verifyMFA: (code: string, isBackupCode: boolean) => Promise<{ error: any }>;
  resendVerificationEmail: () => Promise<{ error: Error | null }>;
  setActiveRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [activeRole, setActiveRoleState] = useState<string | null>(null);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [requiresRoleSelection, setRequiresRoleSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);
  const { toast } = useToast();

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    console.log('[AuthContext] 🔍 Fetching profile for user:', userId);
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('[AuthContext] ❌ Profile fetch failed:', {
          error,
          userId,
          duration: Date.now() - startTime,
        });
        throw error;
      }
      
      console.log('[AuthContext] ✅ Profile fetched successfully:', {
        email: data.email,
        duration: Date.now() - startTime,
      });
      return data;
    } catch (error) {
      console.error('[AuthContext] 💥 Profile fetch error:', error);
      return null;
    }
  };

  const fetchRoles = async (userId: string): Promise<AppRole[]> => {
    console.log('[AuthContext] 🔍 Fetching roles for user:', userId);
    const startTime = Date.now();
    
    try {
      // First verify we have a valid session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.warn('[AuthContext] ⚠️ No active session when fetching roles');
        return [];
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('[AuthContext] ❌ Roles fetch failed:', {
          error,
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error.details,
          userId,
          duration: Date.now() - startTime,
        });
        throw error;
      }
      
      const userRoles = data?.map(r => r.role as AppRole) || [];
      setAvailableRoles(userRoles);
      
      // Handle active role selection
      const storedActiveRole = localStorage.getItem('dlinrt_active_role');
      
      if (userRoles.length === 0) {
        // No roles - regular user
        setActiveRoleState('user');
        setRequiresRoleSelection(false);
      } else if (userRoles.length === 1) {
        // Single role - auto-set
        setActiveRoleState(userRoles[0]);
        localStorage.setItem('dlinrt_active_role', userRoles[0]);
        setRequiresRoleSelection(false);
      } else if (storedActiveRole && userRoles.includes(storedActiveRole as AppRole)) {
        // Multi-role with valid stored selection
        setActiveRoleState(storedActiveRole);
        setRequiresRoleSelection(false);
      } else {
        // Multi-role without valid selection - require selection
        setActiveRoleState(null);
        setRequiresRoleSelection(true);
      }
      
      console.log('[AuthContext] ✅ Roles fetched successfully:', {
        roles: userRoles,
        count: userRoles.length,
        activeRole: activeRole,
        duration: Date.now() - startTime,
      });
      return userRoles;
    } catch (error: any) {
      console.error('[AuthContext] 💥 Roles fetch error:', {
        error,
        message: error?.message,
        hint: error?.hint,
        userId,
      });
      setAvailableRoles([]);
      setActiveRoleState('user');
      setRequiresRoleSelection(false);
      return [];
    }
  };
  
  const setActiveRole = (role: string) => {
    // Validate role is in available roles or is 'user'
    if (role === 'user' || availableRoles.includes(role)) {
      setActiveRoleState(role);
      localStorage.setItem('dlinrt_active_role', role);
      setRequiresRoleSelection(false);
      
      // Log role switch for audit
      if (user) {
        supabase.from('security_events').insert({
          event_type: 'role_switch',
          severity: 'info',
          details: {
            previous_role: activeRole,
            new_role: role,
            user_id: user.id
          }
        }).then();
      }
    } else {
      console.error('Invalid role selection:', role);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      const userRoles = await fetchRoles(user.id);
      setProfile(userProfile);
      setRoles(userRoles);
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

  // Validate session helper
  const validateSession = async (): Promise<boolean> => {
    console.log('[AuthContext] 🔐 Validating session...');
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('[AuthContext] ❌ Session validation failed:', error);
        return false;
      }
      
      if (!session) {
        console.warn('[AuthContext] ⚠️ No active session found');
        return false;
      }
      
      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      if (session.expires_at && session.expires_at < now) {
        console.warn('[AuthContext] ⏰ Session expired, refreshing...');
        const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError || !refreshed.session) {
          console.error('[AuthContext] ❌ Session refresh failed:', refreshError);
          return false;
        }
        
        console.log('[AuthContext] ✅ Session refreshed successfully');
        return true;
      }
      
      console.log('[AuthContext] ✅ Session is valid');
      return true;
    } catch (error) {
      console.error('[AuthContext] 💥 Session validation error:', error);
      return false;
    }
  };

  // Set up auth state listener with session refresh on focus
  useEffect(() => {
    let mounted = true;
    let loadingTimeout: NodeJS.Timeout;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('[AuthContext] 🔄 Auth state changed:', event);
        
        // Clear any existing timeout
        if (loadingTimeout) clearTimeout(loadingTimeout);
        
        // Set timeout to force loading to false after 10 seconds
        loadingTimeout = setTimeout(() => {
          if (mounted && loading) {
            console.error('[AuthContext] ⏱️ Loading timeout - forcing completion');
            setLoading(false);
          }
        }, 10000);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('[AuthContext] 👤 User authenticated:', session.user.id);
          
          // Validate session before fetching data
          const isValid = await validateSession();
          if (!isValid) {
            console.warn('[AuthContext] ⚠️ Session invalid, skipping data fetch');
            setProfile(null);
            setRoles([]);
            setLoading(false);
            return;
          }
          
          const userProfile = await fetchProfile(session.user.id);
          
          // Check approval status - but don't block core team members or admins
          if (userProfile?.approval_status === 'pending' && !userProfile?.is_core_team) {
            const { data: adminRole } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .eq('role', 'admin')
              .single();
            
            if (!adminRole) {
              toast({
                title: "Account Pending Approval",
                description: "Your account is awaiting admin approval. You'll receive an email once approved.",
                variant: "default",
              });
              setProfile(null);
              setRoles([]);
              setLoading(false);
              return;
            }
          }
          
          if (userProfile?.approval_status === 'rejected') {
            toast({
              title: "Account Not Approved",
              description: "Your account was not approved. Contact admin@dlinrt.eu for assistance.",
              variant: "destructive",
            });
            await signOut();
            setLoading(false);
            return;
          }
          
          const userRoles = await fetchRoles(session.user.id);
          setProfile(userProfile);
          setRoles(userRoles);
          
          console.log('[AuthContext] 🎉 Authentication complete:', {
            hasProfile: !!userProfile,
            rolesCount: userRoles.length,
            roles: userRoles,
            approvalStatus: userProfile?.approval_status,
          });
        } else {
          console.log('[AuthContext] 👋 User signed out');
          setProfile(null);
          setRoles([]);
        }
        
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    );

    // Refresh session when window regains focus or becomes visible
    const handleFocus = async () => {
      if (!mounted) return;
      
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession?.user) {
        console.log('[AuthContext] 🔄 Window focused - refreshing session and roles');
        
        // Refresh session
        await supabase.auth.refreshSession();
        
        // Fetch fresh roles
        const freshRoles = await fetchRoles(currentSession.user.id);
        setRoles(freshRoles);
      }
    };
    
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await handleFocus();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mounted = false;
      if (loadingTimeout) clearTimeout(loadingTimeout);
      subscription.unsubscribe();
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
        // Use edge function for secure backup code verification (prevents timing attacks)
        const { data, error: invokeError } = await supabase.functions.invoke('verify-backup-code', {
          body: { code },
        });

        if (invokeError || !data?.success) {
          toast({
            title: "Verification failed",
            description: data?.error || "Invalid backup code",
            variant: "destructive",
          });
          return { error: new Error(data?.error || 'Invalid backup code') };
        }

        setMfaRequired(false);
        toast({
          title: "Verification successful",
          description: "You are now signed in with backup code.",
        });

        return { error: null };
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    // Clear ALL state
    setUser(null);
    setSession(null);
    setProfile(null);
    setRoles([]);
    setActiveRoleState(null);
    setAvailableRoles([]);
    setRequiresRoleSelection(false);
    
    // Clear all storage to prevent stale data
    sessionStorage.clear();
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('dlinrt_active_role');
    
    console.log('✓ Sign out complete - all state cleared');
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
    activeRole,
    availableRoles,
    requiresRoleSelection,
    loading,
    mfaRequired,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    verifyMFA,
    resendVerificationEmail,
    setActiveRole,
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
