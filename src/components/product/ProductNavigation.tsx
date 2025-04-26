
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const ProductNavigation = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-blue-600 flex items-center"
        >
          <Home className="mr-2 h-5 w-5" />
          <span>DLinRT-products</span>
        </Link>
        <Link 
          to="/" 
          className="text-gray-500 hover:text-blue-600 flex items-center text-sm"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>
    </header>
  );
};

export default ProductNavigation;
