
import { Link, NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL || '/ai-rad-product-finder/';

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && isOpen) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isOpen]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={`${baseUrl}placeholder.svg`} alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-blue-700">DLinRT</span>
        </Link>

        {isMobile ? (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-500">
            <Menu className="h-6 w-6" />
          </button>
        ) : (
          <nav className="flex items-center space-x-1 md:space-x-2">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Companies
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              News
            </NavLink>
            <NavLink
              to="/maintenance-team"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Team
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Donate
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-3 py-2 text-sm ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Support
            </NavLink>
          </nav>
        )}
      </div>

      {isMobile && isOpen && (
        <nav className="p-4 border-t">
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Companies
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              News
            </NavLink>
            <NavLink
              to="/maintenance-team"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Team
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Donate
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-2 py-2 ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Support
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
