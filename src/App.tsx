
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Companies from "./pages/Companies";
import News from "./pages/News";
import Support from "./pages/Support";
import NewsDetail from "./pages/NewsDetail";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Dashboard_Authenticated from "./pages/Dashboard_Authenticated";
import Timeline from "./pages/Timeline";
import Initiatives from "./pages/Initiatives";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ReviewDashboard from "./pages/ReviewDashboard";
import ProductReview from "./pages/ProductReview";
import ResourcesCompliance from "./pages/ResourcesCompliance";
import Profile from "./pages/Profile";
import MyProducts from "./pages/MyProducts";
import RoleSelection from "./pages/RoleSelection";
import ProductExperiences from "./pages/ProductExperiences";
import Auth from "./pages/Auth";

// Admin Pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ReviewAssignment from "./pages/admin/ReviewAssignment";
import SecurityDashboard from "./pages/admin/SecurityDashboard";
import UserRegistrationReview from "./pages/admin/UserRegistrationReview";

// Company Pages
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyProductsManager from "./pages/company/ProductsManager";

// Reviewer Pages
import ReviewerDashboard from "./pages/reviewer/Dashboard";

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
    <AuthProvider>
      <RoleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="products" element={<Products />} />
              <Route path="initiatives" element={<Initiatives />} />
              <Route path="about" element={<About />} />
              <Route path="maintenance-team" element={<Navigate to="/about" replace />} />
              <Route path="donate" element={<Navigate to="/support" replace />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="companies" element={<Companies />} />
              <Route path="news" element={<News />} />
              <Route path="support" element={<Support />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard-home" element={
                <ProtectedRoute requireAuth={true}>
                  <Dashboard_Authenticated />
                </ProtectedRoute>
              } />
              <Route path="timeline" element={<Timeline />} />
              <Route path="review" element={<ReviewDashboard />} />
              <Route path="review/:id" element={<ProductReview />} />
              <Route path="resources-compliance" element={<ResourcesCompliance />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-use" element={<TermsOfUse />} />
              <Route path="auth" element={<Auth />} />
              
              {/* User Authenticated Routes */}
              <Route path="/profile" element={
                <ProtectedRoute requireAuth={true}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/my-products" element={
                <ProtectedRoute requireAuth={true}>
                  <MyProducts />
                </ProtectedRoute>
              } />
              <Route path="/role-selection" element={
                <ProtectedRoute requireAuth={true}>
                  <RoleSelection />
                </ProtectedRoute>
              } />
              <Route path="/product/:productId/experiences" element={
                <ProtectedRoute allowedRoles={['admin', 'reviewer', 'company']}>
                  <ProductExperiences />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminOverview />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/reviews" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ReviewAssignment />
                </ProtectedRoute>
              } />
              <Route path="/admin/security" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SecurityDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/registrations" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserRegistrationReview />
                </ProtectedRoute>
              } />
              
              {/* Reviewer Routes */}
              <Route path="/reviewer/dashboard" element={
                <ProtectedRoute allowedRoles={['reviewer', 'admin']}>
                  <ReviewerDashboard />
                </ProtectedRoute>
              } />
              
              {/* Company Routes */}
              <Route path="/company/dashboard" element={
                <ProtectedRoute allowedRoles={['company', 'admin']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/company/products" element={
                <ProtectedRoute allowedRoles={['company', 'admin']}>
                  <CompanyProductsManager />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
