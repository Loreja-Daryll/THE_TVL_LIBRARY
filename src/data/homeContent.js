// Homepage content — TVL Ecommerce Creative Studio rebuild (Oct 2026)
// Plain data only, no markup. Edit copy here instead of inside components.
// [bracketed] values are confirmed placeholders, not fabricated numbers —
// swap them once Sheena provides the real figure. No fake stats, no fake
// reviews, per the project's existing content rules.

export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
};

export const hero = {
  eyebrow: 'Creative Studio',
  heading: ['Ads that stop the scroll.', 'Stores that sell.', 'Emails that bring them back.'],
  headingAccentIndex: 2,
  body: 'We create AI video ads, Shopify websites and email flows for ecommerce brands ready to grow.',
  primaryCta: { label: 'Book a Free Strategy Call', targetId: 'lets-talk' },
  secondaryCta: { label: 'Watch Our Work', targetId: 'work' },
  image: '/assets/hero.png',
  badge: 'TVL · Ecommerce Creative Studio',
  // TODO: Sheena to provide the real studio reel. Until this is set, the
  // "Watch Our Work" modal shows a placeholder instead of a broken video.
  // Drop the file in public/assets/video/ and point this at it, e.g.
  // videoSrc: '/assets/video/studio-reel.mp4'
  videoSrc: '',
};

export const services = {
  eyebrow: 'Our Services',
  heading: ['A complete growth system for', 'ecommerce brands.'],
  headingAccentIndex: 1,
  body: 'Creative, conversion and retention, working together to help your brand grow.',
  cards: [
    {
      id: 'ads',
      number: '01',
      title: 'AI UGC Ads',
      line: 'Scroll-stopping video ads that turn views into customers.',
      icon: 'play',
      targetId: 'lets-talk',
    },
    {
      id: 'web',
      number: '02',
      title: 'Shopify Websites',
      line: 'High-converting Shopify stores designed to create a better shopping experience.',
      icon: 'window',
      targetId: 'lets-talk',
    },
    {
      id: 'email',
      number: '03',
      title: 'Email Marketing',
      line: 'Email campaigns and automated flows that bring customers back and support repeat purchases.',
      icon: 'mail',
      targetId: 'lets-talk',
    },
  ],
};

export const selectedWork = {
  eyebrow: '01 / Selected Work',
  heading: ['Real brands.', 'Real results.'],
  headingAccentIndex: 1,
  note: 'A selection of creative built for the ecommerce customer journey.',
  items: [
    {
      id: 'work-ads',
      title: 'AI UGC Ads',
      tags: 'Video Ads / Social Media',
      line: 'Scroll-stopping video ads designed to turn viewers into customers.',
      poster: '/assets/tvl-home-sample-ads.jpg',
    },
    {
      id: 'work-web',
      title: 'Shopify Websites',
      tags: 'Website Design / Ecommerce',
      line: 'High-converting Shopify stores designed to create a better shopping experience.',
      poster: '/assets/tvl-home-sample-web.jpg',
    },
    {
      id: 'work-email',
      title: 'Email Marketing',
      tags: 'Email Flows / Automation',
      line: 'Email campaigns and automated flows that bring customers back and support repeat purchases.',
      poster: '/assets/tvl-home-sample-email.jpg',
    },
  ],
  exploreCta: { label: 'Explore All Work', targetId: 'lets-talk' },
};

export const howItWorks = {
  eyebrow: '02 / How It Works',
  heading: ['A simple process.', 'Real results.'],
  headingAccentIndex: 1,
  body: 'From strategy to launch, we keep things clear, collaborative and focused on your growth.',
  cta: { label: 'Book a Free Strategy Call', targetId: 'lets-talk' },
  ctaNote: '30 minutes · No obligation',
  steps: [
    {
      number: '01',
      title: 'Discover',
      line: 'We learn about your brand, goals and current challenges.',
      icon: 'notebook',
      tags: ['Brand Review', 'Goals & Challenges', 'Opportunity Analysis'],
    },
    {
      number: '02',
      title: 'Create',
      line: 'Our team builds your ads, website or email flows tailored to your audience.',
      icon: 'monitor',
      tags: ['Strategy & Planning', 'Creative Production', 'Design & Development'],
    },
    {
      number: '03',
      title: 'Launch & Improve',
      line: 'We launch, monitor and continuously improve based on real data and feedback.',
      icon: 'chartUp',
      tags: ['Launch & Setup', 'Monitor Performance', 'Refine & Improve'],
    },
  ],
};

export const whyWorkWithTvl = {
  eyebrow: '03 / Why Work With TVL',
  heading: ['More than a service.', 'A creative partner.'],
  headingAccentIndex: 1,
  body: 'We combine strategy, creative and execution to help ecommerce brands create better experiences, attract the right customers and grow with confidence.',
  cta: { label: 'Book a Free Strategy Call', targetId: 'lets-talk' },
  ctaNote: '30 minutes · No obligation',
  image: '/assets/hero.png',
  points: [
    {
      icon: 'people',
      title: 'Ecommerce-focused expertise',
      line: 'We work exclusively with ecommerce brands, so every recommendation, creative and strategy is built around your growth.',
    },
    {
      icon: 'diamond',
      title: 'Creative that drives results',
      line: 'We create high-quality, strategic creative designed to attract the right audience and support real business goals.',
    },
    {
      icon: 'chartUp',
      title: 'A complete, connected system',
      line: 'Ads, websites and email marketing work together for a smoother customer journey and stronger results.',
    },
    {
      icon: 'handshake',
      title: 'A collaborative, long-term approach',
      line: 'We see ourselves as an extension of your team, focused on continuous improvement, not just one-time deliverables.',
    },
  ],
};

