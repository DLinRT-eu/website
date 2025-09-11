
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Menu, X, Beaker, Info, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 h-10 w-10"
        >
          <Menu className="h-5 w-5" />
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
        
        <nav className="flex flex-col py-4">
          <Link 
            to="/products" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <Package className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Products</span>
          </Link>
          
          <Link 
            to="/companies" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <Building2 className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Companies</span>
          </Link>
          
          <Link 
            to="/initiatives" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <Beaker className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Research&nbsp;&amp;&nbsp;Initiatives</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link 
            to="/news" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <Newspaper className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">News</span>
          </Link>
          
          <Link 
            to="/resources-compliance" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <BookOpen className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Resources&nbsp;&amp;&nbsp;Compliance</span>
          </Link>
          
          <Link 
            to="/about" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors border-b border-gray-50"
          >
            <Info className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">About</span>
          </Link>
          
          <Link 
            to="/support" 
            onClick={handleLinkClick}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#00A6D6] transition-colors"
          >
            <LifeBuoy className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Support&nbsp;&amp;&nbsp;Contact</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
