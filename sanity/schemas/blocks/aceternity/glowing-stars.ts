import { defineField, defineType } from "sanity";
import { Star } from "lucide-react";

export default defineType({
  name: "aceternity.glowing-stars",
  title: "Glowing Stars Card",
  type: "object",
  icon: Star,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Card Description",
      type: "text",
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
    select: { title: "title", description: "description" },
    prepare({ title, description }) {
      return {
        title: title || "Glowing Stars Card",
        subtitle: description ? `${description.substring(0, 50)}...` : "Aceternity Effect",
        media: Star,
      };
    },
  },
});
