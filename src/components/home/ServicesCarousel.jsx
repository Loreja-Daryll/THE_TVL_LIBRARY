import { useRef, useState } from 'react';
import { serviceCards } from '../../data/homeRebuildData';
import useReveal from '../../hooks/useReveal';

// A3: 3D swipe carousel. Front/prev/next/hidden positions via class names,
// keyboard (left/right) and touch swipe both supported.
export default function ServicesCarousel({ onSelectPreview }) {
  const containerRef = useReveal();
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  const count = serviceCards.length;
  const go = (dir) => setActive((i) => (i + dir + count) % count);

  const positionFor = (i) => {
    if (i === active) return 'front';
    if (i === (active - 1 + count) % count) return 'prev';
    if (i === (active + 1) % count) return 'next';
    return 'hidden';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section className="tvl-rb-section tvl-rb-section--ivory tvl-rb-services" id="services" ref={containerRef}>
      <div className="tvl-rb-section__inner">
        <div className="tvl-rb-services__intro tvl-reveal">
          <h2 className="tvl-rb-h2">Three ways we grow your brand</h2>
          <p className="tvl-rb-body">
            Pick what you need most, or let us build all three together.
          </p>
        </div>

        <div
          className="tvl-rb-services__stage tvl-reveal"
          style={{ '--d': '0.1s' }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Our services"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="tvl-rb-services__track">
            {serviceCards.map((card, i) => {
              const pos = positionFor(i);
              return (
                <div
                  key={card.id}
                  className={`tvl-rb-services__card tvl-rb-services__card--${pos}`}
                  aria-hidden={pos !== 'front'}
                >
                  {card.video ? (
                    <video src={card.video} poster={card.poster || undefined} muted loop playsInline />
                  ) : card.poster ? (
                    <img src={card.poster} alt="" aria-hidden="true" />
                  ) : (
                    <div className="tvl-rb-services__card-placeholder" />
                  )}
                  <div className="tvl-rb-services__card-gradient">
                    <h3 className="tvl-rb-services__card-title">{card.title}</h3>
                    <p className="tvl-rb-services__card-line">{card.line}</p>
                    {pos === 'front' && (
                      <button
                        type="button"
                        className="tvl-rb-btn-primary"
                        onClick={() => onSelectPreview?.(card.previewType)}
                      >
                        {card.buttonLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tvl-rb-services__controls">
          <button
            type="button"
            className="tvl-rb-services__arrow"
            onClick={() => go(-1)}
            aria-label="Previous service"
          >
            &#8249;
          </button>
          <div className="tvl-rb-services__dots">
            {serviceCards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                className={`tvl-rb-services__dot${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${card.title}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="tvl-rb-services__arrow"
            onClick={() => go(1)}
            aria-label="Next service"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
