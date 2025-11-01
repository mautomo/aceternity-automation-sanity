import { defineField, defineType } from "sanity";
import { Spotlight as SpotlightIcon } from "lucide-react";

export default defineType({
  name: "aceternity.spotlight",
  title: "Spotlight",
  type: "object",
  icon: SpotlightIcon,
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
      name: "fill",
      title: "Spotlight Fill Color",
      type: "string",
      description: "CSS color for the spotlight (e.g., 'white', '#00d71c')",
      initialValue: "white",
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
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Spotlight",
        subtitle: "Aceternity Background Effect",
        media: SpotlightIcon,
      };
    },
  },
});
