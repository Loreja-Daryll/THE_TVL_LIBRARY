import useReveal from '../hooks/useReveal';

const StarIcon = () => (
  <svg className="tvl-rev-card__star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function initialsOf(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

// Exact block order + settings from templates/index.json ("reviews_FUpFHR")
const REVIEWS = [
  {
    industry: 'Dental Practice',
    quote:
      "She runs my calendar, drafts my patient communications, and keeps our reporting tight. Our books are reconciled monthly without me asking, and I finally trust the numbers I'm looking at. After three years of chaos, I have my evenings back.",
    name: 'Dr. Renée Beaumont',
    role: 'COO, Beaumont Dental Group',
  },
  {
    industry: 'E-Commerce',
    quote:
      "Customer messages used to sit for two days. Now they're handled within hours, in our exact brand voice. She caught a pricing error on our Shopify store that would have cost us thousands. Genuinely feels like having a senior team member, not a VA.",
    name: 'Anika Trujillo',
    role: 'Founder, Coastal Threads Co.',
  },
  {
    industry: 'Energy Brokerage',
    quote:
      "She produces our social content, edits our reels, and designs our client-facing graphics on a weekly cadence. Our LinkedIn engagement has tripled and our brand finally looks like the size of the deals we're closing. Worth every cent.",
    name: 'Marcus Whitfield',
    role: 'Managing Partner, Whitfield Energy Solutions',
  },
  {
    industry: 'Legal / Copyright',
    quote:
      'We brought her on to audit copyright claims and the level of detail is remarkable. Every flagged claim is cross-referenced, every report is clean, and our turnaround time has been cut in half. She thinks like an auditor, not a typist.',
    name: 'Helena Marsh',
    role: 'Director of Operations, Marshfield Rights Group',
  },
  {
    industry: 'Creative Agency',
    quote:
      'Reel edits, social graphics, content calendars she produces what would normally take us a full-time hire to deliver. Our feed has never looked more on-brand. Quick turnarounds, no hand-holding, zero drama.',
    name: 'Theo Park',
    role: 'Creative Director, Northpoint Studio',
  },
  {
    industry: 'Real Estate',
    quote:
      "She coordinates every transaction from offer to close  paperwork, vendor follow-ups, client check-ins. I've closed 30% more deals this year because I'm not bottlenecked on admin. She runs my pipeline tighter than I ever did.",
    name: 'Jordan Ashe',
    role: 'Broker, Ashe Realty Group',
  },
  {
    industry: 'Coaching & Consulting',
    quote:
      'My inbox went from 400 unread to inbox-zero in a week. She built me AI-powered email templates that handle 80% of the repetitive replies. I get to spend my days coaching, not drowning in admin.',
    name: 'Lila Brennan',
    role: 'Executive Coach, Brennan Leadership',
  },
  {
    industry: 'Wellness Studio',
    quote:
      'Our onboarding flow used to be a mess of forms and missed appointments. She rebuilt the whole intake system and now new clients show up prepared and excited. Show-up rates went from 70% to 96%.',
    name: 'Maya Rodriguez',
    role: 'Founder, Lumen Pilates Studio',
  },
  {
    industry: 'SaaS Startup',
    quote:
      "She rebuilt our marketing site and set up content ops that actually scale. Blog cadence is consistent for the first time in two years, and our conversion rate on the homepage is up 40%. Easily the best ops hire we've made.",
    name: 'Sam Kettering',
    role: 'Co-founder, Switchgrass Analytics',
  },
];

export default function Reviews() {
  const containerRef = useReveal();

  return (
    <section className="tvl-reviews" id="reviews" ref={containerRef}>
      <div className="tvl-reviews__inner">
        <div className="tvl-reviews__intro tvl-reveal">
          <div className="tvl-reviews__eyebrow">Client Stories</div>
          <h2 className="tvl-reviews__title">
            Trusted Across <span className="tvl-reviews__title-accent">Every Industry.</span>
          </h2>
          <p className="tvl-reviews__subheading">
            From dental practices to ecommerce, energy brokers to creative agencies we adapt to
            your industry&apos;s rhythm without missing a beat.
          </p>
        </div>

        <div className="tvl-reviews__grid">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="tvl-rev-card tvl-reveal"
              style={{ '--d': `${(i * 0.08).toFixed(2)}s` }}
            >
              <div className="tvl-rev-card__industry">{r.industry}</div>

              <div className="tvl-rev-card__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              <p className="tvl-rev-card__quote">&quot;{r.quote}&quot;</p>

              <div className="tvl-rev-card__footer">
                <div className="tvl-rev-card__avatar" aria-hidden="true">
                  <span className="tvl-rev-card__initials">{initialsOf(r.name)}</span>
                </div>
                <div className="tvl-rev-card__person">
                  <div className="tvl-rev-card__name">{r.name}</div>
                  <div className="tvl-rev-card__role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
