import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';

/**
 * Scroll-driven animation for everything inside containerRef.
 *
 * Data attributes (set in components):
 *   [data-reveal]          block fades + rises in; if it contains an
 *                          .tvl-home-eyebrow / heading / .tvl-home-body /
 *                          CTA button, those enter in that order instead of
 *                          all at once (see "ordered content reveal" below)
 *   [data-reveal-stagger]  group; its [data-reveal-item] children pop in
 *                          with a soft overshoot and drift at slightly
 *                          different speeds (small parallax) while scrolling
 *   [data-parallax="n"]    background layer drifts n% while the section scrolls
 *   [data-draw]            gold line that draws left to right as you scroll
 *
 * Automatic (no attribute needed):
 *   .tvl-home-h1 / .tvl-home-h2   each line wipes + rises in
 *   media frames                  clip-path "unmask" + inner image zoom (scrub)
 *   #hero                         load-in timeline, then pinned while the next
 *                                  section slides over it (desktop only)
 *   ordered content reveal         inside any [data-reveal]: eyebrow, then
 *                                  heading, then body, then CTA, in sequence
 *                                  (built from existing classes, no markup change)
 *   (section-to-section hand-overs live in useSectionTransitions.js)
 *   magnetic buttons                 .tvl-home-btn--primary gets an 8px-max
 *                                  pointer pull, desktop mouse only
 *
 * Everything is wrapped in gsap.matchMedia: reduced-motion users get the
 * final state with zero motion, and ctx.revert() cleans up on unmount.
 */
/* Sections that slide in over the previous one (see useSectionTransitions).
   Their first-screen content is revealed WHILE the slide happens, so the
   panel never glides in empty. */
const SLIDE_IN_IDS = ['work', 'how-it-works', 'why-tvl', 'faq-talk', 'ready-to-grow'];

