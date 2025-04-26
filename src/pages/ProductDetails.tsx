
import { useParams } from 'react-router-dom';
import ProductDetailsPage from '@/components/ProductDetails';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { ProductDetails } from '@/types/productDetails';

const ProductDetailsRoute = () => {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id) as ProductDetails;

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return <ProductDetailsPage product={product} />;
};

export default ProductDetailsRoute;
