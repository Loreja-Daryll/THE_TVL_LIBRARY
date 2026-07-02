import { Link } from 'react-router-dom';

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export default function LegalPageLayout({ eyebrow, title, updated, children }) {
  return (
    <div className="tvl-legal">
      <div className="tvl-legal__inner">
        <Link to="/" className="tvl-legal__back">
          <ArrowLeft /> Back to home
        </Link>

        {eyebrow && <div className="tvl-legal__eyebrow">{eyebrow}</div>}
        <h1 className="tvl-legal__title">{title}</h1>
        {updated && <div className="tvl-legal__updated">{updated}</div>}

        <div className="tvl-legal__content">{children}</div>
      </div>
    </div>
  );
}