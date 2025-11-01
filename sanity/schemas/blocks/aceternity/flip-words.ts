import { defineField, defineType } from "sanity";
import { Type } from "lucide-react";

export default defineType({
  name: "aceternity.flip-words",
  title: "Flip Words Effect",
  type: "object",
  icon: Type,
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
      name: "words",
      title: "Words to Flip",
      type: "array",
      of: [{ type: "string" }],
      description: "Words that will animate and flip through",
      validation: (Rule) => Rule.required().min(2),
      group: "content",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "number",
      description: "Time in milliseconds between word transitions",
      initialValue: 3000,
      validation: (Rule) => Rule.min(500).max(10000),
      group: "settings",
    }),
    defineField({
      name: "textClassName",
      title: "Text Class Name",
      type: "string",
      description: "Additional Tailwind classes for text styling",
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
    select: { title: "title", words: "words" },
    prepare({ title, words }) {
      return {
        title: title || "Flip Words Effect",
        subtitle: words ? `${words.length} words` : "Text Effect",
        media: Type,
      };
    },
  },
});
