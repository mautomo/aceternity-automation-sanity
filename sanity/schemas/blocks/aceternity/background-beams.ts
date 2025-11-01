import { defineField, defineType } from "sanity";
import { Zap } from "lucide-react";

export default defineType({
  name: "aceternity.background-beams",
  title: "Background Beams",
  type: "object",
  icon: Zap,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For organization only, not displayed",
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
        title: title || "Background Beams",
        subtitle: "Aceternity Background Effect",
        media: Zap,
      };
    },
  },
});
