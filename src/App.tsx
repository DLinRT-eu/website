
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

const queryClient = new QueryClient();

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
          <Route path="maintenance-team" element={<MaintenanceTeam />} />
          <Route path="donate" element={<Donate />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="companies" element={<Companies />} />
          <Route path="news" element={<News />} />
          <Route path="support" element={<Support />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
