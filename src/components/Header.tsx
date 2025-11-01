import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Eye, Shield, LayoutDashboard, BookOpen, Activity, FlaskConical, Lightbulb, Calendar, LogOut, User as UserIcon, Info } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import MobileNav from './MobileNav';
import DropdownNavItem from './navigation/DropdownNavItem';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from './notifications/NotificationBell';

const Header = () => {
  const { user, profile, activeRole, availableRoles, setActiveRole, signOut } = useAuth();
  
  const isAdmin = activeRole === 'admin';
  const isReviewer = activeRole === 'reviewer';
  const isCompany = activeRole === 'company';
  const isRegularUser = activeRole === 'user' || (!activeRole && availableRoles.length === 0);
  const canSwitchRoles = availableRoles.length > 1;
  const showRoleIndicator = true; // Always show role indicator

  return (
    <header className="bg-[#00A6D6] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="text-sm md:text-base lg:text-lg font-bold hover:text-white/90">
          Deep Learning in Radiotherapy
        </Link>
        
        <MobileNav />
        
        {/* Desktop Navigation - Role-Based */}
        <nav className="hidden lg:flex items-center space-x-2">
          {isAdmin && (
            <>
              <Link to="/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
              <Link to="/admin" className="px-3 py-2 hover:text-white/90 text-sm">Admin</Link>
              <Link to="/review-dashboard" className="px-3 py-2 hover:text-white/90 text-sm">Reviews</Link>
            </>
          )}
          {isReviewer && !isAdmin && (
            <>
              <Link to="/review-dashboard" className="px-3 py-2 hover:text-white/90 text-sm">Reviews</Link>
              <Link to="/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
            </>
          )}
          {isCompany && !isAdmin && !isReviewer && (
            <>
              <Link to="/company" className="px-3 py-2 hover:text-white/90 text-sm">Dashboard</Link>
              <Link to="/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
            </>
          )}
          {isRegularUser && (
            <>
              <Link to="/products" className="px-3 py-2 hover:text-white/90 text-sm">Products</Link>
              <Link to="/companies" className="px-3 py-2 hover:text-white/90 text-sm">Companies</Link>
              <Link to="/dashboard" className="px-3 py-2 hover:text-white/90 text-sm">Dashboard</Link>
            </>
          )}
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          {user && <NotificationBell />}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-white/20">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
                  {activeRole && (
                    <Badge variant="outline" className="mt-1">
                      {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                    </Badge>
                  )}
                </div>
                
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  Current Role: {activeRole ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1) : 'User'}
                </div>
                
                {canSwitchRoles && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 text-xs font-semibold">Switch Role</div>
                    {availableRoles.map(role => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => setActiveRole(role)}
                        className={activeRole === role ? 'bg-accent' : ''}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                        {activeRole === role && ' ✓'}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/my-products">My Products</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary" size="sm"><Link to="/auth">Sign In</Link></Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
