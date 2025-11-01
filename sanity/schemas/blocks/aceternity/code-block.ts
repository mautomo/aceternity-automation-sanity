import { defineField, defineType } from "sanity";
import { Code } from "lucide-react";

export default defineType({
  name: "aceternity.code-block",
  title: "Code Block",
  type: "object",
  icon: Code,
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
      name: "filename",
      title: "Filename",
      type: "string",
      description: "Displayed filename (e.g., 'example.tsx')",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      description: "Programming language for syntax highlighting",
      options: {
        list: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "JSX", value: "jsx" },
          { title: "TSX", value: "tsx" },
          { title: "Python", value: "python" },
          { title: "Bash", value: "bash" },
          { title: "JSON", value: "json" },
          { title: "CSS", value: "css" },
          { title: "HTML", value: "html" },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      description: "The code to display",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "highlightLines",
      title: "Highlight Lines",
      type: "array",
      of: [{ type: "number" }],
      description: "Line numbers to highlight (e.g., 5, 10, 15)",
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
    select: { title: "title", filename: "filename", language: "language" },
    prepare({ title, filename, language }) {
      return {
        title: title || filename || "Code Block",
        subtitle: language ? `${language} code` : "Code",
        media: Code,
      };
    },
  },
});
