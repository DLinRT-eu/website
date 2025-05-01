
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MobileMenu from '@/components/MobileMenu';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "FDA AI/ML Products", path: "/fda-products" },
    { name: "Companies", path: "/companies" },
    { name: "News", path: "/news" },
    { name: "Initiatives", path: "/initiatives" },
    { name: "Guidelines", path: "/guidelines" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="DL in RT" className="h-8 w-auto" />
              <span className="ml-2 font-bold text-gray-900">DL in RT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
