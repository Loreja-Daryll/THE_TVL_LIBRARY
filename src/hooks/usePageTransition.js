import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion, pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll';

/**
 * Route transition curtain. React Router updates `location` (and therefore
 * which route <Routes> renders) the instant navigation happens, so to get a
 * "wipe in, swap, wipe out" feel instead of an instant cut, <Routes> here is
 * given a *decoupled* `displayLocation` that only advances once the curtain
 * has fully covered the screen. That's also the right moment to reset scroll
 * and to stop/resume Lenis, so this hook owns scroll-to-top for route
 * changes instead of ScrollToTop (kept in the repo, just not mounted here,
 * since mounting both would reset scroll on the old page before the curtain
 * covers it, causing a visible jump).
 *
 * Total duration is ~0.7s (0.32s in + 0.06s hold + 0.32s out). Reduced motion
 * skips the curtain entirely and swaps + scrolls instantly.
 */
export default function usePageTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const curtainRef = useRef(null);
  const didMountScrollRestoration = useRef(false);

  useEffect(() => {
    if (didMountScrollRestoration.current) return;
    didMountScrollRestoration.current = true;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return undefined;

    if (prefersReducedMotion()) {
      setDisplayLocation(location);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    const curtain = curtainRef.current;
    if (!curtain) {
      setDisplayLocation(location);
      return undefined;
    }

    pauseSmoothScroll();
    const tl = gsap.timeline({ onComplete: resumeSmoothScroll });

    tl.set(curtain, { display: 'block', clipPath: 'inset(0 0 100% 0)' })
      .to(curtain, { clipPath: 'inset(0% 0 0% 0)', duration: 0.32, ease: 'power2.inOut' })
      .call(() => {
        setDisplayLocation(location);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      })
      .to(curtain, { clipPath: 'inset(100% 0 0% 0)', duration: 0.32, ease: 'power2.inOut', delay: 0.06 })
      .set(curtain, { display: 'none' });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, displayLocation]);

  return { displayLocation, curtainRef };
}
