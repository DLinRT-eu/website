
import { useParams } from 'react-router-dom';
import ProductDetailsPage from '@/components/ProductDetails';
import dataService from '@/services/DataService';

const ProductDetailsRoute = () => {
  const { id } = useParams();
  const product = dataService.getProductById(id || '');

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return <ProductDetailsPage product={product} />;
};

export default ProductDetailsRoute;
