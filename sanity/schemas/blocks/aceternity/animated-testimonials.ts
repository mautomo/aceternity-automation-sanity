import { defineField, defineType } from "sanity";
import { Quote } from "lucide-react";

export default defineType({
  name: "aceternity.animated-testimonials",
  title: "Animated Testimonials",
  type: "object",
  icon: Quote,
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
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "designation",
              title: "Designation",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: "name",
              designation: "designation",
              media: "image",
            },
            prepare({ name, designation, media }) {
              return { title: name, subtitle: designation, media };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
      group: "content",
    }),
    defineField({
      name: "autoplay",
      title: "Auto Play",
      type: "boolean",
      description: "Automatically cycle through testimonials",
      initialValue: false,
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
    select: { title: "title", testimonials: "testimonials" },
    prepare({ title, testimonials }) {
      return {
        title: title || "Animated Testimonials",
        subtitle: testimonials ? `${testimonials.length} testimonials` : "Testimonials",
        media: Quote,
      };
    },
  },
});
