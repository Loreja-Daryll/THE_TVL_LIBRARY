import { useState, useSyncExternalStore } from 'react';
import { LINKS } from '../constants/links';
import { nav as navContent } from '../data/homeContent';
import { scrollToTarget } from '../lib/smoothScroll';
import { HOME_SECTIONS, getActiveIndex, subscribeActive } from '../lib/activeSection';

function scrollToSection(hash) {
  if (!hash) return;
  if (!document.querySelector(hash)) {
    window.location.href = `/${hash}`;
    return;
  }
  scrollToTarget(hash);
  if (history.pushState) history.pushState(null, '', hash);
}

export default function Nav() {
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
      <div className={`tvl-nav__mobile ${open ? 'is-open' : ''}`} id="tvl-nav-mobile">
        <button
          type="button"
          className="tvl-nav__close"
          aria-label="Close menu"
          onClick={(e) => handleLinkClick(e, null)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="tvl-nav__mobile-links" aria-label="Mobile navigation">
          {navContent.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="tvl-nav__mobile-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={LINKS.calendlyUrl}
            className="tvl-nav__mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </nav>
      </div>

      {/* ============ NAVBAR ============ */}
      <div className="tvl-nav" id="tvl-nav" role="banner">
        <div className="tvl-nav__container">
          <div className="tvl-nav__bar">
            <a href="/" className="tvl-nav__logo" aria-label="TVL — Ecommerce Creative Studio, home">
              <span className="tvl-nav__logo-mark">TVL</span>
              <span className="tvl-nav__logo-divider" aria-hidden="true" />
              <span className="tvl-nav__logo-text">
                Ecommerce
                <br />
                Creative Studio
              </span>
            </a>

            <nav className="tvl-nav__links" aria-label="Main navigation">
              {navContent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`tvl-nav__link${activeHash === link.href ? ' is-active' : ''}`}
                  aria-current={activeHash === link.href ? 'true' : undefined}
                  onClick={(e) => handleDesktopLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="tvl-nav__right">
              <a
                href={LINKS.calendlyUrl}
                className="tvl-nav__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Book a Call</span>
              </a>

              <button
                className="tvl-nav__toggle"
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="tvl-nav-mobile"
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
