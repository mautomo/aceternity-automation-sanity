import { defineField, defineType } from "sanity";
import { Image as ImageIcon } from "lucide-react";

export default defineType({
  name: "aceternity.parallax-scroll",
  title: "Parallax Scroll Gallery",
  type: "object",
  icon: ImageIcon,
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
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(9),
      description: "Minimum 9 images recommended for best effect",
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
    select: { title: "title", images: "images" },
    prepare({ title, images }) {
      return {
        title: title || "Parallax Scroll Gallery",
        subtitle: images ? `${images.length} images` : "Image Gallery",
        media: ImageIcon,
      };
    },
  },
});
