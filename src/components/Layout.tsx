
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/toaster';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Deep Learning in Radiotherapy. All rights reserved.</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
