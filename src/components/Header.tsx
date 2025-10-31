import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Beaker, Info, BookOpen, User, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import MobileNav from './MobileNav';
import DropdownNavItem from './navigation/DropdownNavItem';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from './notifications/NotificationBell';

const Header = () => {
  const { user, profile, isAdmin, isReviewer, isCompany, highestRole, loading, signOut } = useAuth();
  
  return (
    <header className="bg-[#00A6D6] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="flex items-center flex-1 min-w-0 pr-2 sm:pr-3">
          <Link 
            to="/" 
            className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-bold hover:text-white/90 transition-colors leading-tight block"
          >
            <span className="hidden sm:inline">Deep Learning in Radiotherapy</span>
            <span className="sm:hidden">DL in Radiotherapy</span>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex-shrink-0">
          <MobileNav />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-shrink-0">
          <ul className="flex space-x-1 lg:space-x-2 xl:space-x-3">
            <li>
              <Link to="/products" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <Package className="w-4 h-4 mr-1 lg:mr-2" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/companies" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <Building2 className="w-4 h-4 mr-1 lg:mr-2" />
                Companies
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <LayoutDashboard className="w-4 h-4 mr-1 lg:mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <Newspaper className="w-4 h-4 mr-1 lg:mr-2" />
                News
              </Link>
            </li>
            <li>
              <DropdownNavItem
                label="Resources"
                icon={BookOpen}
                items={[
                  { label: "Resources & Compliance", to: "/resources-compliance", icon: BookOpen }
                ]}
              />
            </li>
            <li>
              <DropdownNavItem
                label="Research"
                icon={Beaker}
                items={[
                  { label: "Research & Initiatives", to: "/initiatives", icon: Beaker }
                ]}
              />
            </li>
            <li>
              <Link to="/about" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <Info className="w-4 h-4 mr-1 lg:mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center px-2 lg:px-3 xl:px-4 py-2 hover:text-white/90 transition-colors text-xs lg:text-sm xl:text-base">
                <LifeBuoy className="w-4 h-4 mr-1 lg:mr-2" />
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-2">
          {user && <NotificationBell />}
          {user && !user.email_confirmed_at && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-yellow-300 hover:text-yellow-200">
                      <AlertCircle className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email not verified. Click to verify.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white/90">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-white/20">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline">
                    {profile?.first_name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{profile?.email}</p>
                    {loading ? (
                      <Badge variant="outline" className="w-fit mt-1 text-muted-foreground">
                        Loading roles...
                      </Badge>
                    ) : highestRole && (
                      <Badge variant="outline" className="w-fit mt-1">
                        {highestRole.charAt(0).toUpperCase() + highestRole.slice(1)}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/my-products" className="cursor-pointer">
                    My Products
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/roles" className="cursor-pointer">
                    Role Information
                  </Link>
                </DropdownMenuItem>
                
                {loading && (
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Loading permissions...
                  </DropdownMenuLabel>
                )}
                
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/users" className="cursor-pointer flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        User Management
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/reviews" className="cursor-pointer flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Review Assignments
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/security" className="cursor-pointer flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Security Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                
                {(isAdmin || isReviewer) && (
                  <DropdownMenuItem asChild>
                    <Link to="/review" className="cursor-pointer">
                      Review Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {isCompany && (
                  <DropdownMenuItem asChild>
                    <Link to="/company/dashboard" className="cursor-pointer">
                      Company Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
