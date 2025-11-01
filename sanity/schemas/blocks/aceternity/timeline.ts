import { defineField, defineType } from "sanity";
import { Clock } from "lucide-react";

export default defineType({
  name: "aceternity.timeline",
  title: "Timeline",
  type: "object",
  icon: Clock,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Timeline Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Timeline Subtitle",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "data",
      title: "Timeline Entries",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Entry Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Entry Content",
              type: "block-content",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
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
    select: { title: "title", data: "data" },
    prepare({ title, data }) {
      return {
        title: title || "Timeline",
        subtitle: data ? `${data.length} entries` : "Timeline Component",
        media: Clock,
      };
    },
  },
});
