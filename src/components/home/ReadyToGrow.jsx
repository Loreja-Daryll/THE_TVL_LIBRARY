import { readyToGrow, backdrops } from '../../data/homeContent';
import { LINKS } from '../../constants/links';
import { Icon, ArrowRightIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';

export default function ReadyToGrow() {
  return (
    <section className="tvl-home-section tvl-home-section--dark" id="ready-to-grow">
      <SectionBackdrop variant="ink" {...backdrops.grow} />
      <div className="tvl-home-inner tvl-home-grow-grid">
        <div data-reveal>
          <span className="tvl-home-eyebrow">{readyToGrow.eyebrow}</span>
          <h2 className="tvl-home-h1">
            {readyToGrow.heading.map((line, i) => (
              <span key={line} className={i === readyToGrow.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                {line}
              </span>
            ))}
          </h2>
          <p className="tvl-home-body">{readyToGrow.body}</p>
          <div className="tvl-home-cta-row" style={{ marginTop: '2rem' }}>
            <a
              href={LINKS.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tvl-home-btn tvl-home-btn--primary"
            >
              {readyToGrow.cta.label}
              <ArrowRightIcon />
            </a>
          </div>
          <p className="tvl-home-cta-note">{readyToGrow.ctaNote}</p>
        </div>

        <span className="tvl-home-grow-divider" aria-hidden="true" />

        <div className="tvl-home-grow-points" data-reveal-stagger>
          {readyToGrow.points.map((point) => (
            <div className="tvl-home-grow-point" key={point.title} data-reveal-item>
              <span className="tvl-home-icon-badge">
                <Icon name={point.icon} />
              </span>
              <div>
                <h3 className="tvl-home-h3">{point.title}</h3>
                <p className="tvl-home-body">{point.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tvl-home-inner" style={{ marginTop: '4rem' }} data-reveal>
        <div className="tvl-home-grow-media">
          <img src={readyToGrow.image} alt="TVL ecommerce creative studio workspace" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
