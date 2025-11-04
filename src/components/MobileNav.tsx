
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Menu, X, Beaker, Info, BookOpen, Shield, User as UserIcon, LogOut, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { roles, activeRole, setActiveRole } = useRoles();
  const canSwitchRoles = roles.length > 1;
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleRoleSwitch = (role: any) => {
    setActiveRole(role);
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 h-12 w-12 touch-target-minimum"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[280px] max-w-[85vw] p-0 bg-white border-l border-gray-200 z-[100]"
      >
        <SheetHeader className="p-6 pb-4 border-b border-gray-100">
          <SheetTitle className="text-left text-lg font-semibold text-gray-900">
            Navigation
          </SheetTitle>
        </SheetHeader>
        
        {/* User Info Section */}
        {user && profile && (
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-white">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
              </div>
            </div>
            
            {/* Active Role Badge */}
            {activeRole && (
              <Badge variant="outline" className="mb-2">
                <Shield className="h-3 w-3 mr-1" />
                {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
              </Badge>
            )}
            
            {/* Role Switcher */}
            {canSwitchRoles && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 mb-1">SWITCH ROLE</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <Button
                      key={role}
                      variant={activeRole === role ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoleSwitch(role)}
                      className="text-xs h-7"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                      {activeRole === role && ' ✓'}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <nav className="flex flex-col py-4">
          <Link 
            to="/products" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <Package className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Products</span>
          </Link>
          
          <Link 
            to="/companies" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <Building2 className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Companies</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <LayoutDashboard className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link 
            to="/news" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <Newspaper className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">News</span>
          </Link>
          
          <Link 
            to="/resources-compliance" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <BookOpen className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Resources & Compliance</span>
          </Link>
          
          <Link 
            to="/initiatives" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <Beaker className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Research & Initiatives</span>
          </Link>
          
          <Link 
            to="/about" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <Info className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">About</span>
          </Link>
          
          <Link 
            to="/changelog" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <FileText className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Changelog</span>
          </Link>
          
          <Link 
            to="/support" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
          >
            <LifeBuoy className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium">Support & Contact</span>
          </Link>
          
          {/* User Actions */}
          {user && (
            <>
              <Separator className="my-2" />
              <Link 
                to="/profile" 
                onClick={handleLinkClick}
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 touch-target-minimum"
              >
                <UserIcon className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Profile</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors w-full text-left touch-target-minimum"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span className="font-medium">Sign Out</span>
              </button>
            </>
          )}
          
          {!user && (
            <>
              <Separator className="my-2" />
              <Link 
                to="/auth" 
                onClick={handleLinkClick}
                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors touch-target-minimum"
              >
                <UserIcon className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">Sign In</span>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
