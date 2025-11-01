import { defineField, defineType } from "sanity";
import { Waypoints } from "lucide-react";

export default defineType({
  name: "aceternity.tracing-beam",
  title: "Tracing Beam",
  type: "object",
  icon: Waypoints,
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
      name: "content",
      title: "Content",
      type: "block-content",
      description: "Rich text content that will have the tracing beam alongside",
      validation: (Rule) => Rule.required(),
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
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Tracing Beam",
        subtitle: "Animated Content Tracker",
        media: Waypoints,
      };
    },
  },
});
