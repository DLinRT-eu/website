
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Beaker, Info, BookOpen } from 'lucide-react';
import MobileNav from './MobileNav';
import DropdownNavItem from './navigation/DropdownNavItem';

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
