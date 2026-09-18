/**
 * Content layer.
 *
 * Every page asks this file for content. It tries Sanity first and falls back
 * to the JSON seed files in src/data/ when Sanity has nothing yet — so the
 * site always builds, whether or not content has been entered.
 *
 * Once real content is in Sanity, the JSON files stop being used.
 */
import { query, urlFor } from "./sanity";
import seedRiders from "../data/riders.json";
import seedStories from "../data/stories.json";
import seedRaces from "../data/races.json";
import seedProgrammes from "../data/programmes.json";
import seedPartners from "../data/partners.json";
import seedSettings from "../data/settings.json";

const PLACEHOLDER = {
  rider: "/assets/img/placeholder-rider.svg",
  story: "/assets/img/placeholder-story.svg",
  feature: "/assets/img/placeholder-feature.svg",
};

/** Each query runs once per build, not once per page. */
const cache = new Map<string, Promise<any>>();
function once<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key) as Promise<T>;
}

export function getRiders() {
  return once("riders", async () => {
    const docs = await query<any[]>(
      `*[_type == "rider" && active == true] | order(order asc, name asc){
        name, "slug": slug.current, nation, flag, squad, role, born, joined,
        bio, palmares, instagram, photo
      }`,
      [],
    );
    if (!docs.length) return seedRiders as any[];
    return docs.map((r) => ({
      ...r,
      photo: urlFor(r.photo, 900) ?? PLACEHOLDER.rider,
      palmares: r.palmares ?? [],
    }));
  });
}

export function getStories() {
  return once("stories", async () => {
    const docs = await query<any[]>(
      `*[_type == "story" && status == "published"] | order(date desc){
        title, "slug": slug.current, category, status, date, author, readtime,
        featured, excerpt, image, body
      }`,
      [],
    );
    if (!docs.length) return seedStories.filter((s) => s.status === "published") as any[];
    return docs.map((s) => ({
      ...s,
      image: urlFor(s.image, 1400) ?? PLACEHOLDER.story,
      readtime: s.readtime ?? 5,
    }));
  });
}

export function getRaces() {
  return once("races", async () => {
    const docs = await query<any[]>(
      `*[_type == "race"] | order(startDate desc){
        name, "slug": slug.current, kind, eyebrow, dates, location, category,
        status, summary, externalUrl, linkLabel, image
      }`,
      [],
    );
    if (!docs.length) return seedRaces as any[];
    return docs.map((r) => ({ ...r, image: urlFor(r.image, 1400) ?? PLACEHOLDER.feature }));
  });
}

export function getProgrammes() {
  return once("programmes", async () => {
    const docs = await query<any[]>(
      `*[_type == "programme"] | order(order asc){
        title, "slug": slug.current, eyebrow, summary, body, image
      }`,
      [],
    );
    if (!docs.length) return seedProgrammes as any[];
    return docs.map((p) => ({ ...p, image: urlFor(p.image, 1400) ?? PLACEHOLDER.feature }));
  });
}

export function getPartners() {
  return once("partners", async () => {
    const docs = await query<any[]>(
      `*[_type == "partner" && active == true] | order(order asc, name asc){
        name, tier, url, blurb, logo
      }`,
      [],
    );
    if (!docs.length) return seedPartners as any[];
    return docs.map((p) => ({ ...p, logo: urlFor(p.logo, 400) }));
  });
}

export function getSettings() {
  return once("settings", async () => {
    const doc = await query<any>(`*[_type == "settings"][0]`, null);
    if (!doc) return seedSettings as any;
    return {
      ...seedSettings,
      ...doc,
      social: {
        instagram: doc.instagram ?? seedSettings.social.instagram,
        twitter: doc.twitter ?? seedSettings.social.twitter,
        youtube: doc.youtube ?? seedSettings.social.youtube,
      },
      ticker: doc.ticker?.length ? doc.ticker : seedSettings.ticker,
    };
  });
}
