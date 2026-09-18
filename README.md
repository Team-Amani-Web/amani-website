# Team AMANI — website

Astro static site. Deployed to Netlify from this repo: every push to `main`
rebuilds and publishes.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## How content works

Content lives in `src/data/*.json`. Pages are generated from it at build time —
add a rider to `riders.json` and `/riders/<slug>/` appears on the next build.

| File | Drives |
|---|---|
| `riders.json` | `/team/`, `/riders/<slug>/`, homepage squad, the rider and nation counts |
| `stories.json` | `/stories/`, `/stories/<slug>/`, homepage feed and cover story |
| `races.json` | `/races/`, `/races/<slug>/` |
| `programmes.json` | `/amani-house/`, `/spoke-academy/`, `/black-mamba/` |
| `partners.json` | `/partners/` |
| `shop.json` | `/shop/` |
| `settings.json` | Site title, description, social links, ticker |

These JSON files are the step before a CMS. When Sanity is connected, the
page templates stay as they are — only the data source changes.

## Status

Prototype for review. Not production.

- `public/admin-a7f3c9.html` — **demo only.** The login is hardcoded and data
  is stored in the browser's localStorage. Nothing is saved to a server and
  nothing is shared between devices. It shows what the CMS will feel like.
- `public/assets/img/placeholder-*.svg` — stand-ins. Real photography to follow.
- `public/robots.txt` blocks search engines while the site is in progress.
  **Remove that before launch.**
- Homepage copy, story bodies and programme text are placeholders.

## Missing

- `public/assets/img/logo-white.png` — referenced by the nav and hero.
  Drop the real file in or both render empty.

## Next

1. Real photography, replacing the placeholder SVGs
2. Sanity schemas matching the admin mockup's sections
3. Shopify Storefront API in `src/pages/shop/index.astro` — the product
   fields already use Shopify's names, so only `getProducts()` changes

---

## Sanity CMS

Project `vufb5el5`, dataset `production`. The editing interface is part of this
site: **`/studio/`**.

### How content flows

`src/lib/content.ts` is the only place that fetches content. Every page calls it.
It queries Sanity first and falls back to the JSON in `src/data/` if Sanity has
nothing — so the site always builds, and nothing breaks while content is being
entered.

Once a document type has content in Sanity, its JSON seed stops being used.

### One-off: load the seed content into Sanity

```bash
SANITY_WRITE_TOKEN=xxx npm run seed
```

Create the token at sanity.io/manage → API → Tokens, with **Editor** permission.
It is a secret: put it in Bitwarden, never in the repo. Safe to re-run — it
updates rather than duplicates. Images aren't uploaded; add those in the Studio.

### Inviting people

sanity.io/manage → Members → Invite. They sign in with Google, GitHub or email —
no account needed in advance. The free plan includes 20 seats, and viewers
(read-only) are free.

### Publishing triggers a rebuild

Sanity → Manage → API → Webhooks. Point it at the build hook from
Netlify → Site configuration → Build & deploy → Build hooks. Without this,
edits save in Sanity but the site won't rebuild until the next push.
