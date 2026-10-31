import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, pauseSmoothScroll, resumeSmoothScroll } from '../lib/smoothScroll';
import '../styles/modal.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/**
 * Reusable accessible modal. Backdrop fades + blurs, panel pops in
 * (scale 0.92 -> 1, y 24 -> 0, opacity), reverses on close. Traps focus,
 * closes on Esc/backdrop click, returns focus to the element that opened it,
 * and pauses Lenis + locks body scroll while open.
 *
 * Stays mounted a little past `open=false` so the close animation can play
 * (reduced motion skips straight to unmounted).
 */
export default function Modal({ open, onClose, children, ariaLabel, className = '' }) {
  const [rendered, setRendered] = useState(open);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (open) setRendered(true);
  }, [open]);

  useEffect(() => {
    if (!rendered) return undefined;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;

    if (open) {
      openerRef.current = document.activeElement;
      pauseSmoothScroll();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      let tl;
      if (!prefersReducedMotion() && backdrop && panel) {
        tl = gsap.timeline();
        tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }).fromTo(
          panel,
          { opacity: 0, y: 24, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
          '-=0.12'
        );
      }

      const focusables = getFocusable(panel);
      (focusables[0] || panel)?.focus();

      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        if (e.key !== 'Tab' || !panel) return;
        const items = getFocusable(panel);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', onKeyDown);

      return () => {
        tl?.kill();
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }

    // closing
    resumeSmoothScroll();
    openerRef.current?.focus?.();

    if (prefersReducedMotion() || !backdrop || !panel) {
      setRendered(false);
      return undefined;
    }
    const tl = gsap.timeline({ onComplete: () => setRendered(false) });
    tl.to(panel, { opacity: 0, y: 16, scale: 0.95, duration: 0.2, ease: 'power2.in' }).to(
      backdrop,
      { opacity: 0, duration: 0.18, ease: 'power2.in' },
      '-=0.08'
    );
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, rendered]);

  if (!rendered) return null;

  return (
    <div
      className="tvl-modal-backdrop"
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`tvl-modal-panel ${className}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        <button type="button" className="tvl-modal-close" aria-label="Close dialog" onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

/** Small inline confirmation: a checkmark draws in, then the message fades up. */
export function ConfirmToast({ show, message }) {
  const wrapRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    if (!show || !wrapRef.current) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(wrapRef.current, { opacity: 1, y: 0 });
      return undefined;
    }

    const tl = gsap.timeline();
    tl.fromTo(wrapRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    if (checkRef.current) {
      const path = checkRef.current;
      const len = path.getTotalLength ? path.getTotalLength() : 20;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(path, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 0.05);
    }
    return () => tl.kill();
  }, [show]);

  if (!show) return null;

  return (
    <div className="tvl-modal-toast" ref={wrapRef} role="status">
      <svg className="tvl-modal-toast-check" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          ref={checkRef}
          d="M7 12.5l3.2 3.2L17 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
