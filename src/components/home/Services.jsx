import { services, backdrops } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';
import { Icon, ArrowRightIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';

export default function Services() {
  return (
    <section className="tvl-home-section tvl-home-section--dark" id="services">
      <SectionBackdrop variant="ink" {...backdrops.services} />
      <div className="tvl-home-inner">
        <div className="tvl-home-services-head" data-reveal>
          <div>
            <span className="tvl-home-eyebrow">{services.eyebrow}</span>
            <h2 className="tvl-home-h2">
              {services.heading.map((line, i) => (
                <span key={line} className={i === services.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="tvl-home-body" style={{ alignSelf: 'end' }}>{services.body}</p>
        </div>

        <div className="tvl-home-services-grid" data-reveal-stagger>
          {services.cards.map((card) => (
            <article className="tvl-home-service-card" key={card.id} data-reveal-item>
              <div className="tvl-home-service-number">{card.number}</div>
              <span className="tvl-home-icon-badge">
                <Icon name={card.icon} />
              </span>
              <h3 className="tvl-home-h3">{card.title}</h3>
              <p className="tvl-home-body">{card.line}</p>
              <button
                type="button"
                className="tvl-home-btn tvl-home-btn--ghost"
                onClick={() => scrollToTarget(`#${card.targetId}`)}
              >
                Learn More
                <ArrowRightIcon />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
