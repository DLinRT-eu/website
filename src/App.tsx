
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MaintenanceTeam from "./pages/MaintenanceTeam";
import Donate from "./pages/Donate";

const queryClient = new QueryClient();

// Get the base URL from the import.meta.env or fallback to the one defined in vite.config.ts
const BASE_URL = import.meta.env.BASE_URL || '/ai-rad-product-finder/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="maintenance-team" element={<MaintenanceTeam />} />
          <Route path="donate" element={<Donate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
