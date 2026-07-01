import useReveal from '../hooks/useReveal';
import { LINKS } from '../constants/links';

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Same list as section.settings.time_slots in templates/index.json
const TIME_SLOTS = ['5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

// Same list as section.settings.benefits ("Operational audit | Bottleneck mapping | Custom support plan")
const BENEFITS = ['Operational audit', 'Bottleneck mapping', 'Custom support plan'];

function buildCalendarCells(year, month) {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDow }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function Booking() {
  const containerRef = useReveal();
  const today = new Date();
  const todayDay = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const cells = buildCalendarCells(year, month);
  const calendlyLink = LINKS.calendlyUrl || '#';

  return (
    <section className="tvl-booking" id="booking" ref={containerRef}>
      <div className="tvl-booking__glow" aria-hidden="true"></div>

      <div className="tvl-booking__inner">
        <div className="tvl-booking__intro tvl-reveal">
          <div className="tvl-booking__eyebrow">Discovery Call</div>
          <h2 className="tvl-booking__title">
            Stop Letting Operational Chaos{' '}
            <span className="tvl-booking__title-accent">Slow Down Your Business.</span>
          </h2>
          <p className="tvl-booking__subheading">
            A 30-minute conversation to map where time, money, and momentum are leaking and what
            to do about it.
          </p>
        </div>

        <div className="tvl-booking__panel tvl-glass tvl-reveal" style={{ '--d': '0.15s' }}>
          <div className="tvl-booking__panel-inner">
            {/* LEFT: Call details */}
            <div className="tvl-booking__details">
              <div className="tvl-booking__brand">The VA Library</div>
              <h3 className="tvl-booking__call-title">Discovery Call</h3>

              <ul className="tvl-booking__meta">
                <li>
                  <span className="tvl-booking__meta-icon"><ClockIcon /></span>
                  30 minutes
                </li>
                <li>
                  <span className="tvl-booking__meta-icon"><VideoIcon /></span>
                  Google Meet
                </li>
                <li>
                  <span className="tvl-booking__meta-icon"><CalendarIcon /></span>
                  Mon — Sat
                </li>
              </ul>

              <div className="tvl-booking__benefits">
                {BENEFITS.map((b) => (
                  <div className="tvl-booking__benefit" key={b}>
                    <span className="tvl-booking__benefit-icon"><CheckIcon /></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Calendar + time slots + CTA — everything links to Calendly */}
            <div className="tvl-booking__schedule">
              <div className="tvl-booking__calendar tvl-glass">
                <div className="tvl-booking__cal-head">
                  <div className="tvl-booking__cal-month">{monthLabel}</div>
                  <div className="tvl-booking__cal-nav">
                    <button type="button" className="tvl-booking__cal-arrow tvl-glass" aria-label="Previous month">
                      ‹
                    </button>
                    <button type="button" className="tvl-booking__cal-arrow tvl-glass" aria-label="Next month">
                      ›
                    </button>
                  </div>
                </div>

                <div className="tvl-booking__cal-weekdays">
                  {WEEKDAYS.map((w, i) => (
                    <div key={i}>{w}</div>
                  ))}
                </div>

                <div className="tvl-booking__cal-grid">
                  {cells.map((day, i) => {
                    if (!day) {
                      return <span key={i} className="tvl-booking__cal-day tvl-booking__cal-day--empty"></span>;
                    }
                    const dow = new Date(year, month, day).getDay();
                    const isSunday = dow === 0;
                    const isPast = day < todayDay;
                    const isToday = day === todayDay;

                    if (isToday) {
                      return (
                        <a
                          key={i}
                          href={calendlyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tvl-booking__cal-day tvl-booking__cal-day--active"
                        >
                          {day}
                        </a>
                      );
                    }
                    if (isSunday || isPast) {
                      return (
                        <span key={i} className="tvl-booking__cal-day tvl-booking__cal-day--dim">
                          {day}
                        </span>
                      );
                    }
                    return (
                      <a
                        key={i}
                        href={calendlyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tvl-booking__cal-day tvl-booking__cal-day--available"
                      >
                        {day}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="tvl-booking__slots">
                {TIME_SLOTS.map((slot, i) => (
                  <a
                    key={slot}
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`tvl-booking__slot tvl-glass ${i === 0 ? 'tvl-booking__slot--selected' : ''}`}
                  >
                    {slot}
                  </a>
                ))}
              </div>

              <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="tvl-booking__confirm">
                <span className="tvl-booking__confirm-text">Confirm Discovery Call</span>
                <span className="tvl-booking__confirm-shimmer"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
