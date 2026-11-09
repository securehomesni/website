# Secure Home NI website

Marketing website for a home security installer (CCTV and intruder alarms), built with Astro, Tailwind CSS v4 and TypeScript, and deployed as a static site on Cloudflare Pages. The quote form is handled by a Cloudflare Pages Function with Turnstile spam protection.

> **Placeholders:** every business detail, figure and piece of copy that still needs confirming is marked. Run `npm run placeholders` for the full list. See [Before launch](#before-launch).

---

## Quick start

Requires **Node.js 22.12 or later** (Astro 6).

```bash
npm install
cp .env.example .env      # optional: public build-time settings
npm run dev               # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload. Placeholders get a dashed orange outline. |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder |
| `npm run check` | Type-checks Astro components and TypeScript |
| `npm run pages:dev` | Runs the built site **with the form function** locally via Wrangler (run `npm run build` first) |
| `npm run placeholders` | Lists every remaining placeholder |

### Testing the form locally

`npm run dev` does not run Cloudflare Functions, so form submissions there will fail. To test the full flow:

```bash
cp .dev.vars.example .dev.vars   # uses Cloudflare's always-pass Turnstile test keys
npm run build
npm run pages:dev                # http://localhost:8788
```

With `DEV_MODE=true` and no Resend key, submissions are printed to the terminal instead of emailed.

---

## Project structure

```
├── functions/api/quote.ts      Form handler (Cloudflare Pages Function)
├── public/                     Copied as-is: favicon, OG image, _headers
├── scripts/find-placeholders.mjs
└── src/
    ├── config/site.ts          ★ Business details, navigation, CTA label
    ├── styles/global.css       ★ Design tokens + shared component styles
    ├── content/                ★ Markdown content collections
    │   ├── services/           One file per service page
    │   ├── locations/          One file per area page
    │   └── guides/             Guides / blog posts
    ├── content.config.ts       Collection schemas (frontmatter fields)
    ├── data/faqs.ts            ★ Homepage FAQs
    ├── assets/work/            ★ Photos (optimised at build time)
    ├── components/
    │   ├── home/               Homepage sections (Hero, Services, Process, Trust, Areas, Faq)
    │   ├── forms/QuoteForm.astro
    │   ├── ui/                 Icon, Placeholder
    │   └── Header, Footer, MobileCallBar, PageHeader, CtaPanel, QuoteSection, SEO, Logo
    ├── layouts/BaseLayout.astro  <head>, skip link, header, footer, structured data
    ├── lib/schema.ts           JSON-LD builders (LocalBusiness, Service, Breadcrumb)
    └── pages/                  Routes (file name = URL)
```

★ = the files you'll edit most.

### Pages

| URL | Source |
| --- | --- |
| `/` | `pages/index.astro` |
| `/services/`, `/services/cctv/` … | `pages/services/` + `content/services/*.md` |
| `/areas/`, `/areas/belfast/` … | `pages/areas/` + `content/locations/*.md` |
| `/guides/`, `/guides/domestic-cctv-and-the-law/` | `pages/guides/` + `content/guides/*.md` |
| `/about/`, `/contact/`, `/privacy-policy/`, `/accessibility-statement/` | `pages/*.astro` |
| `/thank-you/` (noindex), `/404` | Form confirmation without JavaScript; not-found page |
| `/robots.txt`, `/sitemap-index.xml` | Generated at build |

---

## Editing content

### Business details
Everything in **`src/config/site.ts`**: name, phone, email, address, hours, areas, SSAIB number, insurance, review rating, promises ("what makes us different"), navigation. It feeds the header, footer, structured data and page copy.

**Name, address and phone must match your Google Business Profile exactly.**

### Adding a service, area or guide
Copy an existing Markdown file in the matching `src/content/` folder and change the frontmatter and text. The file name becomes the URL (`cctv-for-flats.md` → `/services/cctv-for-flats/`). Required fields are defined and validated in `src/content.config.ts`; the build fails with a clear message if one is missing.

- **Services:** `featured: true` gives a service a full row on the homepage. `order` sets the order everywhere.
- **Locations:** a town in `site.areas` links to its page automatically when the location file's `name` matches. Write genuinely local copy for each; thin, near-identical location pages can hurt rankings.
- Remove `placeholder: true` once real copy is in.

### FAQs
`src/data/faqs.ts`. Answers can include links.

### Photos
Replace the files in `src/assets/work/` (keep the names, or update the imports in `components/home/Trust.astro` and `pages/about.astro`). Astro's `<Image />` resizes and converts them to modern formats at build time. Upload large originals (at least 1600px wide).

Write alt text that describes what the photo shows. **Never publish photos showing house numbers, street names, number plates, or where a camera can't see.**

### Logo
Replace the placeholder SVG in `src/components/Logo.astro` and `public/favicon.svg`, and the social sharing image `public/og-default.png` (1200 × 630).

---

## Design tokens

All in **`src/styles/global.css`** inside `@theme`. Tailwind turns each token into utilities (e.g. `--color-navy` → `bg-navy`, `text-navy`).

| Token | Value | Use |
| --- | --- | --- |
| `navy` | #142D4E | Headings, footer, dark UI |
| `teal` | #168C86 | Brand accent for **large text, icons and rules only** (3.8:1) |
| `teal-ink` | #0E6B66 | Links, small accent text, button fills (5.9:1; white on it 6.3:1) |
| `teal-soft` | #7FD6CF | Accent on navy (8.2:1) |
| `paper` | #F8F7F3 | Page background |
| `mint` | #E8F7F0 | Quiet section backgrounds |
| `ink` | #29343D | Body text |
| `muted` | #4E5963 | Secondary text (6.7:1) |
| `line` / `line-strong` | #DCDFD8 / #7D8790 | Dividers / form borders (3.4:1) |
| `error` | #B42318 | Error text and borders |

- **Type:** Schibsted Grotesk (variable), self-hosted via `@fontsource-variable/schibsted-grotesk`, so no requests go to Google. Scale: `text-xs` → `text-display`.
- **Spacing:** `py-section` for vertical section rhythm, `.wrap` for the page container and gutters.
- **Shape:** `rounded-sm` for buttons and inputs, `rounded-md` for panels.
- **Component classes** (`.btn`, `.btn-primary`, `.link`, `.field-*`, `.faq-item`, `.prose-content`) live in the `@layer components` block of the same file.

Change a token once and it updates site-wide. If you change a colour, re-check contrast (WebAIM's contrast checker is quick).

---

## Deploying to Cloudflare Pages

1. Push the repository to GitHub.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, and pick the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Settings → Variables and secrets** (Production, and Preview if wanted):

   | Name | Type | Value |
   | --- | --- | --- |
   | `NODE_VERSION` | Text | `22` |
   | `SITE_URL` | Text | `https://www.yourdomain.co.uk` |
   | `PUBLIC_TURNSTILE_SITE_KEY` | Text | from Cloudflare Turnstile |
   | `TURNSTILE_SECRET_KEY` | Secret | from Cloudflare Turnstile |
   | `RESEND_API_KEY` | Secret | from resend.com |
   | `QUOTE_TO_EMAIL` | Text | where enquiries go |
   | `QUOTE_FROM_EMAIL` | Text | e.g. `Website <website@yourdomain.co.uk>` (domain verified in Resend) |

5. **Turnstile:** Cloudflare dashboard → Turnstile → Add widget, hostname = your domain, mode **Managed** (non-interactive for most people, no puzzles).
6. **Analytics:** in the Pages project, enable **Web Analytics**. It needs no code and no cookies, so no consent banner. (Alternatively, put a token in `site.analytics.cloudflareToken`.)
7. Add your custom domain under **Custom domains**.
8. Submit `https://yourdomain/sitemap-index.xml` in Google Search Console.

Every push to the main branch deploys automatically; other branches get preview URLs.

> Prefer a different email provider? Only `sendEmail()` in `functions/api/quote.ts` needs changing.

---

## Accessibility and quality checks

Built to WCAG 2.2 AA: semantic landmarks, one `h1` per page, `lang="en-GB"`, skip link, visible focus styles, focus kept clear of the sticky header and mobile call bar, keyboard-operable mobile menu with `aria-expanded`, native `<details>` FAQs, visible labels with GOV.UK-style error summary and inline errors, correct `autocomplete`, 44px tap targets, `prefers-reduced-motion` respected, no autoplay.

Before launch, and after big changes:

- [ ] Lighthouse (Chrome DevTools) on mobile: 90+ in every category
- [ ] axe DevTools: no violations
- [ ] Keyboard only: Tab through every page, open/close the menu, submit the form with errors
- [ ] Screen reader: VoiceOver (macOS/iOS) and NVDA (Windows), including the form
- [ ] Zoom to 200% and 400%; resize to 320px wide with no horizontal scrolling
- [ ] Validate structured data with Google's Rich Results Test

---

## Before launch

- [ ] Run `npm run placeholders` and clear everything it lists
- [ ] Business details in `src/config/site.ts` match Google Business Profile exactly
- [ ] Real SSAIB number and a direct link to your SSAIB directory entry
- [ ] Real review rating, count and link (never estimate these)
- [ ] Real photos with accurate alt text, checked for anything that identifies a home
- [ ] Real logo, favicon and OG image
- [ ] Unique local copy for each location page
- [ ] Privacy policy reviewed and retention periods confirmed
- [ ] Guide to domestic CCTV and the law reviewed against current ICO guidance
- [ ] Accessibility statement updated with test date and any known issues
- [ ] Production Turnstile and Resend keys set; a real test enquiry received
- [ ] Remove the `<!-- PLACEHOLDER -->` HTML comments from Markdown files

## Possible next steps

- Add a Content Security Policy to `public/_headers` (allow `challenges.cloudflare.com` for Turnstile and `static.cloudflareinsights.com` if using the analytics script).
- Add individual reviews/testimonials once you have permission to quote customers.
