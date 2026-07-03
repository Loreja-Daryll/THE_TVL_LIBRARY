import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BecomeAVa from './pages/BecomeAVa';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AmbientBackground />
      <CustomCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/become-a-va" element={<BecomeAVa />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}