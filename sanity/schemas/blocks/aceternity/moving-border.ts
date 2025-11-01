import { defineField, defineType } from "sanity";
import { Move } from "lucide-react";

export default defineType({
  name: "aceternity.moving-border",
  title: "Moving Border Button",
  type: "object",
  icon: Move,
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
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
      group: "content",
    }),
    defineField({
      name: "duration",
      title: "Animation Duration",
      type: "number",
      description: "Duration in milliseconds",
      initialValue: 3000,
      validation: (Rule) => Rule.min(1000).max(10000),
      group: "settings",
    }),
    defineField({
      name: "borderRadius",
      title: "Border Radius",
      type: "string",
      description: "CSS border radius (e.g., '1.75rem', '50%')",
      initialValue: "1.75rem",
      group: "style",
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
    select: { title: "title", buttonText: "buttonText" },
    prepare({ title, buttonText }) {
      return {
        title: title || buttonText || "Moving Border Button",
        subtitle: "Animated Border Button",
        media: Move,
      };
    },
  },
});
