import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../constants/links';
import '../styles/become-a-va.css';

const TODO_LINKS = {
  bookkeepingBasics: 'https://www.coursera.org/learn/bookkeeping-basics',
  accountingCoach: 'https://www.accountingcoach.com/',
  hubspotSocial: 'https://academy.hubspot.com/courses/social-media',
  hubspotContent: 'https://academy.hubspot.com/courses/content-marketing',
  hubspotEmail: 'https://academy.hubspot.com/courses/email-marketing-certification-en',
  courseraCopywriting: 'https://www.coursera.org/courses?query=copywriting&productDifficultyLevel=Beginner',
  googleProjectMgmt: 'https://www.coursera.org/learn/google-project-management',
  googleWorkspaceTraining: 'https://support.google.com/a/users/answer/9282664',
  canvaDesignSchool: 'https://www.canva.com/design-school/',
  courseraCanvaDesign: 'https://www.coursera.org/learn/canva',
  resumeTemplateDoc: 'https://docs.google.com/document/d/1b8W1g3eDx7Ni9ih-pYA-S3yNTIVePKocO7F5pS4_jGk/edit?tab=t.0#heading=h.pik5evqpctfe',
  personalFacebook: 'https://web.facebook.com/sheena.vabigsis/',
  personalInstagram: 'https://www.instagram.com/sheena_vabigsis',
  personalTiktok: 'https://www.tiktok.com/@sheena_vabigsis',
  agencyInstagram: 'https://www.instagram.com/thevalibrary',
};

/* ---------------------------------------------------------
   GOOGLE SHEETS LEAD CAPTURE
   Quiz results + guide requests go to Sheet1.
   Coaching waitlist signups go to Sheet2 (formType: 'coaching').
   Sheet1 columns: Timestamp | Name | Email | Quiz Result | Lead Status | Notes
   Sheet2 columns: Timestamp | Name | Email | Status | Notes
--------------------------------------------------------- */

const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycby0DEpAG_TvhNsGcIzeEJ0_yt-DOAHhDMQBcLZ2zi44UGZF7ZzgUGVykeOeIUPdhbtU/exec';

function submitLeadToSheet({ name, email, quizResult, formType }) {
  return fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, quizResult: quizResult || '', formType: formType || '' }),
  }).catch(() => {});
}

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const roadmapSteps = [
  { title: 'Pick one skill', body: "Choose a single niche to start with (see below). Don't try to learn everything at once." },
  { title: 'Learn it for free', body: 'Use the curated courses below. Most VA skills take just 2 to 4 weeks to learn well enough to start.' },
  { title: 'Practice on a real project', body: "Do it for a friend's business or a sample project. Get real reps in." },
  { title: 'Build your proof', body: 'Turn that work into a simple portfolio (I show you how below).' },
  { title: 'Apply consistently', body: 'Set up your resume, pick a platform, and apply daily. Visibility beats perfection.' },
];

const resumeSteps = [
  { title: 'Header', body: 'Full name · "Virtual Assistant" (or your niche, like "Bookkeeping VA") · email · location · portfolio link.' },
  { title: 'Professional Summary', body: '2 to 3 sentences: who you help + your top skills. Example: "Detail-oriented VA helping busy founders with inbox, calendar, and admin so they can focus on growth."' },
  { title: 'Skills', body: 'List your tools + services: email management, calendar, Canva, Google Workspace, ChatGPT, data entry, and more.' },
  { title: 'Experience / Projects', body: 'Any work counts, even practice projects. Use action + result: "Organized a client\'s inbox of 2,000+ emails into a clear system."' },
  { title: 'Education & Certificates', body: 'Your schooling + any free certificates you earned above (Google, HubSpot, Coursera).' },
];

const portfolioSteps = [
  { title: 'Pick your niche', body: 'What service are you showing off? (e.g. social media, admin, design)' },
  { title: 'Create 3 to 5 sample pieces', body: 'Mock social posts, a sample inbox system, a Canva design, a research doc.' },
  { title: 'Put it in a simple page', body: 'Use a free Canva portfolio template or a Google Drive folder. Add a link to your resume.' },
];

