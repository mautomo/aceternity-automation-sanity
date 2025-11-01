import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aceternity.cover",
  title: "Cover Effect",
  type: "object",
  icon: Sparkles,
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
      name: "text",
      title: "Text Content",
      type: "string",
      description: "Text that will have the hover sparkle effect",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "className",
      title: "Text Class Name",
      type: "string",
      description: "Additional Tailwind classes for text",
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
    select: { title: "title", text: "text" },
    prepare({ title, text }) {
      return {
        title: title || "Cover Effect",
        subtitle: text || "Hover Sparkle Effect",
        media: Sparkles,
      };
    },
  },
});
