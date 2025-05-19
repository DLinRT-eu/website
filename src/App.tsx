import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MaintenanceTeam from "./pages/MaintenanceTeam";
import Donate from "./pages/Donate";
import ProductDetails from "./pages/ProductDetails";
import Companies from "./pages/Companies";
import News from "./pages/News";
import Support from "./pages/Support";
import NewsDetail from "./pages/NewsDetail";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Initiatives from "./pages/Initiatives";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReviewDashboard from "./pages/ReviewDashboard";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="products" element={<Products />} />
          <Route path="initiatives" element={<Initiatives />} />
          <Route path="maintenance-team" element={<MaintenanceTeam />} />
          <Route path="donate" element={<Donate />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="companies" element={<Companies />} />
          <Route path="news" element={<News />} />
          <Route path="support" element={<Support />} />          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="review" element={<ReviewDashboard />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
