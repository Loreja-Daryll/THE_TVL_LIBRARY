# TVL React Migration — Faithful Port mula sa Liquid Theme

Ito na yung tamang bersyon — direktang kinuha ang content, colors, at behavior mula sa
totoong `.liquid` source files at `templates/index.json` (yung actual live homepage config),
hindi na sa screenshots lang.

## Paano i-run (standalone na project ito ngayon)

1. I-extract ang buong ZIP sa isang folder (halimbawa: Desktop\tvl-react)
2. Buksan ang folder na yun sa VS Code o terminal
3. `npm install`
4. `npm run dev`
5. Buksan yung link na lalabas sa terminal (usually `http://localhost:5173`)

Kung meron ka nang ibang existing Vite project at gusto mo lang i-merge yung code,
pwede mo ring kopyahin lang yung `src/` at `public/` papunta doon (papalitan lang
niya yung mga file na parehong pangalan).

## Anong nag-iba mula sa dating bersyon (mahalaga)

- **Booking section hindi na interactive/multi-step.** Sa totoong site, static lang siyang
  current-month calendar (auto-updates base sa totoong petsa) — LAHAT ng available dates,
  time slots, at yung "Confirm Discovery Call" button ay diretsong **links papuntang totoong
  Calendly URL** (bagong tab). Walang form, walang "success" step — ganito talaga sa live site.
- **"Particle background" pure CSS pala**, hindi canvas animation — 2 umiikot na gold
  "spotlight" blobs + 16 fixed na twinkling sparkle dots. Mas magaan pa sa browser.
- **Exact gold colors:** Hero section gumagamit ng mas champagne/muted gold
  (`#c9a77a` → `#e8d4a8` → `#fff4c2`) samantalang lahat ng ibang section (Pain Points,
  Services, Founder, Reviews, Booking, Footer) gumagamit ng mas matingkad na gold
  (`#E5B842` → `#FFD86B` → `#FFF4C2`). Sadyang magkaiba ito sa totoong site — kinopya ko
  nang eksakto.
- **Totoong section IDs (importante para sa nav):**
  - Nav "About" → Founder section (`id="about"`)
  - Nav "Process" → Pain Points section (`id="process"`)
  - Nav "Services" → Services section (`id="services"`)
  - Nav "Contact" → Footer section (`id="contact"`)
  - Booking section (`id="booking"`)

## Totoong links na nakalagay na (mula sa templates/index.json)

- Calendly: `https://calendly.com/thevalibraryph/30min`
- Facebook: `https://www.facebook.com/thavalibrary`
- LinkedIn: `https://linkedin.com/company/the-va-library-ph`
- Email: `support@thevalibrary.com`

Nasa `src/constants/links.js` lahat ng ito — dito mo na lang babaguhin kung may update.

## Kulang pa lang (assets)

- `public/assets/hero-image.jpg` — hero dashboard/office image (Shopify image reference sa
  source, hindi ko na-access yung actual file)
- `public/assets/sheena-laguerta.jpg` — founder portrait (same reason)
- `become_va_url`, `privacy_url`, `terms_url` sa `links.js` — placeholder paths muna
  (`/become-a-va`, `/privacy`, `/terms`) dahil Shopify page references sila sa source
  (`shopify://pages/...`); palitan mo na lang ng totoong URL/path sa bagong site mo.

Lahat ng ibang text content (headings, paragraphs, 9 services, 6 pain points, 9 testimonials,
stats, booking details) ay literal na kinopya mula sa totoong `templates/index.json` —
salita-por-salita, kasama pati yung mga maliliit na detalye tulad ng "E-Commerce" (hindi
"E-commerce") at "Legal / Copyright".
