/**
 * One-off: copies the JSON seed content in src/data/ into Sanity.
 *
 *   SANITY_WRITE_TOKEN=xxx npm run seed
 *
 * Safe to re-run — documents use fixed IDs, so it updates rather than duplicates.
 * Images are not uploaded; add those in the Studio.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN.\nCreate one at sanity.io/manage → API → Tokens (Editor), then:\n  SANITY_WRITE_TOKEN=xxx npm run seed");
  process.exit(1);
}

const client = createClient({
  projectId: "vufb5el5",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const read = (f) => JSON.parse(readFileSync(new URL(`../src/data/${f}`, import.meta.url), "utf8"));
const slug = (s) => ({ _type: "slug", current: s });

// Plain text -> Portable Text blocks
const blocks = (html) =>
  String(html)
    .split(/<\/p>/)
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean)
    .map((text, i) => ({
      _type: "block",
      _key: `b${i}`,
      style: "normal",
      children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
    }));

const docs = [];

read("riders.json").forEach((r, i) =>
  docs.push({
    _id: `rider-${r.slug}`, _type: "rider",
    name: r.name, slug: slug(r.slug), nation: r.nation, flag: r.flag,
    squad: r.squad, role: r.role, born: r.born, joined: r.joined,
    bio: r.bio, palmares: r.palmares ?? [], instagram: r.instagram,
    season: 2026, active: true, order: i,
  }),
);

read("stories.json").forEach((s) =>
  docs.push({
    _id: `story-${s.slug}`, _type: "story",
    title: s.title, slug: slug(s.slug), category: s.category, status: s.status,
    date: s.date, author: s.author, readtime: s.readtime, featured: !!s.featured,
    excerpt: s.excerpt, body: blocks(s.body),
  }),
);

read("races.json").forEach((r) =>
  docs.push({
    _id: `race-${r.slug}`, _type: "race",
    name: r.name, slug: slug(r.slug), kind: r.kind, eyebrow: r.eyebrow,
    dates: r.dates, location: r.location, category: r.category, status: r.status,
    summary: r.summary, externalUrl: r.externalUrl || undefined, linkLabel: r.linkLabel,
  }),
);

read("programmes.json").forEach((p, i) =>
  docs.push({
    _id: `programme-${p.slug}`, _type: "programme",
    title: p.title, slug: slug(p.slug), eyebrow: p.eyebrow,
    summary: p.summary, body: blocks(p.body), order: i,
  }),
);

read("partners.json").forEach((p, i) =>
  docs.push({
    _id: `partner-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, _type: "partner",
    name: p.name, tier: p.tier, url: p.url === "#" ? undefined : p.url,
    blurb: p.blurb, active: true, order: i,
  }),
);

const s = read("settings.json");
docs.push({
  _id: "siteSettings", _type: "settings",
  siteName: s.siteName, tagline: s.tagline, description: s.description,
  eyebrow: s.eyebrow, altitude: s.altitude, youthReached: s.youthReached,
  subscribers: s.subscribers, ticker: s.ticker,
});

const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction());
await tx.commit();
console.log(`Seeded ${docs.length} documents into Sanity.`);
