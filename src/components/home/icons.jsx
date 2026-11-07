// Shared inline SVG icon set for the homepage rebuild. Plain line icons,
// no emoji, consistent 1.5px stroke so they read well at small circle sizes.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

export const ChatIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M21 12a8 8 0 1 1-3.4-6.5L21 4l-1.2 3.6A7.9 7.9 0 0 1 21 12Z" />
  </svg>
);

export const ChartUpIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 20V10M12 20V4M20 20v-6" />
  </svg>
);

export const TargetIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const LightbulbIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 18h6M10 21h4M8.5 14.5A5.5 5.5 0 1 1 15.5 14.5c-.8.9-1.5 1.7-1.5 2.9v.1h-4v-.1c0-1.2-.7-2-1.5-2.9Z" />
  </svg>
);

export const PeopleIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <circle cx="17.5" cy="9.5" r="2.4" />
    <path d="M15.8 13.2a4.6 4.6 0 0 1 5.2 4.5" />
  </svg>
);

export const DiamondIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 9h12M3 9l4-5h10l4 5M3 9l9 12 9-12M9.5 4l-2 5 4.5 12 4.5-12-2-5" />
  </svg>
);

export const HandshakeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M2 12.5 6 9l3.2 2.8a1.6 1.6 0 0 0 2.2-.1l.1-.1a1.6 1.6 0 0 0 0-2.2L9 7" />
    <path d="M22 12.5 18 9l-3.4 3a1.7 1.7 0 0 1-2.3 0" />
    <path d="M6 9 2 12.5l4 4.2 2-1.7M18 9l4 3.5-4 4.2-2.4-2" />
    <path d="M9.6 14.3l2 1.8a1.6 1.6 0 0 0 2.2-.1 1.6 1.6 0 0 0-.1-2.3" />
  </svg>
);

export const MailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const CalendarIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </svg>
);

export const PlayIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10 8.5v7l6-3.5-6-3.5Z" />
  </svg>
);

export const WindowIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 9h18M6.5 6.75h.01M9 6.75h.01" />
  </svg>
);

export const NotebookIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="4" y="3.5" width="15" height="17" rx="1.5" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

export const MonitorIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
    <path d="M8 20h8M12 16.5V20" />
  </svg>
);

export const ArrowRightIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const ICONS = {
  chat: ChatIcon,
  chartUp: ChartUpIcon,
  target: TargetIcon,
  lightbulb: LightbulbIcon,
  people: PeopleIcon,
  diamond: DiamondIcon,
  handshake: HandshakeIcon,
  mail: MailIcon,
  calendar: CalendarIcon,
  play: PlayIcon,
  window: WindowIcon,
  notebook: NotebookIcon,
  monitor: MonitorIcon,
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
