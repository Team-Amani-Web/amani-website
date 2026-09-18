import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image",
      description: "PNG or SVG with a transparent background works best." }),
    defineField({
      name: "tier", title: "Tier", type: "string",
      options: { list: ["Principal", "Technical", "Supporting"], layout: "radio" },
      initialValue: "Supporting", validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "Website", type: "url" }),
    defineField({ name: "blurb", title: "What they provide", type: "string" }),
    defineField({ name: "active", title: "Currently a partner", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "tier", media: "logo" } },
});
