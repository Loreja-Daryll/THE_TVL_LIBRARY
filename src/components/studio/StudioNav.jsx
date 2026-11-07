import { useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../constants/links';
import { nav as navContent } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';
import { HOME_SECTIONS, getActiveIndex, subscribeActive } from '../../lib/activeSection';

function scrollToSection(hash) {
  if (!hash) return;
  if (!document.querySelector(hash)) {
    window.location.href = `/studio${hash}`;
    return;
  }
  scrollToTarget(hash);
  if (history.pushState) history.pushState(null, '', hash);
}

export default function StudioNav() {
  const [open, setOpen] = useState(false);
  const activeIndex = useSyncExternalStore(subscribeActive, getActiveIndex, () => 0);
  const activeHash = HOME_SECTIONS[activeIndex]?.hash || '';

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToSection(hash), 350);
  };

  const handleDesktopLinkClick = (e, hash) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  return (
    <>
      {/* ============ MOBILE MENU ============ */}
      <div className={`tvl-snav__mobile ${open ? 'is-open' : ''}`} id="tvl-snav-mobile">
        <button
          type="button"
          className="tvl-snav__close"
          aria-label="Close menu"
          onClick={(e) => handleLinkClick(e, null)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="tvl-snav__mobile-links" aria-label="Mobile navigation">
          <Link to="/" className="tvl-snav__mobile-link tvl-snav__mobile-link--back" onClick={() => setOpen(false)}>
            ← Back to main page
          </Link>
          {navContent.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="tvl-snav__mobile-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={LINKS.calendlyUrl}
            className="tvl-snav__mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </nav>
      </div>

      {/* ============ NAVBAR ============ */}
      <div className="tvl-snav" id="tvl-snav" role="banner">
        <div className="tvl-snav__container">
          <div className="tvl-snav__bar">
            <a href="/studio" className="tvl-snav__logo" aria-label="TVL Creative Studio, home">
              <span className="tvl-snav__logo-mark">TVL</span>
              <span className="tvl-snav__logo-divider" aria-hidden="true" />
              <span className="tvl-snav__logo-text">
                Creative Studio
              </span>
            </a>

            <nav className="tvl-snav__links" aria-label="Main navigation">
              {navContent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`tvl-snav__link${activeHash === link.href ? ' is-active' : ''}`}
                  aria-current={activeHash === link.href ? 'true' : undefined}
                  onClick={(e) => handleDesktopLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="tvl-snav__right">
              <Link to="/" className="tvl-snav__back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to main page</span>
              </Link>
              <a
                href={LINKS.calendlyUrl}
                className="tvl-snav__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Book a Call</span>
              </a>

              <button
                className="tvl-snav__toggle"
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="tvl-snav-mobile"
                onClick={() => setOpen((prev) => !prev)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
