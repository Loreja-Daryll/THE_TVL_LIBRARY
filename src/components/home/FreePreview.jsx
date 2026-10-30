import { useEffect, useState } from 'react';
import { previewOptions, previewLabels, previewTimeline } from '../../data/homeRebuildData';
import { LINKS } from '../../constants/links';
import useReveal from '../../hooks/useReveal';

/* ---------------------------------------------------------
   GOOGLE SHEETS LEAD CAPTURE - Free Preview form
   Same no-backend pattern as BecomeAVa.jsx (not imported from there,
   since that file is left untouched on purpose). Tagged formType:
   'free-preview', routed by Code.gs to its own "preview lead" sheet
   tab, with previewType and storeUrl as their own columns.
--------------------------------------------------------- */
const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycby0DEpAG_TvhNsGcIzeEJ0_yt-DOAHhDMQBcLZ2zi44UGZF7ZzgUGVykeOeIUPdhbtU/exec';

function submitPreviewLead({ name, email, storeUrl, previewType }) {
  return fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      previewType: previewLabels[previewType] || previewType,
      storeUrl: storeUrl || '',
      formType: 'free-preview',
    }),
  }).catch(() => {});
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FreePreview({ initialPreviewType, onConsumedInitial }) {
  const containerRef = useReveal();
  const [step, setStep] = useState(initialPreviewType ? 2 : 1);
  const [previewType, setPreviewType] = useState(initialPreviewType || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [errors, setErrors] = useState({});

  // The carousel/work-grid buttons can fire this after the form has already
  // mounted (and even after a user finished one submission), so pick it up
  // whenever it changes, not just on first render.
  useEffect(() => {
    if (!initialPreviewType) return;
    setPreviewType(initialPreviewType);
    setStep(2);
    setErrors({});
  }, [initialPreviewType]);

  const chooseType = (type) => {
    setPreviewType(type);
    setStep(2);
    onConsumedInitial?.();
  };

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Please tell us your name.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    submitPreviewLead({ name: name.trim(), email: email.trim(), storeUrl: storeUrl.trim(), previewType });
    setStep(3);
  };

  const progressPct = step === 1 ? 33 : step === 2 ? 66 : 100;
  const chosenLabel = previewLabels[previewType] || previewLabels.choose;

  return (
    <section
      id="free-preview"
      className="tvl-rb-section tvl-rb-section--espresso tvl-rb-preview"
      ref={containerRef}
    >
      <div className="tvl-rb-section__inner tvl-rb-preview__wrap">
        <div className="tvl-reveal">
          <h2 className="tvl-rb-h2">Get a free preview for your brand</h2>
          <p className="tvl-rb-body">
            No strings attached. Pick one, and we will build it for you.
          </p>
          <ol className="tvl-rb-preview__timeline">
            {previewTimeline.map((line, i) => (
              <li key={line}>
                <span className="tvl-rb-preview__timeline-num">{i + 1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="tvl-rb-preview__card tvl-reveal" style={{ '--d': '0.1s' }}>
          <div className="tvl-rb-preview__progress-track">
            <div className="tvl-rb-preview__progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {step === 1 && (
            <div className="tvl-rb-preview__step" key="step1">
              <h3 className="tvl-rb-h3">What would help your brand most?</h3>
              <div className="tvl-rb-preview__options">
                {previewOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.type}
                    className="tvl-rb-preview__option"
                    onClick={() => chooseType(opt.type)}
                  >
                    {opt.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="tvl-rb-preview__option"
                  onClick={() => chooseType('choose')}
                >
                  Not sure, let us choose
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className="tvl-rb-preview__step" key="step2" onSubmit={handleSubmit}>
              <span className="tvl-rb-preview__chip">{chosenLabel}</span>
              <h3 className="tvl-rb-h3">Where should we send it?</h3>

              <div className={`tvl-rb-preview__field${errors.name ? ' has-error' : ''}`}>
                <label htmlFor="rb-preview-name">Your name</label>
                <input
                  id="rb-preview-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  autoComplete="name"
                />
                {errors.name && <p className="tvl-rb-preview__error">{errors.name}</p>}
              </div>

              <div className={`tvl-rb-preview__field${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="rb-preview-email">Email</label>
                <input
                  id="rb-preview-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@brand.com"
                  autoComplete="email"
                />
                {errors.email && <p className="tvl-rb-preview__error">{errors.email}</p>}
              </div>

              <div className="tvl-rb-preview__field">
                <label htmlFor="rb-preview-store">Store or website link (optional)</label>
                <input
                  id="rb-preview-store"
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="yourstore.com"
                />
              </div>

              <button type="submit" className="tvl-rb-btn-primary">
                Send me my free preview
              </button>
              <button type="button" className="tvl-rb-preview__back" onClick={() => setStep(1)}>
                &larr; Back
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="tvl-rb-preview__step tvl-rb-preview__step3" key="step3">
              <span className="tvl-rb-preview__check" aria-hidden="true">
                &#10003;
              </span>
              <h3 className="tvl-rb-h3">You're on the list.</h3>
              <p className="tvl-rb-body" style={{ margin: '0 auto' }}>
                We will send {chosenLabel} to {email} within [48 hours].
              </p>
              <p className="tvl-rb-preview__under">
                Want to talk it through sooner? Book a quick call, no pressure.
              </p>
              <a
                href={LINKS.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tvl-rb-btn-secondary"
              >
                Book a call
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