export default function useGsapReveal(containerRef, deps = []) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const q = (sel) => gsap.utils.toArray(sel, container);
      const slides = window.matchMedia('(min-width: 980px) and (min-height: 560px)').matches;
      // scrollTrigger config for an element: its own position by default, or
      // the mid-slide moment of its section for first-screen content
      const trig = (el, start) => {
        const sec = el.closest('.tvl-home-section, .tvl-home-split');
        if (slides && sec && SLIDE_IN_IDS.includes(sec.id)) {
          const offset = el.getBoundingClientRect().top - sec.getBoundingClientRect().top;
          if (offset < window.innerHeight * 0.85) return { trigger: sec, start: 'top 55%' };
        }
        return { trigger: el, start };
      };

      /* ---------- shared (all screen sizes) ---------- */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Headings: line by line wipe (hero h1 is handled by its own timeline) */
        q('.tvl-home-h1, .tvl-home-h2').forEach((h) => {
          if (h.closest('#hero')) return;
          const lines = h.querySelectorAll(':scope > span');
          if (!lines.length) return;
          gsap.fromTo(
            lines,
            { opacity: 0, y: '0.55em', clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 -20% 0)',
              duration: 1,
              ease: 'power3.out',
              stagger: 0.14,
              clearProps: 'clipPath',
              scrollTrigger: trig(h, 'top 88%'),
            }
          );

          /* Reading fill: after the line appears, its text fills in from dim to
             full, left to right, line by line (accent lines keep their gold) */
          const fillLines = Array.from(lines).filter((l) => !l.classList.contains('tvl-home-accent'));
          if (fillLines.length) {
            h.setAttribute('data-fillhead', '');
            gsap.fromTo(
              fillLines,
              { '--fill': '0%' },
              {
                '--fill': '100%',
                duration: 1.3,
                ease: 'power2.inOut',
                stagger: 0.24,
                delay: 0.45,
                scrollTrigger: trig(h, 'top 88%'),
              }
            );
          }
        });

        /* Ordered content reveal: eyebrow -> heading -> body -> CTA, built
           from the classes every section already uses (no markup change).
           Blocks with none of those (media frames, dividers) get a simple
           fade+rise instead, same as before. */
        q('[data-reveal]').forEach((el) => {
          if (el.closest('#hero')) return; // hero has its own dedicated timeline

          const eyebrow = el.querySelector('.tvl-home-eyebrow');
          const headingLines = el.querySelectorAll('.tvl-home-h1 > span, .tvl-home-h2 > span');
          const body = el.querySelectorAll('.tvl-home-body, .tvl-home-work-note, .tvl-home-small');
          const cta = el.querySelectorAll(
            '.tvl-home-cta-row, .tvl-home-watch, a.tvl-home-btn, button.tvl-home-btn, .tvl-home-cta-note'
          );

          if (!eyebrow && !headingLines.length && !body.length && !cta.length) {
            gsap.fromTo(
              el,
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: trig(el, 'top 88%') }
            );
            return;
          }

          const tl = gsap.timeline({ scrollTrigger: trig(el, 'top 88%') });

          if (eyebrow) {
            tl.fromTo(eyebrow, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' });
          }
          if (headingLines.length) {
            tl.fromTo(
              headingLines,
              { opacity: 0, y: '0.55em', clipPath: 'inset(0 0 100% 0)' },
              {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 -20% 0)',
                duration: 1,
                ease: 'power3.out',
                stagger: 0.14,
                clearProps: 'clipPath',
              },
              eyebrow ? '-=0.35' : 0
            );
          }
          if (body.length) {
            tl.fromTo(
              body,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06 },
              '-=0.55'
            );
          }
          if (cta.length) {
            tl.fromTo(
              cta,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 },
              '-=0.45'
            );
          }
        });

        /* Staggered groups (cards, steps, bullet points, FAQ rows) */
        q('[data-reveal-stagger]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]');
          if (!items.length) return;

          gsap.fromTo(
            items,
            { opacity: 0, y: 48, scale: 0.94, rotationX: 6, filter: 'blur(6px)', transformPerspective: 800 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'back.out(1.4)',
              stagger: 0.12,
              clearProps: 'filter,transform',
              scrollTrigger: trig(group, 'top 85%'),
            }
          );

          /* Subtle per-item depth: items drift a few px left/right at
             slightly different rates as the group scrolls through, so the
             grid feels alive. Uses x (not y), so it never fights the
             entrance tween above. */
          items.forEach((item, i) => {
            const drift = ((i % 3) - 1) * 10; // -10, 0, 10
            if (!drift) return;
            gsap.fromTo(
              item,
              { x: -drift * 0.6 },
              {
                x: drift * 0.6,
                ease: 'none',
                scrollTrigger: { trigger: group, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
              }
            );
          });
        });

        /* Media frames: unmask on enter */
        q('.tvl-home-work-media, .tvl-home-why-media, .tvl-home-grow-media').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(10% 8% 10% 8% round 18px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              duration: 1.2,
              ease: 'power3.out',
              clearProps: 'clipPath',
              scrollTrigger: trig(el, 'top 88%'),
            }
          );
        });

        /* Images: slow zoom-out tied to scroll position */
        q(
          '.tvl-home-work-media img, .tvl-home-why-media img, .tvl-home-grow-media img, .tvl-home-talk-media img'
        ).forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.22 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'center 40%', scrub: 0.6 },
            }
          );
        });

        /* Background layers: drift at a different speed than the content */
        q('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 10;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            }
          );
        });

        /* Process line draws as the steps scroll through */
        q('[data-draw]').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              transformOrigin: 'left center',
              scrollTrigger: { trigger: line.parentElement, start: 'top 75%', end: 'bottom 70%', scrub: 0.6 },
            }
          );
        });

        /* Hero load-in (runs once on page load) */
        const hero = container.querySelector('#hero');
        if (hero) {
          const introOn = document.documentElement.dataset.intro === 'on';
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15, paused: introOn });
          if (introOn) window.addEventListener('tvl:intro-done', () => tl.play(), { once: true });
          tl.fromTo('#hero .tvl-home-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
            .fromTo(
              '#hero .tvl-home-h1 > span',
              { opacity: 0, y: '0.6em', clipPath: 'inset(0 0 100% 0)' },
              { opacity: 1, y: 0, clipPath: 'inset(0 0 -20% 0)', duration: 1.1, stagger: 0.16, clearProps: 'clipPath' },
              '-=0.5'
            )
            .fromTo('#hero .tvl-home-hero-copy .tvl-home-body', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
            .fromTo('#hero .tvl-home-cta-row', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
            .fromTo(
              '#hero .tvl-home-hero-media',
              { opacity: 0, clipPath: 'inset(0 0 0 100% round 20px)' },
              { opacity: 1, clipPath: 'inset(0 0 0 0% round 20px)', duration: 1.3, clearProps: 'clipPath' },
              0.35
            )
            .fromTo('#hero .tvl-home-hero-media img', { scale: 1.25 }, { scale: 1, duration: 1.8 }, 0.35)
            .fromTo('#hero .tvl-home-hero-badge', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
            .fromTo('#hero .tvl-home-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');
        }
      });

      /* ---------- desktop only: hero fades back as you scroll ---------- */
      mm.add('(min-width: 980px) and (prefers-reduced-motion: no-preference)', () => {
        const hero = container.querySelector('#hero');
        if (!hero) return;

        gsap.to('#hero .tvl-home-hero-grid', {
          yPercent: -8,
          scale: 0.95,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });

        gsap.to('#hero .tvl-home-scroll-cue', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: '+=160', scrub: true },
        });
      });

      /* ---------- desktop mouse only: magnetic pull on primary buttons ---------- */
      mm.add(
        '(min-width: 980px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const buttons = q('.tvl-home-btn--primary');
          const cleanups = [];
          const MAX_PULL = 8;

          buttons.forEach((btn) => {
            const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

            const onMove = (e) => {
              const r = btn.getBoundingClientRect();
              const relX = e.clientX - r.left - r.width / 2;
              const relY = e.clientY - r.top - r.height / 2;
              xTo(gsap.utils.clamp(-MAX_PULL, MAX_PULL, relX * 0.3));
              yTo(gsap.utils.clamp(-MAX_PULL, MAX_PULL, relY * 0.3));
            };
            const onLeave = () => {
              xTo(0);
              yTo(0);
            };

            btn.addEventListener('pointermove', onMove);
            btn.addEventListener('pointerleave', onLeave);
            cleanups.push(() => {
              btn.removeEventListener('pointermove', onMove);
              btn.removeEventListener('pointerleave', onLeave);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        }
      );

      /* ---------- reduced motion: final state, no movement ---------- */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-reveal], [data-reveal-item], .tvl-home-inner, .tvl-home-faq-col-inner, .tvl-home-talk-col-inner', {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationX: 0,
          filter: 'none',
          clipPath: 'none',
        });
      });
    }, container);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelAnimationFrame(refresh);
      window.removeEventListener('load', onLoad);
      ctx.revert();
      container.querySelectorAll('[data-fillhead]').forEach((n) => n.removeAttribute('data-fillhead'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
