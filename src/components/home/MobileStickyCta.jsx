import { useEffect, useRef, useState } from 'react';

// Shows on mobile once the hero has scrolled past, hides while the Free
// Preview section itself is in view (no point showing a CTA for the form
// you're already looking at).
export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const previewEl = document.getElementById('free-preview');
    if (!previewEl || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
      },
      { threshold: 0 }
    );

    observer.observe(previewEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`tvl-rb-sticky${visible ? ' is-active' : ''}`} aria-hidden={!visible}>
      <a href="#free-preview" className="tvl-rb-btn-primary">
        Get your free preview
      </a>
    </div>
  );
}
