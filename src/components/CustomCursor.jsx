import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices — a fake cursor doesn't make sense there.
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf;

    const onMove = (e) => {
      setVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
      const hovered = e.target.closest('a, button, .tvl-svc-card, .tvl-booking__cal-day--available, .tvl-booking__cal-day--active, .tvl-booking__slot');
      setIsPointer(Boolean(hovered));
    };

    const onLeave = () => setVisible(false);

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`tvl-cursor-dot ${visible ? 'is-visible' : ''} ${isPointer ? 'is-pointer' : ''}`}
      />
      <div
        ref={ringRef}
        className={`tvl-cursor-ring ${visible ? 'is-visible' : ''} ${isPointer ? 'is-pointer' : ''}`}
      />
    </>
  );
}
