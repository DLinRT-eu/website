
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Beaker, Info } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="bg-[#00A6D6] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <Link 
            to="/" 
            className="text-lg md:text-2xl font-bold hover:text-white/90 transition-colors truncate"
          >
            Deep Learning in Radiotherapy
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li>
              <Link to="/products" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <Package className="w-4 h-4 mr-2" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/companies" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <Building2 className="w-4 h-4 mr-2" />
                Companies
              </Link>
            </li>
            <li>
              <Link to="/initiatives" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <Beaker className="w-4 h-4 mr-2" />
                Research & Initiatives
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <Newspaper className="w-4 h-4 mr-2" />
                News
              </Link>
            </li>
            <li>
              <Link to="/maintenance-team" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center px-4 py-2 hover:text-white/90 transition-colors">
                <LifeBuoy className="w-4 h-4 mr-2" />
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
