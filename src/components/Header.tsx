
import { Link } from 'react-router-dom';
import { Package, Building2, Newspaper, Users, LifeBuoy, LayoutDashboard, Beaker, Info } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="bg-[#00A6D6] text-white py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold hover:text-white/90 transition-colors"
          >
            Deep Learning in Radiotherapy
          </Link>
        </div>
        
        <MobileNav />
        
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li>
              <Link to="/products" className="flex items-center px-4 py-2 hover:text-white/90">
                <Package className="w-4 h-4 mr-2" />
                Products
              </Link>
            </li>
            <li>
              <Link to="/companies" className="flex items-center px-4 py-2 hover:text-white/90">
                <Building2 className="w-4 h-4 mr-2" />
                Companies
              </Link>
            </li>
            <li>
              <Link to="/initiatives" className="flex items-center px-4 py-2 hover:text-white/90">
                <Beaker className="w-4 h-4 mr-2" />
                Research & Initiatives
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-2 hover:text-white/90">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center px-4 py-2 hover:text-white/90">
                <Newspaper className="w-4 h-4 mr-2" />
                News
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center px-4 py-2 hover:text-white/90">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/maintenance-team" className="flex items-center px-4 py-2 hover:text-white/90">
                <Users className="w-4 h-4 mr-2" />
                Team
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center px-4 py-2 hover:text-white/90">
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
