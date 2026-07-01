import { useState } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

function scrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const nav = document.getElementById('tvl-nav');
  const navOffset = nav ? nav.offsetHeight + 16 : 80;
  const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
  if (history.pushState) history.pushState(null, '', hash);
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    // Same 350ms delay the original theme uses to let the mobile drawer close first.
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="tvl-nav__mobile-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a href="#booking" className="tvl-nav__mobile-cta" onClick={(e) => handleLinkClick(e, '#booking')}>
            Book a Discovery Call
          </a>
        </nav>
      </div>

      {/* ============ NAVBAR PILL ============ */}
      <div className="tvl-nav" id="tvl-nav" role="banner">
        <div className="tvl-nav__container">
          <div className="tvl-nav__pill">
            <a href="/" className="tvl-nav__logo" aria-label="The VA Library — home">
              <span className="tvl-nav__logo-mark">TVL</span>
              <span className="tvl-nav__logo-text">The VA Library</span>
            </a>

            <nav className="tvl-nav__links" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="tvl-nav__link"
                  onClick={(e) => handleDesktopLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="tvl-nav__right">
              <a href="#booking" className="tvl-nav__cta" onClick={(e) => handleDesktopLinkClick(e, '#booking')}>
                <span>Book a Discovery Call</span>
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
