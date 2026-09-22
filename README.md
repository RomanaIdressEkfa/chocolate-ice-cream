# Chocolate

A four page Next.js site for a small batch chocolate ice cream brand. The home
page is built as five scroll driven sections; three inner pages share the same
layout, type scale and motion language.

## Stack

- **Next.js 14** (App Router, static export)
- **GSAP + ScrollTrigger** — every scroll animation
- **Lenis** — smooth scrolling, synced to ScrollTrigger
- **react-icons** — social marks in the floating bar
- **DM Sans** via `next/font` (self hosted at build time)

## Pages

| Route      | Contents                                                   |
| ---------- | ---------------------------------------------------------- |
| `/`        | Hero, story panel, flavour cards, craft marquee, contact CTA |
| `/shop`    | Product grid with prices, delivery perks                    |
| `/about`   | Brand story with video, stats, values                       |
| `/contact` | Contact form wired to Netlify Forms, plus details           |

## Motion

| Section  | Behaviour                                                        |
| -------- | ---------------------------------------------------------------- |
| Hero     | Pinned; headline splits outward, chunks drift, video scales       |
| Story    | Media card travels in from the right as the headline settles left |
| Flavours | Cards fly in from all four corners, two per side                  |
| Craft    | Marquee band whose speed and direction follow scroll velocity     |
| Contact  | Chocolate chunks converge from both edges behind the headline     |

All motion is skipped when `prefers-reduced-motion: reduce` is set; content
stays fully visible.

## Local development

```bash
npm install
npm run dev
```

Port 3000 is used if free, otherwise Next falls back to 3001.

> Do not run `npm run build` while the dev server is running. Both write to
> `.next/`, and the build will overwrite the chunks the dev server has open.
> If that happens: stop the server, delete `.next/`, start it again.

## Build

```bash
npm run build
```

The static site is emitted to `out/`.

## Deploying to Netlify

`netlify.toml` is already configured:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `out`           |
| Node version      | `20`            |

Connect the repository in the Netlify dashboard and the settings are picked up
from `netlify.toml`. Alternatively drag the generated `out/` folder onto
Netlify, or deploy from the CLI:

```bash
npx netlify-cli deploy --prod
```

## Contact form

The form on `/contact` posts straight to Netlify Forms using
`data-netlify="true"` and a hidden `form-name` field, so no client side handler
is needed. Netlify detects the form from the prerendered HTML at deploy time,
which means it does not work on localhost. Submissions appear under **Forms** in
the Netlify dashboard.

## Assets

| File                           | Used for               |
| ------------------------------ | ---------------------- |
| `public/videos/1-1.mp4`        | Hero and story video   |
| `public/images/ice-cream.png`  | Chocolate chunk pair   |
| `public/images/ice-creamm.png` | Chocolate chunk pair   |

The original `images/` folder is left untouched; copies live in `public/`.

## Structure

```
app/
  layout.jsx      font, nav, footer, bottom bar, smooth scroll
  page.jsx        home sections
  shop/           about/            contact/
  globals.css     all styling, design tokens on :root
components/
  Hero  Story  Flavours  Craft  Contact        home sections
  PageHero  ShopGrid  AboutPanels  ContactPanel  inner pages
  Navbar  BottomBar  SiteFooter  ScrollCues  Icons
  SmoothScroll.jsx  useAutoplay.js  useReveal.js
lib/
  flavours.js     shared product catalogue
```

---

Built by [Romana Idress Ekfa](https://github.com/RomanaIdressEkfa)
