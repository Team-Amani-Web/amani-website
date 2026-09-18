import { defineType, defineField } from "sanity";

export default defineType({
  name: "rider",
  title: "Rider",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "URL slug", type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "The web address for this rider. Click Generate.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "nation", title: "Nation", type: "string", validation: (r) => r.required() }),
    defineField({ name: "flag", title: "Flag emoji", type: "string", description: "e.g. 🇰🇪" }),
    defineField({
      name: "squad", title: "Squad", type: "string",
      options: { list: ["Men's Elite", "Women's Elite", "Black Mamba Development"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string", description: "e.g. Climber, Sprinter, All-rounder" }),
    defineField({ name: "born", title: "Year born", type: "string" }),
    defineField({ name: "joined", title: "Joined AMANI", type: "string" }),
    defineField({ name: "bio", title: "Biography", type: "text", rows: 6 }),
    defineField({ name: "palmares", title: "Results", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "season", title: "Season", type: "number", initialValue: 2026 }),
    defineField({ name: "active", title: "On current roster", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers appear first." }),
  ],
  preview: {
    select: { title: "name", subtitle: "squad", media: "photo" },
  },
});
