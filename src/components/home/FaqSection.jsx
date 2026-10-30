import { faqItems } from '../../data/homeRebuildData';
import useReveal from '../../hooks/useReveal';

export default function FaqSection() {
  const containerRef = useReveal();

  return (
    <section className="tvl-rb-section tvl-rb-section--ivory tvl-rb-faq" ref={containerRef}>
      <div className="tvl-rb-section__inner">
        <div className="tvl-reveal" style={{ textAlign: 'center' }}>
          <h2 className="tvl-rb-h2">Questions, answered</h2>
        </div>

        <div className="tvl-rb-faq__list tvl-reveal" style={{ '--d': '0.08s' }}>
          {faqItems.map((item) => (
            <details className="tvl-rb-faq__item" key={item.question}>
              <summary>
                {item.question}
                <span className="tvl-rb-faq__plus" aria-hidden="true" />
              </summary>
              <p className="tvl-rb-faq__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
