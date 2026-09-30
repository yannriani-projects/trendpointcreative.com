# Trendpoint Creative — website

A fast, static, no-backend company profile site for Trendpoint Creative, built with
plain HTML, CSS, and vanilla JavaScript (ES modules). No build step required.

## 1. Install

There's nothing to install — there's no framework and no package.json.
You only need a way to serve static files locally, because the JavaScript is
loaded with `<script type="module">`, and modules don't run over a plain
`file://` URL.

If you'd like a package.json anyway (for editor tooling, a dev-server script,
etc.), running `npm init -y` in this folder is enough; nothing here depends on it.

## 2. Run locally

Pick any static server. A couple of one-liners:

```bash
# Option A — Node (no install needed if you have npx)
npx serve .

# Option B — Python
python3 -m http.server 8000
```

Then open the printed local URL (e.g. `http://localhost:8000`).

## 3. Build

There is no build step. `index.html`, `/css`, `/js`, and `/assets` are already
the deployable output.

## 4. Cloudflare Pages deployment

1. Push this folder to a Git repository (GitHub/GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (repo root)
4. Deploy. Cloudflare will serve `index.html` and the static assets directly —
   there's no SPA routing here (it's a single page with in-page anchors), so no
   `_redirects` fallback is needed.

If you'd rather deploy without Git, you can also drag-and-drop this folder into
the Pages dashboard's direct-upload flow.

## 5. Environment variables

None. The site is fully static and makes no API calls, so there's nothing to
configure in Cloudflare's environment variable settings.

## 6. How to change content

All editable copy lives in three small data files — you don't need to touch
the HTML or the interactivity in `main.js` to update text. The site copy is
now in Bahasa Indonesia throughout (`index.html`, `js/main.js`, and the data
files below):

- `js/data/site.js` — studio name, tagline, nav links, social/contact links,
  the "Dari Ide Jadi Sesuatu yang Nyata" process steps, and the "Kenapa
  Trendpoint" cards.
- `js/data/services.js` — the five "Jadi, sebenarnya kami ngerjain apa?"
  intro cards, the full five services (with their bullet lists), and the
  interactive quiz's questions and recommendations. **Media Sosial** already
  includes content production (reels/foto/video/carousel) through to
  posting, and **Ide Kreatif** already includes content strategy/structure
  (content pillar, campaign planning, monthly planning) — these two used to
  be four separate cards (Media Sosial, Konten, Ide Kreatif, Produksi
  Kreatif) and were merged for a simpler, less confusing menu for UMKM
  visitors. **Company Profile / Kompro** notes it can be delivered as a PPT
  deck or as a one-page microsite (static web).
- `js/data/portfolio.js` — the simplified "Portofolio" section: an array
  (`PROJECTS`) of Trendpoint's own proof-of-work brands, currently
  **Corvaapparel** (apparel, `instagram.com/corvaapparel`) and **Dompet Gen
  Z** (digital product, `instagram.com/dompetgenz`). Each project is a plain
  card (label, description, highlight bullets, "lihat di Instagram" button)
  — no placeholder tiles or case-study tabs anymore, to keep it simple and
  fast to scan for UMKM visitors who don't have a client portfolio to judge
  yet. Add more objects to `PROJECTS` in the same shape once real client
  work exists, or once new self-made projects launch — `main.js` renders
  the grid straight from this array.

Edit the plain JS objects/arrays in those files and refresh — everything on
the page (nav, footer, cards, quiz, tabs, accordion, timeline) is rendered
from them by `js/main.js`.

Colors, type, spacing, and every component's look live in `css/style.css`,
which opens with a token block (`:root { ... }`) for the core palette and
type families — change values there to re-theme the whole site.

## 7. How to replace images

There are no fake or stock images anywhere on the site, on purpose, since
Trendpoint doesn't have real client work to show yet — the "Portofolio"
section is text-only (label, description, bullet highlights, and a link out
to the real Instagram account for each project).

If you'd like to add a photo to a portfolio card later, you'll need to add an
`image` field to the relevant object in `js/data/portfolio.js` and render an
`<img>` for it inside `renderPortfolio()` in `js/main.js` — that hook doesn't
exist yet, by design, so nothing renders a placeholder image today.

The Open Graph share image is `/assets/og-image.jpg` — also a placeholder,
swap the file (keep the same filename, or update the `og:image` /
`twitter:image` paths in `index.html`).

## 8. How to add portfolio entries

The site is intentionally honest about being early-stage: it shows two
proof-of-work entries (Trendpoint's own brands, **Corvaapparel** and
**Dompet Gen Z**) and an "Open for Collaboration" section instead of fake
client logos or testimonials. When real client projects exist:

1. In `js/data/portfolio.js`, add a new object to the `PROJECTS` array using
   the same shape (`id`, `name`, `label`, `description`, `highlights`,
   `exploreLabel`, `exploreUrl`).
2. That's it — `renderPortfolio()` in `js/main.js` loops over `PROJECTS` and
   renders a card for every entry automatically, no HTML or JS changes
   needed.
3. Never populate a new entry with fake numbers, testimonials, or results
   that didn't happen — leave those fields out until they're real.

## 9. Pricing / promo messaging

The "Layanan" section and the "Open for Collaboration" section both mention
an introductory/special rate for early partners and point people to contact
Trendpoint directly (WhatsApp / Instagram DM / the project inquiry form)
instead of publishing a fixed price list — deliberately, since pricing is
meant to be negotiated per UMKM/brand for now. Edit the relevant `<p>` /
`<span class="collab-highlight">` text in `index.html` if the offer changes,
and update `SITE.social.whatsapp` in `js/data/site.js` to the studio's real
WhatsApp number (it currently holds a placeholder number).

## Notes on the interactive pieces

- **Service quiz** (`#quiz`) — pure client-side; picking an option renders a
  recommendation from `QUIZ` in `services.js` and links into the project
  inquiry modal with that service pre-selected.
- **Project inquiry form** (`#modal`) — no backend. On submit it builds a
  plain-text summary of the form and turns it into a pre-filled WhatsApp
  (`wa.me`) link and a `mailto:` link, both shown to the user to send
  themselves. To wire it to a real backend later, replace the `submit`
  handler in `initModal()` (`js/main.js`) with a `fetch()` POST to your
  endpoint — the `FormData` collection logic can stay as-is.
- Everything respects `prefers-reduced-motion` (parallax, scroll
  reveals, and the process timeline all degrade to static/instant).
