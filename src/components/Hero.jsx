const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

// Exact block order + settings from templates/index.json ("hero_jVaWmY")
const FLOATING_CARDS = [
  { position: 'top-left', title: 'Inbox Management', sub: '142 handled today' },
  { position: 'top-right', title: 'Response Rate', sub: '+32% this month' },
  { position: 'bottom-left', title: 'Workflow Optimization', sub: '14 systems live' },
  { position: 'bottom-right', title: 'Ai Workflow Assitant', sub: 'Active - learning' },
];

export default function Hero() {
  return (
    <section
      className="tvl-hero"
      id="section-hero"
      style={{
        '--tvl-ink': '#0a0908',
        '--tvl-gold': '#e5b842',
        '--tvl-gold-light': '#ffd86b',
        '--tvl-gold-bright': '#fff4c2',
        '--tvl-charcoal': '#1a1614',
      }}
    >
      <div className="tvl-hero__inner">
        {/* Left: copy column */}
        <div className="tvl-hero__copy">
          <div className="tvl-hero__eyebrow tvl-glass tvl-fade" style={{ '--d': '0s' }}>
            <span className="tvl-hero__dot"></span>
            <span className="tvl-hero__eyebrow-text">Operations · Support · AI Systems</span>
          </div>

          <h1 className="tvl-hero__title tvl-fade" style={{ '--d': '0.12s' }}>
            Every Missed Inquiry and
            <br />
            Disorganized Workflow Is
            <br />
            <span className="tvl-gold-gradient">Costing Your Business Money</span>
          </h1>

          <p className="tvl-hero__sub tvl-fade" style={{ '--d': '0.24s' }}>
            We help businesses streamline operations, improve customer experience, and reduce
            operational overload through reliable support teams and AI-assisted systems.
          </p>

          <div className="tvl-hero__ctas tvl-fade" style={{ '--d': '0.36s' }}>
            <a href="#booking" className="tvl-btn tvl-btn--primary">
              <span className="tvl-btn__text">Book a Discovery Call</span>
              <span className="tvl-btn__shimmer"></span>
            </a>
            <a href="#services" className="tvl-btn tvl-btn--ghost tvl-glass">
              View Services
            </a>
          </div>

          <p className="tvl-hero__trust tvl-fade" style={{ '--d': '0.48s' }}>
            Trusted support for healthcare, ecommerce, and service-based businesses.
          </p>
        </div>

        {/* Right: visual column */}
        <div className="tvl-hero__visual">
          <div className="tvl-hero__image-wrap tvl-glass tvl-zoom-in">
            {/* Replace src below with the real hero image asset */}
            <img src="/assets/hero.png" alt="Luxury office workspace" className="tvl-hero__image" />
            <div className="tvl-hero__image-overlay"></div>
            <div className="tvl-hero__image-ring"></div>
          </div>

          {FLOATING_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={`tvl-card tvl-glass tvl-card--${card.position} tvl-fade-up`}
              style={{ '--d': `${(0.6 + i * 0.2).toFixed(2)}s` }}
            >
              <div className="tvl-card__inner">
                <div className="tvl-card__icon">
                  <InboxIcon />
                </div>
                <div className="tvl-card__text">
                  <div className="tvl-card__title">{card.title}</div>
                  <div className="tvl-card__sub">{card.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
