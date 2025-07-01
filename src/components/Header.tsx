
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Beaker, Info } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="bg-[#00A6D6] text-white py-2 px-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center flex-1 min-w-0">
          <Link 
            to="/" 
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold hover:text-white/90 transition-colors whitespace-nowrap"
          >
            Deep Learning in Radiotherapy
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex-shrink-0">
          <MobileNav />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-shrink-0">
          <ul className="flex space-x-2 lg:space-x-4">
            <li>
              <Link to="/products" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <Package className="w-4 h-4 mr-1 lg:mr-2" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/companies" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <Building2 className="w-4 h-4 mr-1 lg:mr-2" />
                Companies
              </Link>
            </li>
            <li>
              <Link to="/initiatives" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <Beaker className="w-4 h-4 mr-1 lg:mr-2" />
                Research & Initiatives
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <LayoutDashboard className="w-4 h-4 mr-1 lg:mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <Newspaper className="w-4 h-4 mr-1 lg:mr-2" />
                News
              </Link>
            </li>
            <li>
              <Link to="/maintenance-team" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <Info className="w-4 h-4 mr-1 lg:mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center px-2 lg:px-4 py-2 hover:text-white/90 transition-colors text-sm lg:text-base">
                <LifeBuoy className="w-4 h-4 mr-1 lg:mr-2" />
                Support & Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
