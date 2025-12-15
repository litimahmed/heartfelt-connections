/**
 * @file App.tsx
 * @description This is the main application component.
 * It sets up the routing configuration, global providers, and defines the overall structure of the application.
 * All major pages are routed from this component.
 */

// Import global UI components and providers.
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WalkthroughProvider } from "@/contexts/WalkthroughContext";

// Import page components.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import PartnerDetail from "./pages/PartnerDetail";
import TermsOfService from "./pages/TermsOfService";
import Documentation from "./pages/Documentation";

// Import admin components
import { AdminAuthProvider, AdminAuthRedirectHandler } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPartnerList from "./pages/admin/PartnerList";
import AdminPartnerCreate from "./pages/admin/PartnerCreate";
import AdminPartnerEdit from "./pages/admin/PartnerEdit";
import AdminContactList from "./pages/admin/ContactList";
import AdminContactCreate from "./pages/admin/ContactCreate";
import AdminContactEdit from "./pages/admin/ContactEdit";
import AdminAboutUsCreate from "./pages/admin/AboutUsCreate";
import AdminAboutUsEdit from "./pages/admin/AboutUsEdit";
import AdminAboutUsVersions from "./pages/admin/AboutUsVersions";
import AdminPrivacyPolicyList from "./pages/admin/PrivacyPolicyList";
import AdminPrivacyPolicyCreate from "./pages/admin/PrivacyPolicyCreate";
import AdminTermsAndConditionsList from "./pages/admin/TermsAndConditionsList";
import AdminTermsAndConditionsCreate from "./pages/admin/TermsAndConditionsCreate";
import AdminCategoryList from "./pages/admin/CategoryList";
import AdminCategoryCreate from "./pages/admin/CategoryCreate";
import AdminCategoryEdit from "./pages/admin/CategoryEdit";
import AdminServiceList from "./pages/admin/ServiceList";
import AdminServiceCreate from "./pages/admin/ServiceCreate";
import AdminServiceEdit from "./pages/admin/ServiceEdit";
import AdminProfessionalList from "./pages/admin/ProfessionalList";
import AdminProfessionalCreate from "./pages/admin/ProfessionalCreate";
import AdminProfessionalDetail from "./pages/admin/ProfessionalDetail";
import AdminProfessionalEdit from "./pages/admin/ProfessionalEdit";
import AdminProfile from "./pages/admin/Profile";
import AdminManage from "./pages/admin/Manage";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <TooltipProvider>
                <AdminAuthProvider>
                    <AdminAuthRedirectHandler>
                        <WalkthroughProvider>
                            <Toaster />
                            <Sonner />
                            <ScrollToTop />

                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Index />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact" element={<ContactUsPage />} />
                            <Route path="/partner/:partnerId" element={<PartnerDetail />} />
                            <Route path="/documentation" element={<Documentation />} />

                            {/* Admin routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                            <Route path="/admin/partners" element={<ProtectedRoute><AdminPartnerList /></ProtectedRoute>} />
                            <Route path="/admin/partners/create" element={<ProtectedRoute><AdminPartnerCreate /></ProtectedRoute>} />
                            <Route path="/admin/partners/edit/:id" element={<ProtectedRoute><AdminPartnerEdit /></ProtectedRoute>} />
                            <Route path="/admin/contacts" element={<ProtectedRoute><AdminContactList /></ProtectedRoute>} />
                            <Route path="/admin/contacts/create" element={<ProtectedRoute><AdminContactCreate /></ProtectedRoute>} />
                            <Route path="/admin/contacts/edit" element={<ProtectedRoute><AdminContactEdit /></ProtectedRoute>} />
                            <Route path="/admin/about-us" element={<ProtectedRoute><AdminAboutUsCreate /></ProtectedRoute>} />
                            <Route path="/admin/about-us/create" element={<ProtectedRoute><AdminAboutUsCreate /></ProtectedRoute>} />
                            <Route path="/admin/about-us/edit/:id" element={<ProtectedRoute><AdminAboutUsEdit /></ProtectedRoute>} />
                            <Route path="/admin/about-us/versions" element={<ProtectedRoute><AdminAboutUsVersions /></ProtectedRoute>} />
                            <Route path="/admin/privacy-policy" element={<ProtectedRoute><AdminPrivacyPolicyList /></ProtectedRoute>} />
                            <Route path="/admin/privacy-policy/create" element={<ProtectedRoute><AdminPrivacyPolicyCreate /></ProtectedRoute>} />
                            <Route path="/admin/terms" element={<ProtectedRoute><AdminTermsAndConditionsList /></ProtectedRoute>} />
                            <Route path="/admin/terms/create" element={<ProtectedRoute><AdminTermsAndConditionsCreate /></ProtectedRoute>} />
                            <Route path="/admin/categories" element={<ProtectedRoute><AdminCategoryList /></ProtectedRoute>} />
                            <Route path="/admin/categories/create" element={<ProtectedRoute><AdminCategoryCreate /></ProtectedRoute>} />
                            <Route path="/admin/categories/edit/:id" element={<ProtectedRoute><AdminCategoryEdit /></ProtectedRoute>} />
                            <Route path="/admin/services" element={<ProtectedRoute><AdminServiceList /></ProtectedRoute>} />
                            <Route path="/admin/services/create" element={<ProtectedRoute><AdminServiceCreate /></ProtectedRoute>} />
                            <Route path="/admin/services/edit/:id" element={<ProtectedRoute><AdminServiceEdit /></ProtectedRoute>} />
                            <Route path="/admin/professionals" element={<ProtectedRoute><AdminProfessionalList /></ProtectedRoute>} />
                            <Route path="/admin/professionals/create" element={<ProtectedRoute><AdminProfessionalCreate /></ProtectedRoute>} />
                            <Route path="/admin/professionals/:id" element={<ProtectedRoute><AdminProfessionalDetail /></ProtectedRoute>} />
                            <Route path="/admin/professionals/:id/edit" element={<ProtectedRoute><AdminProfessionalEdit /></ProtectedRoute>} />
                            <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
                            <Route path="/admin/manage" element={<ProtectedRoute><AdminManage /></ProtectedRoute>} />
                            <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
                            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        </WalkthroughProvider>
                    </AdminAuthRedirectHandler>
                </AdminAuthProvider>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
