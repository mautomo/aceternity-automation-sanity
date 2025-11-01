import { defineField, defineType } from "sanity";
import { Lightbulb } from "lucide-react";

export default defineType({
  name: "aceternity.lamp",
  title: "Lamp Hero Effect",
  type: "object",
  icon: Lightbulb,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "url",
      group: "content",
    }),
    defineField({
      name: "colorVariant",
      title: "Background Color",
      type: "color-variant",
      initialValue: "dark",
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
    select: { title: "title", subtitle: "subtitle" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Lamp Hero Effect",
        subtitle: subtitle || "Dramatic Hero Section",
        media: Lightbulb,
      };
    },
  },
});
