import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Instantly jumps the window to the top whenever the route changes.
 *
 * Three things can cause a visible "scroll up" animation instead of
 * an instant jump, so this fixes all three:
 *
 * 1. The browser's own scroll restoration remembers where you were
 *    on the previous page. We turn this off (once, on mount) so it
 *    never tries to "helpfully" restore a scroll position.
 * 2. CSS smooth-scroll (`scroll-behavior: smooth`) might be set on
 *    <html> OR <body> — we temporarily force both to 'auto'.
 * 3. Using useLayoutEffect (not useEffect) means this runs BEFORE
 *    the browser paints the new page, so there's no visible frame
 *    where the old scroll position is shown before jumping.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBehavior = html.style.scrollBehavior;
    const prevBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    html.style.scrollBehavior = prevHtmlBehavior;
    body.style.scrollBehavior = prevBodyBehavior;
  }, [pathname]);

  return null;
}
