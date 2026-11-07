import { Link } from 'react-router-dom';
import { LINKS } from '../../constants/links';
import { footer as footerContent } from '../../data/homeContent';
import { scrollToTarget } from '../../lib/smoothScroll';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
  </svg>
);

const SOCIAL_LINKS = [
  { href: LINKS.socialLinkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: LINKS.socialInstagram, label: 'Instagram', Icon: InstagramIcon },
  { href: LINKS.socialYoutube, label: 'YouTube', Icon: YoutubeIcon },
  { href: LINKS.socialFacebook, label: 'Facebook', Icon: FacebookIcon },
].filter((item) => item.href);

function handleAnchorClick(e, href) {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  if (!document.querySelector(href)) {
    window.location.href = `/studio${href}`;
    return;
  }
  scrollToTarget(href);
}

export default function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="tvl-sfooter" id="contact">
      <div className="tvl-sfooter__inner">
        <div className="tvl-sfooter__grid">
          <div className="tvl-sfooter__brand">
            <span className="tvl-sfooter__logo">TVL</span>
            <span className="tvl-sfooter__tagline">
              Ecommerce
              <br />
              Creative Studio
            </span>
            <p className="tvl-sfooter__blurb">{footerContent.blurb}</p>
          </div>

          <div className="tvl-sfooter__col">
            <h3 className="tvl-sfooter__heading">Quick Links</h3>
            {footerContent.quickLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="tvl-sfooter__col">
            <h3 className="tvl-sfooter__heading">Services</h3>
            {footerContent.serviceLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="tvl-sfooter__col">
            <h3 className="tvl-sfooter__heading">Contact</h3>
            <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a>
            <a href={LINKS.calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book a Strategy Call
            </a>
          </div>

          <div className="tvl-sfooter__col">
            <h3 className="tvl-sfooter__heading">Follow Us</h3>
            <div className="tvl-sfooter__social" aria-label="Social media">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a key={label} href={href} className="tvl-sfooter__social-link" target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="tvl-sfooter__bottom">
          <span>© {year} TVL. All rights reserved.</span>
          <div className="tvl-sfooter__bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/become-a-va">Become a VA</Link>
            <Link to="/">Main site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
