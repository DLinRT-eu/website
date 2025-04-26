
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Header = () => {
  return (
    <header className="bg-[#00A6D6] text-white py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/placeholder.svg" 
            alt="Logo" 
            className="w-8 h-8"
          />
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold hover:text-white/90 transition-colors"
          >
            Deep Learning in Radiotherapy
          </Link>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="flex items-center px-4 py-2 hover:text-white/90">
                <Package className="w-4 h-4 mr-2" />
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/companies" className="flex items-center px-4 py-2 hover:text-white/90">
                <Building2 className="w-4 h-4 mr-2" />
                Companies
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/news" className="flex items-center px-4 py-2 hover:text-white/90">
                <Newspaper className="w-4 h-4 mr-2" />
                News
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/maintenance-team" className="flex items-center px-4 py-2 hover:text-white/90">
                <Users className="w-4 h-4 mr-2" />
                About & Team
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/support" className="flex items-center px-4 py-2 hover:text-white/90">
                <LifeBuoy className="w-4 h-4 mr-2" />
                Support & Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
