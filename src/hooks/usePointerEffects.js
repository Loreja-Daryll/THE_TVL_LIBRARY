import { useEffect } from 'react';
import { gsap } from '../lib/smoothScroll';

/**
 * Desktop mouse only (no touch, no reduced motion, off in lite mode):
 *  - hero: the image frame and the gold glow drift slightly with the cursor
 *  - service and work cards: soft 3D tilt toward the cursor
 */
export default function usePointerEffects(containerRef) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 980px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      if (document.documentElement.classList.contains('tvl-lite')) return undefined;
      const cleanups = [];

      /* hero parallax */
      const hero = root.querySelector('#hero');
      const media = hero?.querySelector('.tvl-home-hero-media');
      const glow = hero?.querySelector('.tvl-home-bd-glow--a');
      if (hero && media) {
        const mx = gsap.quickTo(media, 'x', { duration: 0.8, ease: 'power3.out' });
        const my = gsap.quickTo(media, 'y', { duration: 0.8, ease: 'power3.out' });
        const gx = glow ? gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' }) : null;
        const gy = glow ? gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' }) : null;
        const onMove = (e) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          mx(nx * -18);
          my(ny * -14);
          if (gx) { gx(nx * 60); gy(ny * 40); }
        };
        const onLeave = () => { mx(0); my(0); if (gx) { gx(0); gy(0); } };
        hero.addEventListener('pointermove', onMove);
        hero.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          hero.removeEventListener('pointermove', onMove);
          hero.removeEventListener('pointerleave', onLeave);
        });
      }

      /* card tilt */
      root.querySelectorAll('.tvl-home-service-card, .tvl-home-work-card').forEach((card) => {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        gsap.set(card, { transformPerspective: 900 });
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(nx * 8);
          rx(ny * -8);
        };
        const onLeave = () => { rx(0); ry(0); };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, [containerRef]);
}
