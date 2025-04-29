
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] max-w-sm px-0 pt-12">
        <nav className="flex flex-col gap-4 px-6">
          <Link 
            to="/products" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link 
            to="/companies" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <Building2 className="w-5 h-5 mr-3" />
            Companies
          </Link>
          <Link 
            to="/dashboard" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            to="/news" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <Newspaper className="w-5 h-5 mr-3" />
            News
          </Link>
          <Link 
            to="/maintenance-team" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <Users className="w-5 h-5 mr-3" />
            About & Team
          </Link>
          <Link 
            to="/support" 
            onClick={handleLinkClick}
            className="flex items-center p-2 rounded-md hover:bg-slate-100"
          >
            <LifeBuoy className="w-5 h-5 mr-3" />
            Support & Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
