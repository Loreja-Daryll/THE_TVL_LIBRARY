import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Footer from './components/Footer';
import StudioNav from './components/studio/StudioNav';
import StudioFooter from './components/studio/StudioFooter';
import HomePage from './pages/HomePage';
import StudioPage from './pages/StudioPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BecomeAVa from './pages/BecomeAVa';
import usePageTransition from './hooks/usePageTransition';

// Two "sites" live in this one app:
//   /         main TVL site (HomePage, legal pages, Become a VA) with the original Nav + Footer
//   /studio   Creative Studio (StudioPage) with its own StudioNav (has "Back to main page") + StudioFooter
// Each layout brings its own nav, footer and page-level behavior (the Creative
// Studio starts its smooth scroll and perf guard only while it is mounted).

// NOTE: ScrollToTop.jsx still exists and still works, but isn't mounted here.
// usePageTransition owns scroll-to-top for route changes instead (it has to
// reset scroll at the exact moment the curtain covers the screen, not the
// instant navigation starts, otherwise the old page visibly jumps before the
// curtain finishes wiping in).

function MainLayout() {
  return (
    <>
      <AmbientBackground />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

function StudioLayout() {
  return (
    <>
      <StudioNav />
      <Outlet />
      <StudioFooter />
    </>
  );
}

function AppShell() {
  const { displayLocation, curtainRef } = usePageTransition();

  return (
    <>
      <div ref={curtainRef} className="tvl-route-curtain" aria-hidden="true" />
      <CustomCursor />
      <Routes location={displayLocation}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/become-a-va" element={<BecomeAVa />} />
        </Route>
        <Route element={<StudioLayout />}>
          <Route path="/studio" element={<StudioPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
