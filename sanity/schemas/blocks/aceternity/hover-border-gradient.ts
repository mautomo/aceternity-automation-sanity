import { defineField, defineType } from "sanity";
import { MousePointer } from "lucide-react";

export default defineType({
  name: "aceternity.hover-border-gradient",
  title: "Hover Border Gradient Button",
  type: "object",
  icon: MousePointer,
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
      description: "Duration in seconds",
      initialValue: 1,
      validation: (Rule) => Rule.min(0.5).max(5),
      group: "settings",
    }),
    defineField({
      name: "clockwise",
      title: "Clockwise Animation",
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
    select: { title: "title", buttonText: "buttonText" },
    prepare({ title, buttonText }) {
      return {
        title: title || buttonText || "Hover Border Gradient Button",
        subtitle: "Animated Border Button",
        media: MousePointer,
      };
    },
  },
});
