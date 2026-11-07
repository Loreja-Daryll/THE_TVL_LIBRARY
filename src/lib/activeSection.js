import { ScrollTrigger, docTop, isStackedLayout } from './smoothScroll';

/**
 * Tracks which homepage section is on screen. Feeds the nav highlight, the
 * progress dots and the URL hash. Tiny external store (no React context).
 */

// order = page order. hash '' means "top of page, no hash".
export const HOME_SECTIONS = [
  { id: 'hero', hash: '', label: 'Home' },
  { id: 'services', hash: '#services', label: 'Services' },
  { id: 'work', hash: '#work', label: 'Selected Work' },
  { id: 'how-it-works', hash: '#how-it-works', label: 'How it works' },
  { id: 'why-tvl', hash: '#why-tvl', label: 'Why TVL' },
  { id: 'faq-talk', hash: '#faq', label: 'FAQ and Let’s Talk' },
  { id: 'ready-to-grow', hash: '#ready-to-grow', label: 'Ready to grow' },
];

let active = 0;
const listeners = new Set();

export const getActiveIndex = () => active;
export const subscribeActive = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const setActive = (i) => {
  if (i === active) return;
  active = i;
  listeners.forEach((fn) => fn());
};

/** Start tracking (call from the homepage). Returns a cleanup function. */
export function startActiveSectionTracking() {
  let raf = 0;

  const compute = () => {
    raf = 0;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const stacked = isStackedLayout();
    let idx = 0;
    HOME_SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const top = docTop(el);
      // stacked: a section counts once its hand-over is past halfway
      const reached = stacked ? y >= top - vh * 0.5 : y + vh * 0.4 >= top;
      if (reached) idx = i;
    });
    setActive(idx);

    // keep the URL hash in sync without adding history entries
    const wanted = HOME_SECTIONS[idx].hash;
    if (window.location.pathname === '/studio' && window.location.hash !== wanted) {
      try {
        window.history.replaceState(null, '', wanted ? wanted : window.location.pathname + window.location.search);
      } catch (e) {
        /* ignore */
      }
    }
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(compute);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  ScrollTrigger.addEventListener('refresh', schedule);
  schedule();

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    ScrollTrigger.removeEventListener('refresh', schedule);
    if (raf) cancelAnimationFrame(raf);
    active = 0;
    listeners.forEach((fn) => fn());
  };
}
