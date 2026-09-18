import { defineType, defineField } from "sanity";

export default defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  description: "AMANI House, Spoke Academy, Black Mamba Development Squad",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug",
      options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "eyebrow", title: "Short label", type: "string" }),
    defineField({ name: "image", title: "Header image", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
});
