import { defineType, defineField } from "sanity";

export default defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "URL slug", type: "slug",
      options: { source: "title", maxLength: 96 }, validation: (r) => r.required(),
    }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Race Reports", "Team News", "Rider Profiles", "AMANI House", "Spoke Academy", "Gravel"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: ["draft", "published", "scheduled"], layout: "radio" },
      initialValue: "draft", validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Publish date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "string", initialValue: "Team AMANI" }),
    defineField({ name: "readtime", title: "Read time (minutes)", type: "number" }),
    defineField({ name: "featured", title: "Cover story", type: "boolean", initialValue: false,
      description: "Shows as the large story at the top of the homepage." }),
    defineField({ name: "image", title: "Header image", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3,
      description: "One or two sentences shown on cards and link previews.",
      validation: (r) => r.max(280) }),
    defineField({
      name: "body", title: "Body", type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true }, fields: [{ name: "caption", type: "string", title: "Caption" }] },
      ],
    }),
    defineField({ name: "riders", title: "Riders featured", type: "array",
      of: [{ type: "reference", to: [{ type: "rider" }] }] }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
