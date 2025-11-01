import { defineField, defineType } from "sanity";
import { Dock } from "lucide-react";

export default defineType({
  name: "aceternity.floating-dock",
  title: "Floating Dock",
  type: "object",
  icon: Dock,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For organization only",
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Dock Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name (e.g., 'Home', 'User', 'Mail')",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "title", href: "href" },
            prepare({ title, href }) {
              return { title, subtitle: href };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(8),
      group: "content",
    }),
    defineField({
      name: "colorVariant",
      title: "Background Color",
      type: "color-variant",
      initialValue: "background",
      group: "style",
    }),
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "section-padding",
      group: "style",
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "Floating Dock",
        subtitle: items ? `${items.length} items` : "Navigation",
        media: Dock,
      };
    },
  },
});
