import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerFn = null;

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Starts Lenis inertia scrolling and syncs it with GSAP's ticker so
 * ScrollTrigger stays accurate. Skipped entirely under reduced-motion —
 * native scrolling takes over instead. Call once near the app root.
 */
export function startSmoothScroll() {
  if (prefersReducedMotion() || lenisInstance) return () => {};

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  tickerFn = (time) => lenisInstance.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    if (tickerFn) gsap.ticker.remove(tickerFn);
    lenisInstance?.destroy();
    lenisInstance = null;
    tickerFn = null;
  };
}

/** Pauses/resumes Lenis without destroying it (used by the route page-transition curtain). */
export function pauseSmoothScroll() {
  lenisInstance?.stop();
}
export function resumeSmoothScroll() {
  lenisInstance?.start();
}

/**
 * Document position of an element from LAYOUT offsets (ignores the transforms
 * the section transitions animate). While a section is pinned (position:fixed
 * inside a .pin-spacer) its own offset is meaningless, so the in-flow
 * pin-spacer is used in its place.
 */
export function docTop(el) {
  let y = 0;
  let n = el;
  while (n) {
    if (n.parentElement?.classList.contains('pin-spacer') && getComputedStyle(n).position === 'fixed') {
      n = n.parentElement;
      continue;
    }
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return y;
}

// True when a homepage is running its stacked hand-overs: the Creative Studio
// (hooks/useSectionTransitions.js) or the main site (hooks/useMainTransitions.js); keep this query in sync with it.
export function isStackedLayout() {
  return (
    (!!document.querySelector('.tvl-home') || document.documentElement.classList.contains('tvl-main-stack')) &&
    window.matchMedia('(min-width: 980px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)').matches
  );
}

/**
 * Jumps (teleports) straight to a selector/element, no scrolling animation.
 * Used by the nav and every in-page button, because animating through the
 * stacked section hand-overs made the page lag.
 */
export function scrollToTarget(target, { offset = -88 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  let top;
  if (isStackedLayout()) {
    // Each section is a full-screen panel: land exactly where its hand-over has finished
    top = docTop(el);
  } else {
    top = el.getBoundingClientRect().top + window.scrollY + offset;
  }
  top = Math.max(0, Math.round(top));

  if (lenisInstance) {
    lenisInstance.scrollTo(top, { immediate: true, force: true });
    ScrollTrigger.update();
    return;
  }
  window.scrollTo({ top, behavior: 'auto' });
}

export { gsap, ScrollTrigger };
