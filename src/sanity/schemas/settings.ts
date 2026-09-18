import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2,
      description: "Used for search results and link previews." }),
    defineField({ name: "eyebrow", title: "Hero label", type: "string" }),
    defineField({ name: "altitude", title: "AMANI House altitude (m)", type: "number" }),
    defineField({ name: "youthReached", title: "Youth reached", type: "number" }),
    defineField({ name: "subscribers", title: "Subscriber count", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
    defineField({ name: "ticker", title: "Ticker items", type: "array", of: [{ type: "string" }],
      description: "The scrolling strip under the hero." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
