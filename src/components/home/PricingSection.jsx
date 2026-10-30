import { pricingColumns } from '../../data/homeRebuildData';
import useReveal from '../../hooks/useReveal';

export default function PricingSection() {
  const containerRef = useReveal();

  return (
    <section className="tvl-rb-section tvl-rb-section--stone tvl-rb-pricing" ref={containerRef}>
      <div className="tvl-rb-section__inner">
        <div className="tvl-reveal" style={{ textAlign: 'center' }}>
          <h2 className="tvl-rb-h2">Simple pricing, no surprises</h2>
          <p className="tvl-rb-body" style={{ margin: '0 auto' }}>
            Start with a free preview, then choose what fits your brand.
          </p>
        </div>

        <div className="tvl-rb-pricing__grid">
          {pricingColumns.map((col, i) => (
            <div
              key={col.id}
              className={`tvl-rb-pricing__card tvl-reveal${col.highlight ? ' tvl-rb-pricing__card--highlight' : ''}`}
              style={{ '--d': `${0.08 * i}s` }}
            >
              {col.label && <span className="tvl-rb-pricing__label">{col.label}</span>}
              <h3 className="tvl-rb-h3">{col.name}</h3>
              <p className="tvl-rb-pricing__price">{col.price}</p>
              <a href="#free-preview" className="tvl-rb-btn-primary">
                {col.id === 'free' ? 'Get your free preview' : 'Get started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
