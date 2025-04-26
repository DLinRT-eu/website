
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#00A6D6] text-white py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-bold hover:text-white/90 transition-colors">
          Deep Learning in Radiotherapy
        </Link>
      </div>
    </header>
  );
};

export default Header;