const overviewSteps = [
  { title: 'Find your niche', desc: 'Take the quiz to discover your best fit', anchor: '#niche-quiz' },
  { title: 'Learn it free', desc: 'Use the curated courses below', anchor: '#niche-courses' },
  { title: 'Build proof', desc: 'Make your resume & portfolio', anchor: '#resume' },
  { title: 'Get set up', desc: 'Prepare your equipment & tools', anchor: '#equipment' },
  { title: 'Apply', desc: 'Find clients on the right platforms', anchor: '#apply' },
  { title: 'Stand out with AI', desc: 'Learn to get hired (my coaching)', anchor: '#coaching' },
];

const courseCategories = [
  {
    label: 'Bookkeeping & Accounting',
    courses: [
      { title: 'Bookkeeping Basics', provider: 'Intuit · Coursera', desc: 'Core concepts, the accounting cycle, and practical skills for beginners.', tag: 'Free to Audit', url: TODO_LINKS.bookkeepingBasics },
      { title: 'Bookkeeping Course', provider: 'AccountingCoach', desc: 'A deep, free library on bookkeeping fundamentals and best practices.', tag: 'Free', url: TODO_LINKS.accountingCoach },
    ],
  },
  {
    label: 'Social Media Marketing',
    courses: [
      { title: 'Social Media Marketing', provider: 'HubSpot Academy', desc: 'Strategy, community building, and measuring results. Free certification.', tag: 'Free + Certificate', url: TODO_LINKS.hubspotSocial },
      { title: 'Content Marketing', provider: 'HubSpot Academy', desc: 'Plan and create content that grows an audience. Free certification.', tag: 'Free + Certificate', url: TODO_LINKS.hubspotContent },
    ],
  },
  {
    label: 'Copywriting & Content',
    courses: [
      { title: 'Email Marketing', provider: 'HubSpot Academy', desc: 'Write emails that get opened and drive action. Free certification.', tag: 'Free + Certificate', url: TODO_LINKS.hubspotEmail },
      { title: 'Beginner Copywriting', provider: 'Coursera', desc: 'Persuasive writing, audience analysis, and compelling headlines.', tag: 'Free to Audit', url: TODO_LINKS.courseraCopywriting },
    ],
  },
  {
    label: 'Admin / Executive Assistant',
    courses: [
      { title: 'Google Project Management', provider: 'Google · Coursera', desc: "Organization, planning, and coordination, every great EA's foundation.", tag: 'Free to Audit', url: TODO_LINKS.googleProjectMgmt },
      { title: 'Google Workspace Training', provider: 'Google', desc: 'Master Gmail, Calendar, Docs, Sheets, and Drive.', tag: 'Free', url: TODO_LINKS.googleWorkspaceTraining },
    ],
  },
  {
    label: 'Graphic Design',
    courses: [
      { title: 'Canva Design School', provider: 'Canva', desc: 'Free, beginner-friendly tutorials for graphics, social, and presentations.', tag: 'Free', url: TODO_LINKS.canvaDesignSchool },
      { title: 'Graphic Design with Canva', provider: 'Coursera', desc: 'Color, layout, and design principles using the tool clients ask for most.', tag: 'Free to Audit', url: TODO_LINKS.courseraCanvaDesign },
    ],
  },
];

const equipmentItems = [
  { title: 'A reliable laptop or desktop', desc: "Any computer that runs smoothly. It doesn't have to be new or high-end to start.", tag: 'Must Have' },
  { title: 'Stable internet connection', desc: 'The most important thing. A backup (pocket WiFi or mobile data) keeps you online during outages.', tag: 'Must Have' },
  { title: 'Headset with microphone', desc: 'For clear calls with clients. Even an affordable one works great.', tag: 'Must Have' },
  { title: 'A quiet workspace', desc: 'A calm corner where you can focus and take calls without noise.', tag: 'Must Have' },
  { title: 'Professional email', desc: 'A clean Gmail with your real name. Free and makes you look credible.', tag: 'Must Have' },
  { title: 'Webcam', desc: 'Most laptops have one built in. Useful for client meetings and building trust.', tag: 'Nice to Have' },
  { title: 'Backup power', desc: "A UPS or power bank so brownouts don't interrupt your work.", tag: 'Nice to Have' },
  { title: 'Second monitor', desc: 'Speeds you up once you\'re working, but never required to start.', tag: 'Nice to Have' },
];

