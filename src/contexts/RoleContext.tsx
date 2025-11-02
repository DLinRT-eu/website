import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

type AppRole = 'admin' | 'reviewer' | 'company';

interface RoleContextType {
  roles: AppRole[];
  activeRole: AppRole | null;
  highestRole: AppRole | null;
  isAdmin: boolean;
  isReviewer: boolean;
  isCompany: boolean;
  requiresRoleSelection: boolean;
  loading: boolean;
  setActiveRole: (role: AppRole) => void;
  refetch: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [activeRole, setActiveRoleState] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    if (!user) {
      setRoles([]);
      setActiveRoleState(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;

      const userRoles = (data || []).map(r => r.role as AppRole);
      setRoles(userRoles);

      // Set active role from localStorage or use highest role
      const storedRole = localStorage.getItem('activeRole') as AppRole | null;
      if (storedRole && userRoles.includes(storedRole)) {
        setActiveRoleState(storedRole);
      } else if (userRoles.length > 0) {
        // Default to highest priority role
        const highestRole = getHighestRole(userRoles);
        setActiveRoleState(highestRole);
        localStorage.setItem('activeRole', highestRole);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      setRoles([]);
      setActiveRoleState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [user?.id]);

  const getHighestRole = (roleList: AppRole[]): AppRole | null => {
    if (roleList.includes('admin')) return 'admin';
    if (roleList.includes('reviewer')) return 'reviewer';
    if (roleList.includes('company')) return 'company';
    return null;
  };

  const setActiveRole = (role: AppRole) => {
    if (roles.includes(role)) {
      setActiveRoleState(role);
      localStorage.setItem('activeRole', role);
    }
  };

  const highestRole = useMemo(() => getHighestRole(roles), [roles]);
  const isAdmin = roles.includes('admin');
  const isReviewer = roles.includes('reviewer');
  const isCompany = roles.includes('company');
  const requiresRoleSelection = roles.length > 1 && !activeRole;

  const value = useMemo(() => ({
    roles,
    activeRole,
    highestRole,
    isAdmin,
    isReviewer,
    isCompany,
    requiresRoleSelection,
    loading,
    setActiveRole,
    refetch: fetchRoles,
  }), [roles, activeRole, highestRole, isAdmin, isReviewer, isCompany, requiresRoleSelection, loading]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoles() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
}
