import { gsap } from './smoothScroll';

/**
 * Auto-lite mode. Watches the frame rate WHILE THE USER SCROLLS. If a device
 * keeps dropping below ~33 fps, it adds the class "tvl-lite" to <html>, which
 * (see home.css) turns off the heaviest effects: backdrop blur, glow layers,
 * grain, pointer tilt. Nothing about layout or content changes.
 *
 * Add ?nolite to the URL to disable it, ?lite to force it (for testing).
 */
export function startPerfGuard() {
  const params = new URLSearchParams(window.location.search);
  const root = document.documentElement;
  if (params.has('nolite')) return () => {};
  if (params.has('lite')) {
    root.classList.add('tvl-lite');
    return () => root.classList.remove('tvl-lite');
  }

  // Low-end hint: start a little more careful, but still let the FPS check decide
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const needBadWindows = weak ? 2 : 4;

  let lastScroll = 0;
  let frames = 0;
  let windowStart = 0;
  let bad = 0;
  const started = performance.now();

  const onScroll = () => { lastScroll = performance.now(); };
  window.addEventListener('scroll', onScroll, { passive: true });

  const tick = () => {
    const now = performance.now();
    if (now - started < 2500) return; // ignore load-time jank
    if (now - lastScroll > 150) { // not scrolling: reset the window
      frames = 0;
      windowStart = 0;
      return;
    }
    if (!windowStart) windowStart = now;
    frames += 1;
    if (now - windowStart >= 1000) {
      const avgMs = (now - windowStart) / frames;
      bad = avgMs > 30 ? bad + 1 : Math.max(0, bad - 1);
      frames = 0;
      windowStart = now;
      if (bad >= needBadWindows) {
        root.classList.add('tvl-lite');
        gsap.ticker.remove(tick);
      }
    }
  };
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('scroll', onScroll);
    root.classList.remove('tvl-lite');
  };
}