const applyGroups = [
  {
    label: 'Global Marketplaces (Paid in USD)',
    links: [
      { title: 'Upwork', desc: 'upwork.com · biggest global marketplace', url: 'https://www.upwork.com' },
      { title: 'OnlineJobs.ph', desc: 'onlinejobs.ph · top choice for Filipino VAs', url: 'https://www.onlinejobs.ph' },
      { title: 'Fiverr', desc: 'fiverr.com · package your skills as gigs', url: 'https://www.fiverr.com' },
      { title: 'Freelancer.com', desc: 'freelancer.com · bidding-based projects', url: 'https://www.freelancer.com' },
    ],
  },
  {
    label: 'PH-Focused & Direct Hire',
    links: [
      { title: 'VirtualStaff.ph', desc: 'structured, with payroll support', url: 'https://virtualstaff.ph' },
      { title: 'RemoteWork.ph', desc: 'direct hiring, no markups', url: 'https://remotework.ph' },
      { title: 'LinkedIn', desc: 'network & apply directly', url: 'https://www.linkedin.com' },
      { title: 'Facebook Groups', desc: 'search "Virtual Assistant Philippines"', url: 'https://www.facebook.com/search/groups/?q=Virtual%20Assistant%20Philippines' },
    ],
  },
];

const paymentMethods = [
  { title: 'Wise', desc: 'Low fees, great exchange rates. The Filipino VA favorite.' },
  { title: 'PayPal', desc: 'Most requested by clients. Easy invoicing.' },
  { title: 'Payoneer', desc: 'Great for Upwork/Fiverr payouts + PH bank withdrawals.' },
  { title: 'GCash / Maya', desc: 'For cashing out your earnings to pesos.' },
];

const paymentChecklist = [
  'Create Wise, PayPal & Payoneer accounts in advance',
  'Verify your identity on each (it can take a few days)',
  'Link a local bank, GCash, or Maya for withdrawals',
  'Keep a simple invoice template ready',
];

const redFlags = [
  '"Pay a fee to start working" — real clients pay YOU, not the reverse.',
  'Asking for your bank login or OTP. Never. Walk away.',
  'Too-good-to-be-true pay for tiny tasks. Usually a scam.',
  'No contract or unclear scope. Always get terms in writing.',
  'Pressure to decide "right now." Legit clients give you time.',
  'Asking you to buy gift cards or load. Classic scam.',
];

const coachingPoints = [
  'How I use AI to become the VA clients fight to hire',
  'How to position yourself and land your first client',
  'Live guidance, so you never figure it out alone like I did',
];

/* ---------------------------------------------------------
   NICHE QUIZ
--------------------------------------------------------- */

const quizQuestions = [
  {
    text: "What's your background or education closest to?",
    options: [
      { label: 'Accounting, finance, or business', tag: 'bookkeeping' },
      { label: 'Marketing, communications, or media', tag: 'social' },
      { label: 'Writing, journalism, or languages', tag: 'copywriting' },
      { label: 'Art, design, or something creative', tag: 'design' },
      { label: 'Something else / still studying', tag: 'admin' },
    ],
  },
  {
    text: 'Which of these sounds most like YOU?',
    options: [
      { label: 'I love organizing, numbers, and getting details right', tag: 'bookkeeping' },
      { label: 'I love creating posts, photos, and content', tag: 'social' },
      { label: 'I love writing and finding the right words', tag: 'copywriting' },
      { label: 'I love helping people and keeping things on track', tag: 'admin' },
      { label: 'I love making things look beautiful', tag: 'design' },
    ],
  },
  {
    text: 'What kind of work feels most satisfying?',
    options: [
      { label: 'Balancing the books and seeing everything add up', tag: 'bookkeeping' },
      { label: 'Growing a page and watching engagement climb', tag: 'social' },
      { label: 'Writing something that makes people take action', tag: 'copywriting' },
      { label: "Bringing order to a busy person's chaos", tag: 'admin' },
      { label: 'Designing something people stop to look at', tag: 'design' },
    ],
  },
  {
    text: 'Which tools are you most drawn to learning?',
    options: [
      { label: 'Spreadsheets, QuickBooks, Xero', tag: 'bookkeeping' },
      { label: 'Instagram, Canva, scheduling tools', tag: 'social' },
      { label: 'Google Docs, email tools, writing apps', tag: 'copywriting' },
      { label: 'Gmail, Calendar, project management apps', tag: 'admin' },
      { label: 'Canva, Photoshop, design tools', tag: 'design' },
    ],
  },
  {
    text: 'How do you prefer to work?',
    options: [
      { label: 'Quietly behind the scenes, focused and precise', tag: 'bookkeeping' },
      { label: 'Creatively, with room to express ideas', tag: 'design' },
      { label: 'With words, thinking and crafting messages', tag: 'copywriting' },
      { label: 'Coordinating, supporting, and communicating', tag: 'admin' },
    ],
  },
  {
    text: "What's your biggest strength?",
    options: [
      { label: 'Accuracy and attention to detail', tag: 'bookkeeping' },
      { label: 'Creativity and ideas', tag: 'social' },
      { label: 'Communication and writing', tag: 'copywriting' },
      { label: 'Organization and reliability', tag: 'admin' },
      { label: 'A good visual eye', tag: 'design' },
    ],
  },
];

