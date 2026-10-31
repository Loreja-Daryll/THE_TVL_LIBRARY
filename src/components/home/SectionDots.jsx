import { useSyncExternalStore } from 'react';
import { HOME_SECTIONS, getActiveIndex, subscribeActive } from '../../lib/activeSection';
import { scrollToTarget } from '../../lib/smoothScroll';

/** Fixed progress dots on the right edge (desktop). Click = teleport to that section. */
export default function SectionDots() {
  const active = useSyncExternalStore(subscribeActive, getActiveIndex, () => 0);

  return (
    <nav className="tvl-home-dots" aria-label="Page sections">
      {HOME_SECTIONS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className={`tvl-home-dot${i === active ? ' is-active' : ''}`}
          aria-label={s.label}
          aria-current={i === active ? 'true' : undefined}
          onClick={() => scrollToTarget(`#${s.id}`)}
        >
          <span className="tvl-home-dot-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
