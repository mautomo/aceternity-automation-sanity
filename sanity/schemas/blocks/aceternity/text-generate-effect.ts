import { defineField, defineType } from "sanity";
import { Wand2 } from "lucide-react";

export default defineType({
  name: "aceternity.text-generate-effect",
  title: "Text Generate Effect",
  type: "object",
  icon: Wand2,
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
      title: "Text to Animate",
      type: "text",
      description: "The text that will animate in word by word",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "filter",
      title: "Enable Blur Filter",
      type: "boolean",
      description: "Add blur effect during animation",
      initialValue: true,
      group: "settings",
    }),
    defineField({
      name: "duration",
      title: "Animation Duration",
      type: "number",
      description: "Duration per word in seconds",
      initialValue: 0.5,
      validation: (Rule) => Rule.min(0.1).max(2),
      group: "settings",
    }),
    defineField({
      name: "className",
      title: "Text Class Name",
      type: "string",
      description: "Additional Tailwind classes",
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
        title: title || "Text Generate Effect",
        subtitle: words ? `${words.substring(0, 50)}...` : "Text Effect",
        media: Wand2,
      };
    },
  },
});
