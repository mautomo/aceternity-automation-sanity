import { defineField, defineType } from "sanity";
import { Grid3x3 } from "lucide-react";

export default defineType({
  name: "aceternity.bento-grid",
  title: "Bento Grid",
  type: "object",
  icon: Grid3x3,
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
      title: "Grid Items",
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
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name",
            },
            {
              name: "className",
              title: "Grid Span Class",
              type: "string",
              description: "e.g., 'md:col-span-2', 'md:row-span-2'",
            },
            {
              name: "header",
              title: "Header Image",
              type: "image",
            },
          ],
          preview: {
            select: { title: "title", description: "description" },
            prepare({ title, description }) {
              return {
                title,
                subtitle: description ? description.substring(0, 50) : "",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
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
        title: title || "Bento Grid",
        subtitle: items ? `${items.length} items` : "Grid Layout",
        media: Grid3x3,
      };
    },
  },
});
