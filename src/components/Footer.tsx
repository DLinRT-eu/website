import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-16 border-t border-gray-200 pt-8 pb-12 text-center text-xs text-gray-400">
    <div>
      Content is revised periodically, but the website and its maintainers do not assume any liability on possible incorrect information. Also, no copyright is infringed.
    </div>
    <div className="mt-2">
      <Link to="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>
    </div>
    <div className="mt-2">
      &copy; {new Date().getFullYear()} DLinRT.eu
    </div>
  </footer>
);

export default Footer;
