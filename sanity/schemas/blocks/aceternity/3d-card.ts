import { defineField, defineType } from "sanity";
import { Box } from "lucide-react";

export default defineType({
  name: "aceternity.3d-card",
  title: "3D Card",
  type: "object",
  icon: Box,
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
      name: "image",
      title: "Card Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
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
    select: { title: "title", description: "description", media: "image" },
    prepare({ title, description, media }) {
      return {
        title,
        subtitle: description ? description.substring(0, 50) : "3D Card Effect",
        media,
      };
    },
  },
});
