import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "aceternity.card-stack",
  title: "Card Stack",
  type: "object",
  icon: Layers,
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
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "designation",
              title: "Designation",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Content",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { name: "name", designation: "designation" },
            prepare({ name, designation }) {
              return { title: name, subtitle: designation };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
      group: "content",
    }),
    defineField({
      name: "offset",
      title: "Card Offset",
      type: "number",
      description: "Vertical offset between cards in pixels",
      initialValue: 10,
      group: "settings",
    }),
    defineField({
      name: "scaleFactor",
      title: "Scale Factor",
      type: "number",
      description: "Scale reduction per card (0.01-0.1)",
      initialValue: 0.06,
      validation: (Rule) => Rule.min(0.01).max(0.1),
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
        title: title || "Card Stack",
        subtitle: items ? `${items.length} cards` : "Animated Stack",
        media: Layers,
      };
    },
  },
});
