import { Link } from 'react-router-dom';
import { LINKS } from '../constants/links';

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tvl-footer" id="contact">
      <div className="tvl-footer__inner">
        {(LINKS.socialFacebook || LINKS.socialLinkedin) && (
          <div className="tvl-footer__social" aria-label="Social media">
            {LINKS.socialFacebook && (
              <a href={LINKS.socialFacebook} className="tvl-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
            )}
            {LINKS.socialLinkedin && (
              <a href={LINKS.socialLinkedin} className="tvl-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            )}
          </div>
        )}

        <div className="tvl-footer__bottom">
          <div className="tvl-footer__left">
            <span className="tvl-footer__logo">TVL</span>
            <span>© {year} The VA Library. All rights reserved.</span>
          </div>
          <div className="tvl-footer__right">
            <Link to="/become-a-va">Become a VA</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