const nicheResults = {
  bookkeeping: { title: 'Bookkeeping & Accounting VA', desc: 'You have the eye for numbers and detail that clients trust with their books.' },
  social: { title: 'Social Media Marketing VA', desc: 'You know how to grow a page and turn content into community.' },
  copywriting: { title: 'Copywriting & Content VA', desc: 'You find the words that make people stop, read, and act.' },
  admin: { title: 'Admin / Executive Assistant VA', desc: "You bring calm and order to a busy founder's day-to-day." },
  design: { title: 'Graphic Design VA', desc: 'You have the visual eye clients need to look professional online.' },
};

function computeNiche(tags) {
  const counts = {};
  tags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  });
  let best = 'admin';
  let bestCount = -1;
  Object.entries(counts).forEach(([tag, count]) => {
    if (count > bestCount) {
      best = tag;
      bestCount = count;
    }
  });
  return best;
}

function NicheQuiz() {
  const [step, setStep] = useState(0); // 0..5 = questions, 6 = lead capture, 7 = result
  const [answers, setAnswers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const totalSteps = quizQuestions.length + 1; // + lead capture step
  const progressPct = Math.min(100, Math.round(((step + 1) / totalSteps) * 100));

  const nicheKey = useMemo(() => computeNiche(answers), [answers]);
  const niche = nicheResults[nicheKey];

  const handleAnswer = (tag) => {
    const nextAnswers = [...answers, tag];
    setAnswers(nextAnswers);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => s - 1);
  };

  const handleReveal = (e) => {
    e.preventDefault();
    const finalNiche = nicheResults[computeNiche(answers)];
    submitLeadToSheet({ name: firstName, email, quizResult: finalNiche.title });
    setSent(true);
    setStep(quizQuestions.length + 1);
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setFirstName('');
    setEmail('');
    setSent(false);
  };

  return (
    <div className="bva-quiz-box">
      {step < quizQuestions.length && (
        <>
          <div className="bva-quiz-progress-track">
            <div className="bva-quiz-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="bva-quiz-step-label">Question {step + 1} of {quizQuestions.length}</p>
          <h3 className="bva-quiz-question">{quizQuestions[step].text}</h3>
          <div className="bva-quiz-options">
            {quizQuestions[step].options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className="bva-quiz-option"
                onClick={() => handleAnswer(opt.tag)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="bva-quiz-back" onClick={handleBack}>
              ← Back
            </button>
          )}
        </>
      )}

      {step === quizQuestions.length && (
        <div className="bva-quiz-result">
          <p className="bva-quiz-result-badge">Almost there!</p>
          <h3>Your result is ready</h3>
          <p>Enter your name and email and I'll reveal your perfect niche, plus send you the full free VA Starter Guide to go with it.</p>
          <form className="bva-lead-form" onSubmit={handleReveal}>
            <input
              type="text"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bva-btn-gold">Reveal my niche</button>
          </form>
          <button type="button" className="bva-quiz-back" onClick={handleBack}>
            ← Back
          </button>
          <p className="bva-lead-note">No spam, ever. Just your result and helpful VA tips.</p>
        </div>
      )}

      {step > quizQuestions.length && (
        <div className="bva-quiz-result">
          <p className="bva-quiz-result-badge">Your perfect niche</p>
          <h3>{niche.title}</h3>
          <p>{niche.desc}</p>
          {sent && (
            <p className="bva-lead-note">
              Thank you! Your answer has been saved, we'll follow up with the full VA Starter Guide in your email.
            </p>
          )}
          <button type="button" className="bva-quiz-back" onClick={restart}>
            ← Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   PRINTABLE GUIDE LEAD FORM
--------------------------------------------------------- */

function GuideLeadForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLeadToSheet({ name: firstName, email, quizResult: 'Guide Request' });
    setSent(true);
  };

  return (
    <div className="bva-lead-box">
      <h2>Want this as a <span className="bva-gold">printable guide?</span></h2>
      <p>Drop your name and email and I'll send you the full VA Starter Guide PDF + my resume template, so you can keep everything in one place.</p>
      <form className="bva-lead-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bva-btn-gold">Send it to me</button>
      </form>
      {sent && (
        <p className="bva-lead-note">
          Thank you! Your details have been saved, we'll follow up with the full guide in your email.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   COACHING WAITLIST FORM
   Goes to Sheet2 (formType: 'coaching') so it's tracked separately
   from the quiz/guide leads in Sheet1.
--------------------------------------------------------- */

function CoachingWaitlistForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLeadToSheet({ name: firstName, email, formType: 'coaching' });
    setSent(true);
  };

  if (sent) {
    return (
      <p className="bva-lead-note">
        Thank you! Your details have been saved, you'll be the first to know once coaching opens.
      </p>
    );
  }

  return (
    <form className="bva-lead-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="bva-btn-gold">Message Me "COACH" to Join the Waitlist</button>
    </form>
  );
}

/* ---------------------------------------------------------
   SMALL SOCIAL ICONS (inline SVG, no external dependency)
--------------------------------------------------------- */

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 2h-3v13.2a3.1 3.1 0 1 1-2.2-2.97V9.1a6.2 6.2 0 1 0 5.2 6.1V8.4a7.8 7.8 0 0 0 4.5 1.43V6.7a4.8 4.8 0 0 1-4.5-4.7Z" />
    </svg>
  );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */

export default function BecomeAVa() {
  return (
    <div className="bva-page">
      <Link to="/" className="bva-back-link">← Back to home</Link>

      {/* HERO */}
      <section className="bva-hero">
        <p className="bva-eyebrow">The VA Library · Free Learning Hub</p>
        <h1>
          Everything you need to <span className="bva-gold">become a VA.</span>
        </h1>
        <p className="bva-hero-sub">
          Not just a list of links. This is the full path: the steps, the skills, how to build
          your resume and portfolio, where to apply, and how to get paid. All in one place. All free.
        </p>
        <span className="bva-badge">100% Free · Walang Bayad, Walang Catch</span>
        <nav className="bva-pillnav">
          <a href="#niche-quiz">Find Your Niche</a>
          <a href="#roadmap">The Roadmap</a>
          <a href="#niche-courses">Pick a Niche</a>
          <a href="#resume">Resume</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#apply">Where to Apply</a>
          <a href="#paid">Getting Paid</a>
          <a href="#coaching">Coaching</a>
        </nav>
      </section>

      {/* OVERVIEW GRID */}
      <section className="bva-overview-section">
        <div className="bva-overview-grid">
          {overviewSteps.map((step, i) => (
            <a key={step.title} href={step.anchor} className="bva-overview-card">
              <span className="bva-overview-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* NICHE QUIZ */}
      <section className="bva-section" id="niche-quiz">
        <h2>Find your <span className="bva-gold">perfect niche</span></h2>
        <p>
          Not sure where to start? Answer 6 quick questions and I'll point you to the VA niche
          that fits your background, skills, and personality best.
        </p>
        <NicheQuiz />
      </section>

      {/* ROADMAP */}
      <section className="bva-section" id="roadmap">
        <h2>Your path from <span className="bva-gold">zero to hired</span></h2>
        <p>You don't need experience or a degree. You need the right steps, in the right order. Here's the exact path.</p>
        <ol className="bva-steps">
          {roadmapSteps.map((step, i) => (
            <li className="bva-step" key={step.title}>
              <span className="bva-step-num">{i + 1}</span>
              <div className="bva-step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <blockquote className="bva-quote">You don't get ready, then start. You start, then get ready.</blockquote>
      </section>

      {/* PICK A NICHE — COURSES */}
      <section className="bva-section" id="niche-courses">
        <h2>Pick your <span className="bva-gold">niche</span> &amp; learn it free</h2>
        <p>
          These are the most in-demand, beginner-friendly VA niches. Pick ONE to focus on first.
          The courses below are free (some give certificates you can add to your resume). Treat
          these as your training, not just links to skim.
        </p>
        {courseCategories.map((cat) => (
          <div key={cat.label}>
            <p className="bva-cat-label">{cat.label}</p>
            <div className="bva-card-grid">
              {cat.courses.map((course) => (
                <a
                  key={course.title}
                  className="bva-card"
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bva-card-top">
                    <h3>{course.title}</h3>
                    <span className="bva-card-provider">{course.provider}</span>
                  </div>
                  <p>{course.desc}</p>
                  <span className="bva-tag">{course.tag}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* RESUME */}
      <section className="bva-section" id="resume">
        <h2>How to build your <span className="bva-gold">VA resume</span></h2>
        <p>Keep it clean, one page, and focused on how you HELP clients, not just your job history. Copy this exact structure:</p>
        <ol className="bva-steps">
          {resumeSteps.map((step, i) => (
            <li className="bva-step" key={step.title}>
              <span className="bva-step-num">{i + 1}</span>
              <div className="bva-step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: '1.5rem', maxWidth: 'none' }}>
          Save it as "Firstname_Lastname_VA_Resume.pdf" so it looks professional.
        </p>
        <a
          className="bva-card bva-highlight-card"
          href={TODO_LINKS.resumeTemplateDoc}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '1rem', display: 'block' }}
        >
          <div className="bva-card-top">
            <h3>Copy my exact resume template</h3>
            <span className="bva-card-provider">Google Doc</span>
          </div>
          <p>Open the link, then File → Make a copy, and edit your own version.</p>
        </a>
      </section>

      {/* PORTFOLIO */}
      <section className="bva-section" id="portfolio">
        <h2>How to build your <span className="bva-gold">portfolio</span></h2>
        <p>A portfolio is your proof. You don't need paid clients to build one. Create sample work that shows what you can do.</p>
        <ol className="bva-steps">
          {portfolioSteps.map((step, i) => (
            <li className="bva-step" key={step.title}>
              <span className="bva-step-num">{i + 1}</span>
              <div className="bva-step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <blockquote className="bva-quote">
          Experience is just proof you can do the work, and proof can be created. Don't wait for
          someone to give you a chance. Create your own.
        </blockquote>
      </section>

      {/* EQUIPMENT */}
      <section className="bva-section" id="equipment">
        <h2>Equipment you need to <span className="bva-gold">get started</span></h2>
        <p>You don't need a fancy setup to begin. Here's what's essential to start, and what's nice to add later as you grow.</p>
        <div className="bva-card-grid">
          {equipmentItems.map((item) => (
            <div className="bva-card" key={item.title}>
              <h3 style={{ marginBottom: '0.4rem' }}>{item.title}</h3>
              <p>{item.desc}</p>
              <span className={`bva-tag ${item.tag === 'Nice to Have' ? 'bva-tag--muted' : ''}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
        <blockquote className="bva-quote">
          Don't let "I don't have the perfect setup" stop you. Start with what you have. Upgrade as you earn.
        </blockquote>
      </section>

      {/* WHERE TO APPLY */}
      <section className="bva-section" id="apply">
        <h2>Where to find <span className="bva-gold">VA jobs</span></h2>
        <p>The legit platforms where Filipino VAs find clients. Start with 1 or 2, build a strong profile, and apply consistently.</p>
        {applyGroups.map((group) => (
          <div className="bva-apply-group" key={group.label}>
            <p className="bva-cat-label">{group.label}</p>
            <div className="bva-card-grid">
              {group.links.map((link) => (
                <a
                  key={link.title}
                  className="bva-card"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 style={{ marginBottom: '0.3rem' }}>{link.title}</h3>
                  <p style={{ marginBottom: 0 }}>{link.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
        <blockquote className="bva-quote">
          Don't spread thin. A strong Upwork or OnlineJobs.ph profile beats five weak ones.
        </blockquote>
      </section>

      {/* GETTING PAID */}
      <section className="bva-section" id="paid">
        <h2>How you'll <span className="bva-gold">get paid</span></h2>
        <p>
          Set these up BEFORE you land a client. Nothing looks more unprepared than scrambling
          when a client asks "how do I pay you?" Being ready makes you look professional.
        </p>
        <div className="bva-card-grid">
          {paymentMethods.map((method) => (
            <div className="bva-card" key={method.title}>
              <h3 style={{ marginBottom: '0.4rem' }}>{method.title}</h3>
              <p style={{ marginBottom: 0 }}>{method.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.75rem', marginBottom: '0.25rem', maxWidth: 'none', color: '#E5B842', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem', fontWeight: 700 }}>
          Before your first client
        </p>
        <ul className="bva-checklist">
          {paymentChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* RED FLAGS */}
      <section className="bva-section" id="red-flags">
        <h2>Protect yourself: <span className="bva-gold">red flags</span></h2>
        <p>Real opportunities feel calm, clear, and professional. If something feels off, it probably is. Watch for these:</p>
        <ul className="bva-flags">
          {redFlags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </section>

      {/* PRINTABLE GUIDE */}
      <section className="bva-section" id="guide">
        <GuideLeadForm />
      </section>

      {/* COACHING */}
      <section className="bva-section" id="coaching">
        <div className="bva-coaching">
          <span className="bva-coaching-pill">Coming Soon</span>
          <h2>You have the map. Soon, learn to <span className="bva-gold">get hired.</span></h2>
          <p>
            Everything above teaches you the skills. But in 2026, the VAs who actually get hired
            are the ones who know how to use AI to work faster and smarter than the rest. That's
            the part no free course teaches, and it's exactly what I'll coach, live. My live group
            coaching is launching soon.
          </p>
          <ul className="bva-coaching-list">
            {coachingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <CoachingWaitlistForm />
        </div>
      </section>

      {/* STAY CONNECTED */}
      <section className="bva-section bva-connect" id="connect">
        <p className="bva-connect-label">Stay Connected</p>
        <h2>Follow my <span className="bva-gold">journey</span></h2>
        <p>For daily tips, real talk, and the AI tricks that get VAs hired. Come say hi</p>
        <div className="bva-icon-row">
          <a className="bva-icon-btn" href={TODO_LINKS.personalFacebook} target="_blank" rel="noopener noreferrer" aria-label="Personal Facebook">
            <FacebookIcon />
          </a>
          <a className="bva-icon-btn" href={TODO_LINKS.personalInstagram} target="_blank" rel="noopener noreferrer" aria-label="Personal Instagram">
            <InstagramIcon />
          </a>
          <a className="bva-icon-btn" href={TODO_LINKS.personalTiktok} target="_blank" rel="noopener noreferrer" aria-label="Personal TikTok">
            <TiktokIcon />
          </a>
        </div>

        <div className="bva-connect-group" style={{ marginTop: '2.5rem' }}>
          <p className="bva-connect-label">And Follow the Agency</p>
          <p className="bva-connect-name">The VA Library</p>
          <div className="bva-icon-row">
            <a className="bva-icon-btn" href={LINKS.socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Agency Facebook">
              <FacebookIcon />
            </a>
            <a className="bva-icon-btn" href={TODO_LINKS.agencyInstagram} target="_blank" rel="noopener noreferrer" aria-label="Agency Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="bva-final-cta">
          <h2>Are you ready to change your <span className="bva-gold">story?</span></h2>
          <p>You now have everything you need to begin. Pick your niche, follow the steps, and take your first step today.</p>
        </div>
      </section>

    </div>
  );
}
