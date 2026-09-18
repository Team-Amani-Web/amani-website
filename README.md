# Team AMANI — website

Static demo site. Hosted on Netlify, deployed from this repo.

## Status

Prototype for review. Not production.

- `index.html` — homepage (single scrolling page)
- `admin.html` — **demo only.** The login is hardcoded and data is stored in
  the browser's localStorage. Nothing is saved to a server and nothing is
  shared between devices. It exists to show what the CMS will feel like.
- `assets/img/placeholder-*.svg` — stand-ins. Real photography to follow.

## Known gaps

- Nav links to `blog.html`, `team.html`, `races.html`, `amani-house.html`,
  `spoke-academy.html` and `contact.html` — these pages don't exist yet.
  `netlify.toml` redirects them to the homepage so they don't 404.
- Homepage counts (18 riders, 5 nations) are hardcoded in the markup.
- CSS is inline in `index.html` (~600 lines).

## Next

Convert to Astro so pages are generated from content, then connect a CMS
(Sanity) so non-developers can edit riders, races and stories.
