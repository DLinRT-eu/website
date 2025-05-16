import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-16 border-t border-gray-200 pt-8 pb-12 text-center text-xs text-gray-400">
    <div>
      The content on this website is periodically reviewed; however, the website and its maintainers assume no liability for possible inaccuracies. All content is for informational purposes only. No copyright is infringed.
    </div>
    <div className="mt-2">
      <Link to="/privacy-policy" className="underline hover:text-gray-600" aria-label="Privacy Policy">Privacy Policy</Link>
    </div>
    <div className="mt-2">
      &copy; {new Date().getFullYear()} DLinRT.eu
    </div>
  </footer>
);

export default Footer;
