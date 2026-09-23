import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
// Add page imports here
import Layout from '@/components/site/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Seeds from '@/pages/Seeds';
import SeedDetail from '@/pages/SeedDetail';
import CropDetail from '@/pages/CropDetail';
import Certificates from '@/pages/Certificates';
import FarmerStories from '@/pages/FarmerStories';
import Videos from '@/pages/Videos';
import Gallery from '@/pages/Gallery';
import AgricultureNewsroom from '@/pages/AgricultureNewsroom';
import AgricultureNewsArticle from '@/pages/AgricultureNewsArticle';
import Downloads from '@/pages/Downloads';
import Contact from '@/pages/Contact';
import Dealers from '@/pages/Dealers';
import BecomeDealer from '@/pages/BecomeDealer';
import AskExpert from '@/pages/AskExpert';
import CompareSeeds from '@/pages/CompareSeeds';
import Faq from '@/pages/Faq';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Auth routes — standalone, no site header/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/seeds/crop/:slug" element={<CropDetail />} />
        <Route path="/seeds/:slug" element={<SeedDetail />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/farmer-stories" element={<FarmerStories />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<AgricultureNewsroom />} />
        <Route path="/news/:slug" element={<AgricultureNewsArticle />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/become-dealer" element={<BecomeDealer />} />
        <Route path="/ask-expert" element={<AskExpert />} />
        <Route path="/compare" element={<CompareSeeds />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Admin — standalone, no site header/footer, auth required */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App