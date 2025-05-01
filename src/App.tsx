
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import FDAProductsPage from './pages/FDAProductsPage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetails from './pages/CompanyDetails';
import NewsPage from './pages/NewsPage';
import NewsDetails from './pages/NewsDetails';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import InitiativesPage from './pages/InitiativesPage';
import InitiativeDetails from './pages/InitiativeDetails';
import GuidelinesPage from './pages/GuidelinesPage';

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
