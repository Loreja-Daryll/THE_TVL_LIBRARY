import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BecomeAVa from './pages/BecomeAVa';
import { startSmoothScroll } from './lib/smoothScroll';
import { startPerfGuard } from './lib/perfGuard';
import usePageTransition from './hooks/usePageTransition';

// NOTE: ScrollToTop.jsx still exists and still works, but isn't mounted here.
// usePageTransition owns scroll-to-top for route changes instead (it has to
// reset scroll at the exact moment the curtain covers the screen, not the
// instant navigation starts, otherwise the old page visibly jumps before the
// curtain finishes wiping in).
function AppShell() {
  const { displayLocation, curtainRef } = usePageTransition();

  return (
    <>
      <div ref={curtainRef} className="tvl-route-curtain" aria-hidden="true" />
      <AmbientBackground />
      <CustomCursor />
      <Nav />
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/become-a-va" element={<BecomeAVa />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => startSmoothScroll(), []);
  useEffect(() => startPerfGuard(), []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}