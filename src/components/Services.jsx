import useReveal from '../hooks/useReveal';

const ICONS = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
  'message-square': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  'globe-2': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
      <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
      <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  'share-2': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  ),
  'clipboard-list': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  'user-cog': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="15" r="3" />
      <circle cx="9" cy="7" r="4" />
      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
      <path d="m21.7 16.4-.9-.3" />
      <path d="m15.2 13.9-.9-.3" />
      <path d="m16.6 18.7.3-.9" />
      <path d="m19.1 12.2.3-.9" />
      <path d="m19.6 18.7-.4-1" />
      <path d="m16.8 12.3-.4-1" />
      <path d="m14.3 16.6 1-.4" />
      <path d="m20.7 13.8 1-.4" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

// Exact block order + settings from templates/index.json ("services_hzpgV8")
const SERVICES = [
  { icon: 'briefcase', title: 'Operational Support', text: 'Embedded operators who run the back-end of your business with precision.' },
  { icon: 'message-square', title: 'Customer Communication', text: 'On-brand replies across email, chat, and DMs handled in hours, not days.' },
  { icon: 'globe-2', title: 'Website Optimization', text: 'Faster, sharper, conversion-focused sites that match the caliber of your work.' },
  { icon: 'share-2', title: 'Social Media Support', text: 'Content scheduling, engagement, and inbox triage that keeps the brand alive.' },
  { icon: 'bot', title: 'AI Workflow Systems', text: 'Custom GPT-powered automations that remove the repeatable work from your day.' },
  { icon: 'inbox', title: 'Inbox Management', text: 'Zero-inbox systems with prioritization, drafts, and follow-ups built in.' },
  { icon: 'calculator', title: 'Bookkeeping', text: 'Clean books, reconciled accounts, and clear financial visibility month after month.' },
  { icon: 'clipboard-list', title: 'Project Management', text: 'End-to-end oversight of your projects timelines, handoffs, and deliverables run with executive precision.' },
  { icon: 'user-cog', title: 'Executive Assistance', text: 'Calendar, travel, and personal logistics handled with discretion so you focus only on what you can do.' },
];

export default function Services() {
  const containerRef = useReveal();

  return (
    <section className="tvl-services" id="services" ref={containerRef}>
      <div className="tvl-services__inner">
        <div className="tvl-services__intro tvl-reveal">
          <div className="tvl-services__intro-left">
            <div className="tvl-services__eyebrow">Services</div>
            <h2 className="tvl-services__title">
              How We Support
              <br />
              <span className="tvl-services__title-accent">Growing Businesses</span>
            </h2>
          </div>
          <p className="tvl-services__intro-right">
            A library of operational talent and AI systems, engineered to give founders their
            time, focus, and margin back.
          </p>
        </div>

        <div className="tvl-services__grid">
          {SERVICES.map((s, i) => (
            <a
              key={s.title}
              href="#booking"
              className="tvl-svc-card tvl-glass tvl-reveal"
              style={{ '--d': `${(i * 0.07).toFixed(2)}s` }}
            >
              <div className="tvl-svc-card__hover-glow" aria-hidden="true"></div>
              <div className="tvl-svc-card__content">
                <div className="tvl-svc-card__row">
                  <div className="tvl-svc-card__icon">{ICONS[s.icon]}</div>
                  <div className="tvl-svc-card__arrow" aria-hidden="true">
                    <ArrowIcon />
                  </div>
                </div>
                <h3 className="tvl-svc-card__title">{s.title}</h3>
                <p className="tvl-svc-card__text">{s.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
