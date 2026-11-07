import { useState } from 'react';
import { faq, letsTalk, backdrops } from '../../data/homeContent';
import { LINKS } from '../../constants/links';
import { Icon, ArrowRightIcon, MailIcon } from './icons';
import SectionBackdrop from './SectionBackdrop';

export default function FaqTalk() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="tvl-home-split" id="faq-talk">
      <div className="tvl-home-faq-col" id="faq">
        <SectionBackdrop variant="ink" {...backdrops.faq} />
        <div className="tvl-home-faq-col-inner" data-reveal>
          <span className="tvl-home-eyebrow">{faq.eyebrow}</span>
          <h2 className="tvl-home-h2">
            {faq.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="tvl-home-body">{faq.body}</p>

          <div className="tvl-home-faq-list" data-reveal-stagger>
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div className={`tvl-home-faq-item ${isOpen ? 'is-open' : ''}`} key={item.question} data-reveal-item>
                  <button
                    type="button"
                    className="tvl-home-faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="tvl-home-faq-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="tvl-home-faq-question">{item.question}</span>
                    <span className="tvl-home-faq-toggle" aria-hidden="true">
                      <span className="tvl-home-faq-toggle-bar tvl-home-faq-toggle-bar--h" />
                      <span className="tvl-home-faq-toggle-bar tvl-home-faq-toggle-bar--v" />
                    </span>
                  </button>
                  <div className="tvl-home-faq-answer-wrap" id={`faq-answer-${index}`}>
                    <div className="tvl-home-faq-answer-inner">
                      <p className="tvl-home-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tvl-home-faq-contact">
            <span className="tvl-home-icon-badge">
              <MailIcon />
            </span>
            <div>
              <h3 className="tvl-home-h3" style={{ fontSize: '1.05rem' }}>{faq.contactNote}</h3>
              <p className="tvl-home-body" style={{ fontSize: '0.9rem' }}>
                {faq.contactLine} <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tvl-home-talk-col" id="lets-talk">
        <SectionBackdrop variant="espresso" {...backdrops.talk} />
        <div className="tvl-home-talk-media" aria-hidden="true">
          <img src={letsTalk.image} alt="" loading="lazy" />
        </div>
        <div className="tvl-home-talk-col-inner" data-reveal>
          <span className="tvl-home-eyebrow">{letsTalk.eyebrow}</span>
          <h2 className="tvl-home-h2">
            {letsTalk.heading.map((line, i) => (
              <span key={line} className={i === letsTalk.headingAccentIndex ? 'tvl-home-accent' : undefined}>
                {line}
              </span>
            ))}
          </h2>
          <p className="tvl-home-body">{letsTalk.body}</p>

          <div className="tvl-home-talk-points" data-reveal-stagger>
            {letsTalk.points.map((point) => (
              <div className="tvl-home-talk-point" key={point.title} data-reveal-item>
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

          <a
            href={LINKS.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tvl-home-btn tvl-home-btn--primary"
          >
            {letsTalk.cta.label}
            <ArrowRightIcon />
          </a>
          <p className="tvl-home-cta-note">{letsTalk.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}
