import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "./providers/AnalyticsProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import CookieConsent from "./components/CookieConsent";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import Index from "./pages/Index";
import Dashboard_Authenticated from "./pages/Dashboard_Authenticated";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Companies from "./pages/Companies";
import News from "./pages/News";
import Support from "./pages/Support";
import ExportPresentation from "./pages/ExportPresentation";
import NewsDetail from "./pages/NewsDetail";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import Initiatives from "./pages/Initiatives";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ReviewDashboard from "./pages/ReviewDashboard";
import ProductReview from "./pages/ProductReview";
import Security from "./pages/Security";
import SecurityMonitoring from "./pages/SecurityMonitoring";
import AutoContouringPage from "./pages/categories/AutoContouring";
import TreatmentPlanningPage from "./pages/categories/TreatmentPlanning";
import ImageSynthesisPage from "./pages/categories/ImageSynthesis";
import PlatformPage from "./pages/categories/Platform";
import ResourcesCompliance from "./pages/ResourcesCompliance";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import RoleSelection from "./pages/RoleSelection";
import ReviewerDashboard from "./pages/reviewer/Dashboard";
import DueReviews from "./pages/reviewer/DueReviews";
import UserManagement from "./pages/admin/UserManagement";
import UserProductAdoptions from "./pages/admin/UserProductAdoptions";
import ReviewAssignment from "./pages/admin/ReviewAssignment";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAccessTest from "./pages/admin/AdminAccessTest";
import SecurityDashboard from "./pages/admin/SecurityDashboard";
import UserRegistrationReview from "./pages/admin/UserRegistrationReview";
import CompanyDashboard from "./pages/company/Dashboard";
import ProductsManager from "./pages/company/ProductsManager";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Roles from "./pages/Roles";
import RolesFAQ from "./pages/RolesFAQ";
import MyProducts from "./pages/MyProducts";
import ProductExperiences from "./pages/ProductExperiences";

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
        <AuthProvider>
          <RoleProvider>
            <AnalyticsProvider>
              <Header />
              <Breadcrumb />
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard-home" element={
                <ProtectedRoute>
                  <Dashboard_Authenticated />
                </ProtectedRoute>
              } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/role-selection" element={
              <ProtectedRoute>
                <RoleSelection />
              </ProtectedRoute>
            } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/reviewer/dashboard" element={
                <ProtectedRoute allowedRoles={['admin', 'reviewer']}>
                  <ReviewerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/reviewer/due-reviews" element={
                <ProtectedRoute allowedRoles={['admin', 'reviewer']}>
                  <DueReviews />
                </ProtectedRoute>
              } />
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
              <Route path="/admin/user-products" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserProductAdoptions />
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
              <Route path="/admin/access-test" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAccessTest />
                </ProtectedRoute>
              } />
              <Route path="/company/dashboard" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/company/products-manager" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <ProductsManager />
                </ProtectedRoute>
              } />
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/faq" element={<RolesFAQ />} />
              <Route path="/my-products" element={
                <ProtectedRoute>
                  <MyProducts />
                </ProtectedRoute>
              } />
              <Route path="/product-experiences/:productId" element={
                <ProtectedRoute allowedRoles={['admin', 'reviewer']}>
                  <ProductExperiences />
                </ProtectedRoute>
              } />
              <Route path="products" element={<Products />} />
              <Route path="initiatives" element={<Initiatives />} />
              <Route path="/about" element={<About />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="companies" element={<Companies />} />
              <Route path="news" element={<News />} />
              <Route path="support" element={<Support />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="review" element={<ReviewDashboard />} />
              <Route path="review/:id" element={<ProductReview />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-use" element={<TermsOfUse />} />
              <Route path="/security" element={<Security />} />
              <Route path="/security-monitoring" element={<SecurityMonitoring />} />
              <Route path="category/auto-contouring" element={<AutoContouringPage />} />
              <Route path="category/treatment-planning" element={<TreatmentPlanningPage />} />
              <Route path="category/image-synthesis" element={<ImageSynthesisPage />} />
              <Route path="category/platform" element={<PlatformPage />} />
              <Route path="resources-compliance" element={<ResourcesCompliance />} />
              <Route path="export-presentation" element={<ExportPresentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </AnalyticsProvider>
        </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;