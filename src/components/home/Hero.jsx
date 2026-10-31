import { useState } from 'react';
import { hero, backdrops } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';
import { ArrowRightIcon, PlayIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';
import Modal from '../Modal';

export default function Hero() {
  const [watchOpen, setWatchOpen] = useState(false);

  return (
    <section className="tvl-home-section tvl-home-section--dark tvl-home-hero" id="hero">
      <SectionBackdrop variant="hero" {...backdrops.hero} />
      <div className="tvl-home-inner tvl-home-hero-grid">
        <div className="tvl-home-hero-copy">
          <span className="tvl-home-eyebrow">{hero.eyebrow}</span>
          <h1 className="tvl-home-h1">
            {hero.heading.map((line, i) => (
              <span key={line} className={i === hero.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                {line}
              </span>
            ))}
          </h1>
          <p className="tvl-home-body">{hero.body}</p>
          <div className="tvl-home-cta-row" style={{ marginTop: '2.25rem' }}>
            <button
              type="button"
              className="tvl-home-btn tvl-home-btn--primary"
              onClick={() => scrollToTarget(`#${hero.primaryCta.targetId}`)}
            >
              {hero.primaryCta.label}
              <ArrowRightIcon />
            </button>
            <button type="button" className="tvl-home-watch" onClick={() => setWatchOpen(true)}>
              <PlayIcon />
              {hero.secondaryCta.label}
            </button>
          </div>
        </div>

        <div className="tvl-home-hero-media">
          <img src={hero.image} alt="TVL ecommerce creative studio workspace" loading="eager" />
          <span className="tvl-home-hero-badge">
            <span className="tvl-home-hero-badge-dot" aria-hidden="true" />
            {hero.badge}
          </span>
        </div>
      </div>
      <span className="tvl-home-scroll-cue" aria-hidden="true">
        <span className="tvl-home-scroll-cue-line" />
        Scroll to discover
      </span>

      <Modal open={watchOpen} onClose={() => setWatchOpen(false)} ariaLabel="Watch our work">
        <div className="tvl-home-watch-modal">
          <h3 className="tvl-home-h3" style={{ fontSize: '1.4rem' }}>Watch Our Work</h3>
          {hero.videoSrc ? (
            <video className="tvl-home-watch-modal-video" src={hero.videoSrc} controls autoPlay playsInline />
          ) : (
            // TODO: Sheena to provide the real studio reel. Swap this placeholder
            // once hero.videoSrc (src/data/homeContent.js) points at a real file.
            <div className="tvl-home-watch-modal-placeholder">
              <PlayIcon />
              <p className="tvl-home-body">Our demo reel is coming soon. In the meantime, book a free strategy call to see real examples of our work.</p>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
}
