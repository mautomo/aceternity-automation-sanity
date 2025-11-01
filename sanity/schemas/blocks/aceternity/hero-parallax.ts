import { defineField, defineType } from "sanity";
import { Layout } from "lucide-react";

export default defineType({
  name: "aceternity.hero-parallax",
  title: "Hero Parallax",
  type: "object",
  icon: Layout,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "products",
      title: "Product Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Product Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Product Link",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "thumbnail",
              title: "Thumbnail Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "title", media: "thumbnail" },
            prepare({ title, media }) {
              return { title, media };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(15).max(15),
      description: "Requires exactly 15 products for optimal display",
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
    select: { title: "title", products: "products" },
    prepare({ title, products }) {
      return {
        title: title || "Hero Parallax",
        subtitle: products ? `${products.length} products` : "Parallax Hero",
        media: Layout,
      };
    },
  },
});
