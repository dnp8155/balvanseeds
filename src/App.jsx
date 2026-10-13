import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Layout from '@/components/site/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Seeds from '@/pages/Seeds';
import SeedDetail from '@/pages/SeedDetail';
import CropDetail from '@/pages/CropDetail';
import Certificates from '@/pages/Certificates';
import Downloads from '@/pages/Downloads';
import FarmerStories from '@/pages/FarmerStories';
import Videos from '@/pages/Videos';
import Gallery from '@/pages/Gallery';
import Faq from '@/pages/Faq';
import AgricultureNewsroom from '@/pages/AgricultureNewsroom';
import AgricultureNewsArticle from '@/pages/AgricultureNewsArticle';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import NotFound from '@/pages/NotFound';
import Species from '@/pages/Species';
import ImportExport from '@/pages/ImportExport';
import CompareSeeds from '@/pages/CompareSeeds';
import AskExpert from '@/pages/AskExpert';
import Admin from '@/pages/Admin';
import AdminRoute from '@/components/AdminRoute';
import Dealers from '@/pages/Dealers';
import BecomeDealer from '@/pages/BecomeDealer';
// Add page imports here

const AuthenticatedApp = () => {
  const { authError, navigateToLogin } = useAuth();

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
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/seeds/:slug" element={<SeedDetail />} />
        <Route path="/crops/:slug" element={<CropDetail />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/farmer-stories" element={<FarmerStories />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/newsroom" element={<AgricultureNewsroom />} />
        <Route path="/newsroom/:slug" element={<AgricultureNewsArticle />} />
        <Route path="/news" element={<AgricultureNewsroom />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/spices" element={<Species />} />
        <Route path="/species" element={<Species />} />
        <Route path="/import-export" element={<ImportExport />} />
        <Route path="/compare" element={<CompareSeeds />} />
        <Route path="/ask-expert" element={<AskExpert />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/become-dealer" element={<BecomeDealer />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
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