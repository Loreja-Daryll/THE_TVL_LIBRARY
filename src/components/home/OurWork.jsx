import { workTiles } from '../../data/homeRebuildData';
import useReveal from '../../hooks/useReveal';

export default function OurWork({ onSelectPreview }) {
  const containerRef = useReveal();

  return (
    <section className="tvl-rb-section tvl-rb-section--stone tvl-rb-work" ref={containerRef}>
      <div className="tvl-rb-section__inner">
        <div className="tvl-rb-work__intro tvl-reveal">
          <h2 className="tvl-rb-h2">Our work</h2>
          <p className="tvl-rb-body">
            Every piece here is a concept, made to show what we can build for
            you. None of it is a paid review or a real customer testimonial.
          </p>
        </div>

        <div className="tvl-rb-work__grid">
          {workTiles.map((tile, i) => (
            <div
              className="tvl-rb-work__tile tvl-reveal"
              style={{ '--d': `${0.08 * i}s` }}
              key={tile.id}
            >
              <span className="tvl-rb-work__tag">Concept</span>
              {tile.video ? (
                <video src={tile.video} poster={tile.poster || undefined} muted loop playsInline />
              ) : tile.poster ? (
                <img src={tile.poster} alt="" aria-hidden="true" />
              ) : null}
              <span className="tvl-rb-work__caption">{tile.caption}</span>
            </div>
          ))}
        </div>

        <div className="tvl-rb-work__bar tvl-reveal">
          <p className="tvl-rb-body" style={{ margin: 0 }}>
            Want to see what this looks like for your brand?
          </p>
          <button
            type="button"
            className="tvl-rb-btn-primary"
            onClick={() => onSelectPreview?.(null)}
          >
            Get your free preview
          </button>
        </div>
      </div>
    </section>
  );
}
