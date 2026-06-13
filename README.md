# Website Builder Nish

A clean, professional static website for a web design and online business setup service targeting Australian small businesses, tradies and ecommerce brands.

## Files

```
index.html      — Main HTML (all sections)
styles.css      — Full CSS (tokens, layout, components, responsive)
script.js       — Mobile menu, FAQ accordion, scroll behaviour
dist/           — Production-ready static assets deployed by Cloudflare Workers
src/index.js    — Minimal Worker entry that serves the static assets
wrangler.jsonc  — Cloudflare Workers deployment config
assets/
  favicon.svg   — Teal "N" icon
```

## Sections

1. Sticky header with mobile hamburger menu
2. Dark hero with proof points
3. Trust strip (4 columns)
4. Services grid (6 cards)
5. Portfolio / example work (3 CSS wireframe previews)
6. Pricing packages (4 tiers)
7. 4-step process
8. CTA banner
9. FAQ accordion
10. Contact form + details
11. Footer

## Deployment

Works on static hosts, but this repo is set up for Cloudflare Workers git deployments.

- Root source files (`index.html`, `styles.css`, `script.js`, etc.) are the editable source of truth.
- `dist/` is the committed deployment artifact used by Cloudflare Workers.
- Regenerate `dist/` after source changes with:

```bash
node scripts/build-dist.mjs
```

- Wrangler config is in `wrangler.jsonc`.

For Cloudflare Workers git deployments, the deploy command can be:

```bash
npx wrangler deploy
```

If you want the deployment command itself to rebuild `dist/` first, use:

```bash
npm run deploy
```

- **Netlify Drop** — Drag the folder to https://app.netlify.com/drop
- **GitHub Pages** — Push to a repo, enable Pages from Settings
- **Vercel** — `vercel --prod` or drag-and-drop deploy
- **Cloudflare Pages** — Connect your GitHub repo

## Customise

### Brand name
Search and replace `Website Builder Nish` across all files.

### Contact details
- Email: `upnishadd@gmail.com`
- Phone: `+61 432 451 884`

### Pricing
Edit the `<strong>` values inside `.pricing-card` in `index.html`.

### Colours (in `styles.css` `:root`)
- `--c-primary` — electric teal (#00B8A9)
- `--c-dark` — site background for dark sections (#0D1117)
- `--c-accent` — warm amber (#F5A623)

### Contact form backend
Currently uses `mailto:`. To connect a backend:
- **Formspree**: change `action` to `https://formspree.io/f/YOUR_ID` and `method` to `post`
- **Netlify Forms**: add `netlify` attribute to `<form>`
- **Custom API**: replace form submit with `fetch()` in `script.js`

## Next Steps

- Add real portfolio screenshots (replace CSS wireframe previews)
- Finalise business name and update throughout
- Confirm pricing and update packages
- Connect form to a backend (Formspree recommended for simplicity)
- Add Google Analytics or Plausible
- Set up Google Business Profile
