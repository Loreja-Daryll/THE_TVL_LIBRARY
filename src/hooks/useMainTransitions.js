import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';

/**
 * Scroll hand-overs for the MAIN TVL site. Same idea as the Creative Studio,
 * but simpler and with no video: the existing ambient background stays.
 *
 * Desktop (motion allowed). Every hand-over is scrubbed by scroll, so scrolling
 * down plays it forward and scrolling up plays it in reverse. The outgoing
 * section is pinned (pinSpacing:false) by its bottom edge while the next one
 * arrives over it for exactly one viewport of scroll:
 *
 *   hero     -> process   process rises up and covers the hero
 *   process  -> services  services pops in from the RIGHT
 *   services -> about     about pops in from the LEFT
 *   about    -> reviews   reviews rises up and covers about
 *   reviews  -> booking   booking pops in from the RIGHT
 *
 * The side pop-ups use a "hold": a y offset that cancels the natural scroll
 * (-100vh -> 0), so only the sideways motion is visible and the hand-over ends
 * exactly where normal scrolling takes over.
 *
 * Phones, small windows and reduced motion keep normal scrolling (phones get a
 * light rounded "card rise"). Content is never changed.
 */
const IDS = ['section-hero', 'process', 'services', 'about', 'reviews', 'booking'];

export default function useMainTransitions() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 980px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)', () => {
        const [hero, process, services, about, reviews, booking] = IDS.map((id) => document.getElementById(id));
        if (![hero, process, services, about, reviews, booking].every(Boolean)) return undefined;

        html.classList.add('tvl-main-stack');
        const vh = () => window.innerHeight;

        // Document position from LAYOUT offsets (ignores the transforms we animate)
        const docTop = (el) => {
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
        };

        // One viewport of scroll: from "next top at bottom of screen" to "next top at top"
        const startOf = (next) => () => docTop(next) - vh();
        const endOf = (next) => () => docTop(next);
        const range = (next) => ({ start: startOf(next), end: endOf(next), scrub: true, invalidateOnRefresh: true });

        // Pin the outgoing section while the next one arrives over it
        const pin = (prev, next) =>
          ScrollTrigger.create({
            start: startOf(next),
            end: endOf(next),
            pin: prev,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

        // Cancel the natural upward movement so the incoming section stays put on screen
        const hold = (el) => gsap.fromTo(el, { y: () => -vh() }, { y: 0, ease: 'none', scrollTrigger: range(el) });

        // The section being covered sinks back a little
        const sink = (prev, next) =>
          gsap.fromTo(
            prev,
            { opacity: 1, scale: 1 },
            { opacity: 0.35, scale: 0.97, ease: 'none', immediateRender: false, scrollTrigger: range(next) }
          );

        // Pins first: they must capture each section's clean state before any tween offsets it
        pin(hero, process);
        pin(process, services);
        pin(services, about);
        pin(about, reviews);
        pin(reviews, booking);

        // 1. hero -> process: rises up and covers
        sink(hero, process);

        // 2. process -> services: from the RIGHT
        hold(services);
        gsap.fromTo(services, { x: '100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(services) });
        sink(process, services);

        // 3. services -> about: from the LEFT
        hold(about);
        gsap.fromTo(about, { x: '-100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(about) });
        sink(services, about);

        // 4. about -> reviews: rises up and covers
        sink(about, reviews);

        // 5. reviews -> booking: from the RIGHT
        hold(booking);
        gsap.fromTo(booking, { x: '100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(booking) });
        sink(reviews, booking);

        return () => html.classList.remove('tvl-main-stack');
      });

      /* Phones / small windows: no pinning (sections can be taller than the
         screen). Each section rises over the previous one like a card with
         rounded top corners. Scrub = reversible. */
      mm.add(
        '(max-width: 979px) and (prefers-reduced-motion: no-preference), (max-height: 559px) and (prefers-reduced-motion: no-preference)',
        () => {
          IDS.slice(1).forEach((id) => {
            const sec = document.getElementById(id);
            if (!sec) return;
            gsap.fromTo(
              sec,
              { clipPath: 'inset(4% 4% 0% 4% round 26px 26px 0px 0px)', y: 36 },
              {
                clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
                y: 0,
                ease: 'none',
                scrollTrigger: { trigger: sec, start: 'top 100%', end: 'top 45%', scrub: true },
              }
            );
          });
          return undefined;
        }
      );
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    // Images (hero, founder) change section heights once loaded
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelAnimationFrame(refresh);
      window.removeEventListener('load', onLoad);
      ctx.revert();
      html.classList.remove('tvl-main-stack');
    };
  }, []);
}
