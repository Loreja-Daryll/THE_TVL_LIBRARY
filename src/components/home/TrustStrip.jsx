import { trustFacts } from '../../data/homeRebuildData';

// A4: continuous marquee, pauses on hover. Duplicated once so the loop
// (translateX 0 -> -50%) is seamless.
export default function TrustStrip() {
  const items = [...trustFacts, ...trustFacts];

  return (
    <div className="tvl-rb-trust">
      <div className="tvl-rb-trust__viewport">
        <div className="tvl-rb-trust__row">
          {items.map((fact, i) => (
            <span className="tvl-rb-trust__item" key={`${fact}-${i}`}>
              {fact}
              <span className="tvl-rb-trust__diamond" aria-hidden="true">
                &#9670;
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
