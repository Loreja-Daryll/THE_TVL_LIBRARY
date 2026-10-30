// Homepage rebuild content - matches "Homepage rebuild: developer handoff"
// (Sheena, v1.0, Oct 30 2026). All copy is final unless it has a
// [placeholder] - those are intentionally left for Sheena to fill in.
// No em dashes, no fake numbers, no fake reviews (per the handoff's rules).

export const trustFacts = [
  'Filipino-led creative team',
  'Building since 2019',
  'Working with brands in the US, AU, UK and PH',
  'Every video checked by a human',
  'Prices shown upfront',
];

// NOTE on the "poster" fields below: these point to generated placeholder
// graphics (public/assets/tvl-home-sample-*.jpg, tvl-home-work-*.jpg) so the
// layout is viewable before real assets exist. They are plain brand-colored
// cards with a text label, not real ad footage or product photos. Swap each
// one out for a real poster/video once Sheena provides the asset, then this
// placeholder image can be deleted.
export const serviceCards = [
  {
    id: 'ads',
    title: 'AI UGC Ads',
    line: 'Scroll-stopping video ads, without chasing creators or booking shoots.',
    buttonLabel: 'Get a free ad concept',
    previewType: 'ads',
    poster: '/assets/tvl-home-sample-ads.jpg', // placeholder, replace with real asset
    video: null,
  },
  {
    id: 'web',
    title: 'Shopify Websites',
    line: 'A store that looks as good as your product does.',
    buttonLabel: 'Get a free homepage preview',
    previewType: 'web',
    poster: '/assets/tvl-home-sample-web.jpg', // placeholder, replace with real asset
    video: null,
  },
  {
    id: 'email',
    title: 'Email Marketing',
    line: 'Turn one-time buyers into customers who keep coming back.',
    buttonLabel: 'Get a free email design',
    previewType: 'email',
    poster: '/assets/tvl-home-sample-email.jpg', // placeholder, replace with real asset
    video: null,
  },
];

export const workTiles = [
  { id: 'work-1', caption: 'Skincare, concept ad', poster: '/assets/tvl-home-work-1.jpg', video: null },
  { id: 'work-2', caption: 'Supplements, concept ad', poster: '/assets/tvl-home-work-2.jpg', video: null },
  { id: 'work-3', caption: 'Fashion, concept ad', poster: '/assets/tvl-home-work-3.jpg', video: null },
  { id: 'work-4', caption: 'Home goods, concept ad', poster: '/assets/tvl-home-work-4.jpg', video: null },
];

export const previewTimeline = [
  'Today, 2 minutes: You share your store and pick a preview.',
  'Within [48 hours]: Your preview lands in your inbox.',
  "Then, your call: Use it on your own, or let's build more together.",
];

export const previewOptions = [
  { type: 'ads', label: 'A free ad concept' },
  { type: 'web', label: 'A free homepage preview' },
  { type: 'email', label: 'A free email design' },
];

export const previewLabels = {
  ads: 'a free ad concept',
  web: 'a free homepage preview',
  email: 'a free email design',
  choose: 'let us choose what will help most',
};

export const teamMembers = [
  // Real photos only, never AI-generated faces. Add team members here -
  // Sheena to provide names, roles and photos.
];

export const founderStory =
  "I started as a self-taught VA in 2019. I kept asking for the creative work nobody handed me. The graphics. The videos. The websites. Now I lead a team of Filipino creatives who care about your brand like it's ours. You'll always know exactly who's working on your brand.";

export const pricingColumns = [
  { id: 'free', name: 'Free Preview', price: 'Free', highlight: false },
  { id: 'starter', name: 'Starter Project', price: 'From [$X], one-time', highlight: false },
  {
    id: 'monthly',
    name: 'Monthly Growth',
    price: 'From [$X] / month',
    highlight: true,
    label: 'Where we do our best work',
  },
];

export const faqItems = [
  {
    question: 'Are your AI UGC ads made with real customers?',
    answer:
      "No, and we'll never pretend they are. Our ads are creator-style demos and product explainers. We never write fake reviews or fake customer stories for your brand.",
  },
  {
    question: 'What do I actually get in the free preview?',
    answer:
      'One real piece of work for your brand: an ad concept, an email design or a homepage preview. It lands in your inbox within [48 hours], and it\'s yours to keep.',
  },
  {
    question: 'Do I need to send you my product?',
    answer: 'Usually not. We can work from your product photos, existing footage and your store. [Sheena to confirm]',
  },
  {
    question: 'Am I locked into a contract?',
    answer: 'No. Starter projects are one-time. Monthly growth is month to month. [Sheena to add cancellation terms]',
  },
  {
    question: 'Who owns the work?',
    answer: 'You do. Once a project is paid, the ads, emails and designs are yours to use. [Sheena to confirm]',
  },
];
