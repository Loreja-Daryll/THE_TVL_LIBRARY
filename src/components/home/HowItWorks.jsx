import { howItWorks, backdrops } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';
import { Icon, ArrowRightIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';

export default function HowItWorks() {
  return (
    <section className="tvl-home-section tvl-home-section--espresso" id="how-it-works">
      <SectionBackdrop variant="espresso" {...backdrops.how} />
      <div className="tvl-home-inner">
        <div className="tvl-home-how-top" data-reveal>
          <div>
            <span className="tvl-home-eyebrow">{howItWorks.eyebrow}</span>
            <h2 className="tvl-home-h2">
              {howItWorks.heading.map((line, i) => (
                <span key={line} className={i === howItWorks.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="tvl-home-body">{howItWorks.body}</p>
          </div>
          <div>
            <div className="tvl-home-cta-row">
              <button
                type="button"
                className="tvl-home-btn tvl-home-btn--primary"
                onClick={() => scrollToTarget(`#${howItWorks.cta.targetId}`)}
              >
                {howItWorks.cta.label}
                <ArrowRightIcon />
              </button>
            </div>
            <p className="tvl-home-cta-note">{howItWorks.ctaNote}</p>
          </div>
        </div>

        <div className="tvl-home-how-grid" data-reveal-stagger>
          <span className="tvl-home-how-track" aria-hidden="true" />
          <span className="tvl-home-how-line" aria-hidden="true" data-draw />
          {howItWorks.steps.map((step) => (
            <div className="tvl-home-how-step" key={step.number} data-reveal-item>
              <div className="tvl-home-how-step-number">{step.number}</div>
              <h3 className="tvl-home-h3">{step.title}</h3>
              <p className="tvl-home-body">{step.line}</p>
              <div className="tvl-home-how-media" aria-hidden="true">
                <Icon name={step.icon} />
              </div>
              <div className="tvl-home-how-tags">
                {step.tags.map((tag) => (
                  <span className="tvl-home-how-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
