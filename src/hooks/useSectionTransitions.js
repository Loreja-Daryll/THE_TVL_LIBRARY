import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';

/**
 * Homepage section-to-section choreography (desktop, motion allowed).
 *
 * Every hand-over is scroll-scrubbed: scrolling down plays it forward,
 * scrolling up plays it in reverse. The outgoing section is pinned in place
 * (pinSpacing:false) while the incoming one animates over it for exactly one
 * viewport of scroll, then normal scrolling continues.
 *
 *   hero      -> services   services slides UP and covers the hero
 *   services  -> work       work comes in from the RIGHT
 *   work      -> how        how comes in from the LEFT
 *   how       -> why        why FADES IN over how
 *   why       -> faq+talk   why fades OUT, FAQ from the LEFT and Let's Talk
 *                           from the RIGHT, at the same time
 *   faq+talk  -> grow       the two columns split apart (FAQ left, Talk
 *                           right) and Ready to Grow opens up behind them
 *
 * Trick used for the "pop up from the side" ones: the incoming section is
 * held at the top of the screen with a y offset that cancels the normal
 * scroll (-100vh -> 0), so only the sideways / fade motion is visible, and the
 * hand-over ends exactly where normal scrolling takes over (no jump).
 *
 * Phones and small windows keep plain scrolling with the regular reveals.
 */
export default function useSectionTransitions(containerRef) {
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 980px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)', () => {
        const $ = (sel) => root.querySelector(sel);
        const hero = $('#hero');
        const services = $('#services');
        const work = $('#work');
        const how = $('#how-it-works');
        const why = $('#why-tvl');
        const split = $('#faq-talk');
        const grow = $('#ready-to-grow');
        if (![hero, services, work, how, why, split, grow].every(Boolean)) return undefined;

        const faqCol = split.querySelector('.tvl-home-faq-col');
        const talkCol = split.querySelector('.tvl-home-talk-col');
        const vh = () => window.innerHeight;

        // Document position from LAYOUT offsets. Unlike getBoundingClientRect
        // this ignores the transforms we animate, so the scroll ranges stay
        // correct even while a section is offset to the side or held up.
        const docTop = (el) => {
          let y = 0;
          for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
          return y;
        };

        // One viewport of scroll: from "next top at bottom of screen" to "next top at top"
        const startOf = (next) => () => docTop(next) - vh();
        const endOf = (next) => () => docTop(next);
        const range = (next) => ({
          start: startOf(next),
          end: endOf(next),
          scrub: true,
          invalidateOnRefresh: true,
        });

        // Pin the outgoing section while the next one animates over it
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
        const hold = (el) =>
          gsap.fromTo(el, { y: () => -vh() }, { y: 0, ease: 'none', scrollTrigger: range(el) });

        /* Pins first: they must capture each section's clean, untransformed
           state before the tweens below start offsetting anything. */
        pin(hero, services);
        pin(services, work);
        pin(work, how);
        pin(how, why);
        pin(why, split);
        pin(split, grow);

        /* 1. hero -> services: services simply slides up and covers the hero (pure pin, no tween) */

        /* 2. services -> work: from the RIGHT */
        hold(work);
        gsap.fromTo(work, { x: '100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(work) });

        /* 3. work -> how: from the LEFT */
        hold(how);
        gsap.fromTo(how, { x: '-100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(how) });

        /* 4. how -> why: fade in */
        hold(why);
        gsap.fromTo(
          why,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, ease: 'sine.inOut', scrollTrigger: range(why) }
        );

        /* 5. why -> faq + talk: why fades out, the two columns arrive together */
        hold(split);
        gsap.fromTo(
          why,
          { opacity: 1, scale: 1 },
          { opacity: 0.15, scale: 0.96, ease: 'sine.inOut', immediateRender: false, scrollTrigger: range(split) }
        );
        if (faqCol) gsap.fromTo(faqCol, { x: '-100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(split) });
        if (talkCol) gsap.fromTo(talkCol, { x: '100%' }, { x: '0%', ease: 'power2.inOut', scrollTrigger: range(split) });

        /* 6. faq + talk -> grow: the columns part, grow opens up behind them */
        hold(grow);
        if (faqCol) {
          gsap.fromTo(
            faqCol,
            { x: '0%' },
            { x: '-100%', ease: 'power2.inOut', immediateRender: false, scrollTrigger: range(grow) }
          );
        }
        if (talkCol) {
          gsap.fromTo(
            talkCol,
            { x: '0%' },
            { x: '100%', ease: 'power2.inOut', immediateRender: false, scrollTrigger: range(grow) }
          );
        }
        gsap.fromTo(
          grow,
          { opacity: 0.35, scale: 0.94 },
          { opacity: 1, scale: 1, ease: 'sine.inOut', scrollTrigger: range(grow) }
        );

        return undefined;
      });

      /* ---------- phones / small windows: lighter card-stack version ----------
         No pinning (sections can be taller than the screen). Each section
         rises over the previous one like a card with rounded top corners, and
         the section it covers sinks back and dims. Scrub = reversible. */
      mm.add(
        '(max-width: 979px) and (prefers-reduced-motion: no-preference), (max-height: 559px) and (prefers-reduced-motion: no-preference)',
        () => {
          const sections = Array.from(root.children).filter((el) =>
            el.matches('.tvl-home-section, .tvl-home-split')
          );
          sections.forEach((sec, i) => {
            if (i === 0) return;
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
            const prevInners = sections[i - 1].querySelectorAll(
              '.tvl-home-inner, .tvl-home-faq-col-inner, .tvl-home-talk-col-inner'
            );
            if (prevInners.length) {
              gsap.fromTo(
                prevInners,
                { scale: 1, opacity: 1, transformOrigin: '50% 100%' },
                {
                  scale: 0.95,
                  opacity: 0.55,
                  ease: 'none',
                  immediateRender: false,
                  scrollTrigger: { trigger: sec, start: 'top 100%', end: 'top 15%', scrub: true },
                }
              );
            }
          });
          return undefined;
        }
      );
    }, root);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, []);
}
