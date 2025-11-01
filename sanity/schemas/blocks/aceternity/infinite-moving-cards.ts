import { defineField, defineType } from "sanity";
import { Repeat } from "lucide-react";

export default defineType({
  name: "aceternity.infinite-moving-cards",
  title: "Infinite Moving Cards",
  type: "object",
  icon: Repeat,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
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
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Title/Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { name: "name", title: "title" },
            prepare({ name, title }) {
              return { title: name, subtitle: title };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(4),
      group: "content",
    }),
    defineField({
      name: "direction",
      title: "Scroll Direction",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
      group: "settings",
    }),
    defineField({
      name: "speed",
      title: "Scroll Speed",
      type: "string",
      options: {
        list: [
          { title: "Fast", value: "fast" },
          { title: "Normal", value: "normal" },
          { title: "Slow", value: "slow" },
        ],
        layout: "radio",
      },
      initialValue: "fast",
      group: "settings",
    }),
    defineField({
      name: "pauseOnHover",
      title: "Pause on Hover",
      type: "boolean",
      initialValue: true,
      group: "settings",
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
        title: title || "Infinite Moving Cards",
        subtitle: items ? `${items.length} cards` : "Scrolling Cards",
        media: Repeat,
      };
    },
  },
});
