import { defineField, defineType } from "sanity";
import { Terminal } from "lucide-react";

export default defineType({
  name: "aceternity.typewriter-effect",
  title: "Typewriter Effect",
  type: "object",
  icon: Terminal,
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
      name: "words",
      title: "Words to Type",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "className",
              title: "Text Class Name",
              type: "string",
              description: "Optional Tailwind classes for this word",
            },
          ],
          preview: {
            select: { text: "text" },
            prepare({ text }) {
              return { title: text };
            },
          },
        },
      ],
      description: "Words that will be typed out with the typewriter effect",
      validation: (Rule) => Rule.required().min(1),
      group: "content",
    }),
    defineField({
      name: "className",
      title: "Container Class Name",
      type: "string",
      description: "Additional Tailwind classes for container",
      group: "style",
    }),
    defineField({
      name: "cursorClassName",
      title: "Cursor Class Name",
      type: "string",
      description: "Additional Tailwind classes for cursor",
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
        title: title || "Typewriter Effect",
        subtitle: words ? `${words.length} words` : "Text Effect",
        media: Terminal,
      };
    },
  },
});
