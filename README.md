# Night Bright — Website

Marketing & booking site for **Night Bright**, a mobile headlight restoration service in Eastlake / Chula Vista, CA.
**Clear Lights, Safer Nights** — Bringing clarity back to your drive.

It's a fast, mobile-first **static site** — plain HTML, CSS, and vanilla JavaScript, with [Tailwind CSS](https://tailwindcss.com/) loaded from a CDN (no build step, nothing to compile).

---

## 📂 Project structure

```
night-bright/
├── index.html          ← the entire page (all sections live here)
├── css/
│   └── styles.css       ← brand colors + the gold "glow/starburst" motif,
│                          the before/after slider, and animations
├── js/
│   └── main.js          ← scroll animations, mobile menu,
│                          sticky-header behavior
├── assets/
│   ├── logo.png         ← your logo
│   └── before-after.jpg ← side-by-side restoration photo (after left / before right)
├── vercel.json          ← small config for clean URLs + caching on Vercel
├── .gitignore
└── README.md            ← you're reading it
```

**Why it's split up:** keeping HTML, CSS, and JS in separate files makes the
project easy to read, edit, and grow. The content (text/sections) is in
`index.html`; how it *looks* is in `css/styles.css`; how it *behaves* is in
`js/main.js`.

---

## ▶️ Run it locally

It's just files — you can **double-click `index.html`** to open it in a browser.

For the most accurate preview (some browsers treat local files strictly),
run a tiny local server instead:

```bash
# Option 1: Python (already on most machines)
python -m http.server 8000
# then open http://localhost:8000

# Option 2: Node, if you have it
npx serve
```

---

## 🚀 Deploy to Vercel

This is a zero-config static site, so Vercel just works:

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Framework preset: **Other** (or "No framework"). Build command: *none*. Output dir: *leave default* (`.`).
4. Click **Deploy**. Done.

Every `git push` after that redeploys automatically.

> Tip: connect your custom domain (e.g. `nightbrightsd.com`) under
> **Project → Settings → Domains**, then update the `canonical`/Open Graph
> URLs in `index.html`.

---

## ✅ Things to finish before launch (search the code for `[TODO]`)

Every placeholder is tagged with a `[TODO]` comment so it's easy to find.
Open `index.html` and search (Ctrl/Cmd + F) for `[TODO]`. The big ones:

| What | Where | Notes |
|------|-------|-------|
| **Reviews** | Testimonials section | Replace `[TODO Name]`/`[TODO City]` and the quotes. |
| **Email** | Footer + JSON-LD | Confirm `nightbrightsd@gmail.com` (marked as possibly temporary). |
| **More social links** | Footer | Instagram is live. Facebook & Yelp are commented out — add the URL and uncomment when ready. |
| **Domain + share image** | `<head>` of `index.html` | Update `canonical`/`og:url` and swap in a 1200×630 social share image. |
| **Map coordinates** | JSON-LD in `<head>` | Fine-tune `latitude`/`longitude` near your base. |

---

## 🎨 Brand quick reference

Colors are defined once as CSS variables in `css/styles.css` **and** mapped to
Tailwind class names in `index.html`. Use the class names in your markup:

| Class | Color | Use |
|-------|-------|-----|
| `bg-ink` / `text-paper` | near-black / off-white | page background / text |
| `bg-crimson` | `#C8102E` | primary buttons (Book Now) |
| `text-gold` / `text-gold-bright` | `#E6B450` / `#FFD479` | accents, the headlight glow |
| `bg-surface` | `#141416` | cards & alternating sections |

Fonts: **Sora** for headlines (`font-display`), **Inter** for body (`font-body`).

---

## ♿ Built-in quality

- Mobile-first, responsive down to small phones.
- Semantic HTML, alt text, visible keyboard focus rings, ARIA labels on icons.
- The before/after slider works with **mouse, touch, and keyboard** (arrow keys).
- Respects **reduced-motion** preferences.
- Local SEO: title/description, Open Graph tags, and `LocalBusiness` schema.org JSON-LD.
- Click-to-call (`tel:`) and click-to-text (`sms:`) everywhere, plus a sticky
  Book/Call bar on phones.
