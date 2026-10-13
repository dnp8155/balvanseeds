import React, { Suspense, lazy } from 'react';
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
import AdminRoute from '@/components/AdminRoute';

// Lazy-loaded routes for optimal initial bundle size and sub-1s LCP
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Seeds = lazy(() => import('@/pages/Seeds'));
const SeedDetail = lazy(() => import('@/pages/SeedDetail'));
const CropDetail = lazy(() => import('@/pages/CropDetail'));
const Certificates = lazy(() => import('@/pages/Certificates'));
const Downloads = lazy(() => import('@/pages/Downloads'));
const FarmerStories = lazy(() => import('@/pages/FarmerStories'));
const Videos = lazy(() => import('@/pages/Videos'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Faq = lazy(() => import('@/pages/Faq'));
const AgricultureNewsroom = lazy(() => import('@/pages/AgricultureNewsroom'));
const AgricultureNewsArticle = lazy(() => import('@/pages/AgricultureNewsArticle'));
const Terms = lazy(() => import('@/pages/Terms'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Species = lazy(() => import('@/pages/Species'));
const ImportExport = lazy(() => import('@/pages/ImportExport'));
const CompareSeeds = lazy(() => import('@/pages/CompareSeeds'));
const AskExpert = lazy(() => import('@/pages/AskExpert'));
const Dealers = lazy(() => import('@/pages/Dealers'));
const BecomeDealer = lazy(() => import('@/pages/BecomeDealer'));
const Admin = lazy(() => import('@/pages/Admin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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

  // Render the main app with code-split route boundaries
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-background" />}>
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
    </Suspense>
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