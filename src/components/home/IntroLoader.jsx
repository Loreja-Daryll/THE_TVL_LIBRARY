import { useLayoutEffect, useRef } from 'react';
import { gsap, pauseSmoothScroll, resumeSmoothScroll, prefersReducedMotion } from '../../lib/smoothScroll';

const KEY = 'tvl-intro-seen';

const seen = () => {
  try { return window.sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
};
const markSeen = () => {
  try { window.sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
};

/** Run cb once the intro is finished (immediately if there is no intro). */
export function whenIntroDone(cb) {
  if (document.documentElement.dataset.intro !== 'on') {
    cb();
    return () => {};
  }
  window.addEventListener('tvl:intro-done', cb, { once: true });
  return () => window.removeEventListener('tvl:intro-done', cb);
}

/**
 * Short branded intro: TVL logo + a gold line that fills while fonts load, then
 * the screen opens upward onto the hero. Shown once per browser session, never
 * under reduced motion. Hero animations wait for it (data-intro on <html>).
 */
export default function IntroLoader() {
  const rootRef = useRef(null);
  const run = !seen() && !prefersReducedMotion();

  useLayoutEffect(() => {
    const el = rootRef.current;
    const html = document.documentElement;
    if (!run || !el) return undefined;

    html.dataset.intro = 'on';
    pauseSmoothScroll();
    document.body.style.overflow = 'hidden';

    const line = el.querySelector('.tvl-intro-line-fill');
    const logo = el.querySelector('.tvl-intro-logo');
    const tag = el.querySelector('.tvl-intro-tag');

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      markSeen();
      gsap
        .timeline({
          onComplete: () => {
            el.style.display = 'none';
            document.body.style.overflow = '';
            resumeSmoothScroll();
            delete html.dataset.intro;
            window.dispatchEvent(new Event('tvl:intro-done'));
          },
        })
        .to([logo, tag, line.parentElement], { opacity: 0, y: -16, duration: 0.45, ease: 'power2.in' })
        .to(el, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, '-=0.1');
    };

    const intro = gsap.timeline();
    intro
      .fromTo(logo, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .fromTo(tag, { opacity: 0 }, { opacity: 0.7, duration: 0.6 }, '-=0.3');
    const fill = gsap.fromTo(line, { scaleX: 0 }, { scaleX: 0.85, duration: 1.6, ease: 'power1.out' });

    // wait for fonts, but never longer than a hard cap
    const minWait = new Promise((r) => setTimeout(r, 1100));
    const fonts = document.fonts?.ready ? document.fonts.ready : Promise.resolve();
    const cap = new Promise((r) => setTimeout(r, 2600));
    Promise.race([Promise.all([minWait, fonts]), cap]).then(() => {
      fill.kill();
      gsap.to(line, { scaleX: 1, duration: 0.35, ease: 'power2.out', onComplete: finish });
    });

    return () => {
      intro.kill();
      fill.kill();
      document.body.style.overflow = '';
      delete html.dataset.intro;
    };
  }, [run]);

  if (!run) return null;

  return (
    <div className="tvl-intro" ref={rootRef} aria-hidden="true">
      <div className="tvl-intro-inner">
        <div className="tvl-intro-logo">TVL</div>
        <div className="tvl-intro-tag">Ecommerce Creative Studio</div>
        <div className="tvl-intro-line"><span className="tvl-intro-line-fill" /></div>
      </div>
    </div>
  );
}
