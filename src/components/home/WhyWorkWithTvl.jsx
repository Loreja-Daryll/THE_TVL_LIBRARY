import { whyWorkWithTvl, backdrops } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';
import { Icon, ArrowRightIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';

export default function WhyWorkWithTvl() {
  return (
    <section className="tvl-home-section tvl-home-section--dark" id="why-tvl">
      <SectionBackdrop variant="ink" {...backdrops.why} />
      <div className="tvl-home-inner tvl-home-why-grid">
        <div className="tvl-home-why-media" data-reveal>
          <img src={whyWorkWithTvl.image} alt="TVL studio desk" loading="lazy" />
        </div>

        <div>
          <div data-reveal>
            <span className="tvl-home-eyebrow">{whyWorkWithTvl.eyebrow}</span>
            <h2 className="tvl-home-h2">
              {whyWorkWithTvl.heading.map((line, i) => (
                <span key={line} className={i === whyWorkWithTvl.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="tvl-home-body">{whyWorkWithTvl.body}</p>
            <div className="tvl-home-cta-row" style={{ marginTop: '1.75rem' }}>
              <button
                type="button"
                className="tvl-home-btn tvl-home-btn--primary"
                onClick={() => scrollToTarget(`#${whyWorkWithTvl.cta.targetId}`)}
              >
                {whyWorkWithTvl.cta.label}
                <ArrowRightIcon />
              </button>
            </div>
            <p className="tvl-home-cta-note">{whyWorkWithTvl.ctaNote}</p>
          </div>

          <div className="tvl-home-why-points" style={{ marginTop: '2.5rem' }} data-reveal-stagger>
            {whyWorkWithTvl.points.map((point) => (
              <div className="tvl-home-why-point" key={point.title} data-reveal-item>
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
      </div>
    </section>
  );
}
