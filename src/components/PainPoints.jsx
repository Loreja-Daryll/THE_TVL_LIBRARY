import useReveal from '../hooks/useReveal';

const ICONS = {
  'mail-warning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9.5" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M20 14v4" />
      <path d="M20 22v.01" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  'git-branch': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

// Exact block order + settings from templates/index.json ("pain_points_V8gHKY")
const PAIN_CARDS = [
  { icon: 'mail-warning', title: 'Missed inquiries', text: 'Leads slipping through unanswered inboxes and unread DMs.' },
  { icon: 'clock', title: 'Delayed responses', text: 'Slow reply times eroding trust and conversion rates.' },
  { icon: 'layers', title: 'Admin overload', text: 'Founders trapped in low-leverage operational work.' },
  { icon: 'globe', title: 'Outdated websites', text: 'Slow, off-brand sites that quietly cost you customers.' },
  { icon: 'git-branch', title: 'Disorganized workflows', text: 'Tools, tasks, and handoffs scattered across the team.' },
  { icon: 'users', title: 'Inconsistent CX', text: 'Tone, timing, and quality that change person to person.' },
];

export default function PainPoints() {
  const containerRef = useReveal();

  return (
    <section className="tvl-pain" id="process" ref={containerRef}>
      <div className="tvl-pain__bg" aria-hidden="true"></div>

      <div className="tvl-pain__inner">
        <div className="tvl-pain__intro tvl-reveal">
          <div className="tvl-pain__eyebrow">The Cost of Disorder</div>
          <h2 className="tvl-pain__title">
            Your Business Shouldn&apos;t Feel{' '}
            <span className="tvl-pain__title-italic tvl-gold-gradient">Operationally Overwhelming.</span>
          </h2>
        </div>

        <div className="tvl-pain__grid">
          {PAIN_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="tvl-pain__card tvl-glass tvl-reveal"
              style={{ '--d': `${(i * 0.06).toFixed(2)}s` }}
            >
              <div className="tvl-pain__card-icon">{ICONS[card.icon]}</div>
              <h3 className="tvl-pain__card-title">{card.title}</h3>
              <p className="tvl-pain__card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
