import { defineType, defineField } from "sanity";

export default defineType({
  name: "race",
  title: "Race",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Race name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug",
      options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: "kind", title: "Type", type: "string",
      options: {
        list: [
          { title: "An event AMANI organises", value: "organised" },
          { title: "A race the team attends", value: "attending" },
        ],
        layout: "radio",
      },
      initialValue: "attending", validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Short label", type: "string",
      description: "e.g. 4-Day Stage Race · Kenya" }),
    defineField({ name: "dates", title: "Dates", type: "string", description: "e.g. May 2026" }),
    defineField({ name: "startDate", title: "Start date", type: "date", description: "Used for sorting." }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: ["upcoming", "past"], layout: "radio" }, initialValue: "upcoming",
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "externalUrl", title: "Race website", type: "url",
      description: "The event company's own page. Update here when the link changes." }),
    defineField({ name: "linkLabel", title: "Link text", type: "string", initialValue: "Race website" }),
  ],
  preview: { select: { title: "name", subtitle: "dates", media: "image" } },
});
