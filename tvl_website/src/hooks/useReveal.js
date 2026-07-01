import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to every ".tvl-reveal" element inside the
 * returned ref's container and adds "is-visible" once it scrolls into view —
 * same behavior as the inline <script> block repeated in every Liquid section.
 */
export default function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const items = container.querySelectorAll('.tvl-reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
