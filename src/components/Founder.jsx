import useReveal from '../hooks/useReveal';

// Exact stat block order + settings from templates/index.json ("founder_KmNLiB")
const STATS = [
  { key: '70%', value: 'SAVED OVERHEAD AND LABOR COST' },
  { key: '32%', value: 'Avg. response lift' },
  { key: '4.8 ⭐ ', value: 'CLIENT SATISFACTION' },
];

export default function Founder() {
  const containerRef = useReveal();

  return (
    <section className="tvl-founder" id="about" ref={containerRef}>
      <div className="tvl-founder__inner">
        {/* LEFT: Portrait with floating info card */}
        <div className="tvl-founder__visual tvl-reveal">
          <div className="tvl-founder__image-wrap tvl-glass">
            {/* Replace src below with the real founder portrait asset */}
            <img src="/assets/maam_sheena.png" alt="Sheena Laguerta" className="tvl-founder__image" />
            <div className="tvl-founder__image-overlay"></div>
            <div className="tvl-founder__image-ring"></div>
          </div>

          <div className="tvl-founder__card tvl-glass">
            <div className="tvl-founder__card-eyebrow">Founder</div>
            <div className="tvl-founder__card-name">Sheena Laguerta</div>
            <div className="tvl-founder__card-title">Operations Strategist</div>
          </div>
        </div>

        {/* RIGHT: Heading + paragraph + stats */}
        <div className="tvl-founder__copy tvl-reveal">
          <div className="tvl-founder__eyebrow">Founder-Led</div>

          <h2 className="tvl-founder__title">
            Built for Businesses That Need{' '}
            <span className="tvl-founder__title-accent">Reliable Support</span> Without the
            Overhead.
          </h2>

          <p className="tvl-founder__body">
            The VA Library was built for the operator who refuses to lower the bar. We pair
            vetted specialists with calm, repeatable systems so your business runs at the
            standard your clients already expect from you.
          </p>

          <div className="tvl-founder__stats">
            {STATS.map((s) => (
              <div className="tvl-founder__stat tvl-glass" key={s.value}>
                <div className="tvl-founder__stat-key">{s.key}</div>
                <div className="tvl-founder__stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
