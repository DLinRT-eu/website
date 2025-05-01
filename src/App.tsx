
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/Index';
import ProductsPage from '@/pages/Products';
import ProductDetails from '@/pages/ProductDetails';
import FDAProductsPage from '@/pages/FDAProductsPage';
import CompaniesPage from '@/pages/Companies';
import CompanyDetails from '@/pages/CompanyDetails';
import NewsPage from '@/pages/News';
import NewsDetails from '@/pages/NewsDetail';
import AboutPage from '@/pages/MaintenanceTeam';
import NotFound from '@/pages/NotFound';
import InitiativesPage from '@/pages/Initiatives';
import InitiativeDetails from '@/pages/InitiativeDetails';
import GuidelinesPage from '@/pages/GuidelinesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="fda-products" element={<FDAProductsPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="company/:id" element={<CompanyDetails />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="initiatives" element={<InitiativesPage />} />
          <Route path="initiative/:id" element={<InitiativeDetails />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="guidelines" element={<GuidelinesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
