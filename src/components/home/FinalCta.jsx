import { LINKS } from '../../constants/links';
import useReveal from '../../hooks/useReveal';

export default function FinalCta() {
  const containerRef = useReveal();

  return (
    <section className="tvl-rb-section tvl-rb-section--espresso tvl-rb-cta" ref={containerRef}>
      <div className="tvl-rb-section__inner tvl-rb-cta__inner tvl-reveal">
        <h2 className="tvl-rb-h2">Ready to see what we'd build for you?</h2>
        <p className="tvl-rb-body">
          Get a free ad concept, homepage preview or email design, on us.
        </p>
        <a href="#free-preview" className="tvl-rb-btn-primary">
          Get my free preview
        </a>
        <p className="tvl-rb-small tvl-rb-cta__under">
          Prefer to talk first?{' '}
          <a href={LINKS.calendlyUrl} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          .
        </p>
      </div>
    </section>
  );
}