export const faq = {
  eyebrow: '04 / FAQ',
  heading: ['Frequently', 'asked questions.'],
  body: 'Here are answers to some of the most common questions about working with TVL.',
  items: [
    {
      question: 'What services does TVL offer?',
      answer:
        'Three core services: AI UGC-style video ads, Shopify website design and build, and email marketing (campaigns and automated flows). You can work with us on one service or all three.',
    },
    {
      question: 'Do I have to get all three services?',
      answer:
        'No. You can choose the service that fits your current needs. Some clients start with one service and expand later as their brand grows.',
    },
    {
      question: 'What types of ecommerce brands do you work with?',
      answer:
        'We work with ecommerce brands across categories, including skincare, supplements, fashion and home goods.',
    },
    {
      question: 'How long does it take to get started?',
      answer:
        'We start with a free 30-minute strategy call to understand your brand and goals. Project timelines after that depend on scope.',
    },
    {
      question: 'What is the investment?',
      answer:
        'Pricing depends on which service (or combination of services) fits your brand. We’ll walk through options on your strategy call.',
    },
    {
      question: 'How is the work delivered?',
      answer: 'Deliverables are shared digitally, ad files, staging links for website work, and email flows set up directly in your platform.',
    },
    {
      question: 'Can you work with my existing Shopify store?',
      answer: 'Yes. We can redesign sections of an existing store or work on specific pages without rebuilding everything from scratch.',
    },
    {
      question: 'What if I’m not sure what I need yet?',
      answer:
        'That’s what the strategy call is for. We’ll look at your brand together and recommend where to start.',
    },
  ],
  contactNote: 'Still have questions?',
  contactLine: 'Send us an email at',
};

export const letsTalk = {
  eyebrow: '05 / Let’s Talk',
  heading: ['Let’s build your', 'next growth move.'],
  headingAccentIndex: 1,
  body: 'A focused 30-minute conversation about your brand, your current challenges, and where better creative or ecommerce experiences could help.',
  points: [
    {
      icon: 'target',
      title: 'Review your goals',
      line: 'Understand your current challenges and what you want to achieve.',
    },
    {
      icon: 'chartUp',
      title: 'Identify your biggest opportunity',
      line: 'Get an expert perspective on where creative or ecommerce improvements can make the most impact.',
    },
    {
      icon: 'lightbulb',
      title: 'Explore the right next step',
      line: 'Discuss the best approach for your brand, with no pressure.',
    },
  ],
  cta: { label: 'Book a Free Strategy Call' },
  ctaNote: '30 minutes · No obligation',
  image: '/assets/hero.png',
};

export const readyToGrow = {
  eyebrow: '06 / Ready to Grow',
  heading: ['Ready to turn', 'your vision into results?'],
  headingAccentIndex: 1,
  body: 'Book a free 30-minute strategy call and let’s explore how better creative and ecommerce experiences can help your brand grow.',
  cta: { label: 'Book a Free Strategy Call' },
  ctaNote: '30 minutes · No obligation',
  image: '/assets/hero.png',
  points: [
    {
      icon: 'chat',
      title: 'Talk through your goals',
      line: 'Share where you are and where you want to go.',
    },
    {
      icon: 'chartUp',
      title: 'Get expert insights',
      line: 'Identify your biggest opportunities for growth.',
    },
    {
      icon: 'target',
      title: 'Find the right next step',
      line: 'Explore the best approach for your brand.',
    },
  ],
};

export const footer = {
  blurb: 'We create AI video ads, Shopify websites and email marketing for ecommerce brands ready to grow.',
  quickLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
  serviceLinks: [
    { label: 'AI UGC Ads', href: '#services' },
    { label: 'Shopify Websites', href: '#services' },
    { label: 'Email Marketing', href: '#services' },
  ],
};

// Section backgrounds. Leave `video` empty for the animated gradient version.
// When the HeyGen/AI loops are ready, drop the .mp4 files in public/assets/video/
// and fill the paths, e.g. video: '/assets/video/bg-hero.mp4'
export const backdrops = {
  hero:     { video: '/assets/video/bg-hero.mp4',     poster: '/assets/video/bg-hero.jpg' },
  services: { video: '/assets/video/bg-services.mp4', poster: '/assets/video/bg-services.jpg' },
  work:     { video: '/assets/video/bg-work.mp4',     poster: '/assets/video/bg-work.jpg' },
  how:      { video: '/assets/video/bg-how.mp4',      poster: '/assets/video/bg-how.jpg' },
  why:      { video: '/assets/video/bg-why.mp4',      poster: '/assets/video/bg-why.jpg' },
  faq:      { video: '/assets/video/bg-faq.mp4',      poster: '/assets/video/bg-faq.jpg' },
  talk:     { video: '/assets/video/bg-faq.mp4',     poster: '/assets/video/bg-talk.jpg' },
  grow:     { video: '/assets/video/bg-grow.mp4',     poster: '/assets/video/bg-grow.jpg' },
};
