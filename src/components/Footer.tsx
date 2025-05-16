import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-16 border-t border-gray-200 pt-8 pb-12 text-center text-xs text-gray-400">
    <div>
      This website’s content is periodically reviewed. The maintainers assume no liability for inaccuracies. All information is provided for general use, with no copyright infringement intended.
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
