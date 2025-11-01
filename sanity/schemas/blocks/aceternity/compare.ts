import { defineField, defineType } from "sanity";
import { SplitSquareHorizontal } from "lucide-react";

export default defineType({
  name: "aceternity.compare",
  title: "Compare (Image Comparison)",
  type: "object",
  icon: SplitSquareHorizontal,
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
      name: "firstImage",
      title: "First Image (Left)",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "secondImage",
      title: "Second Image (Right)",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "initialSliderPercentage",
      title: "Initial Slider Position",
      type: "number",
      description: "Initial slider position (0-100%)",
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
      group: "settings",
    }),
    defineField({
      name: "slideMode",
      title: "Slide Mode",
      type: "string",
      options: {
        list: [
          { title: "Hover", value: "hover" },
          { title: "Drag", value: "drag" },
        ],
        layout: "radio",
      },
      initialValue: "hover",
      group: "settings",
    }),
    defineField({
      name: "showHandlebar",
      title: "Show Handlebar",
      type: "boolean",
      initialValue: true,
      group: "settings",
    }),
    defineField({
      name: "autoplay",
      title: "Auto Play",
      type: "boolean",
      description: "Automatically animate the slider",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "autoplayDuration",
      title: "Autoplay Duration",
      type: "number",
      description: "Duration in milliseconds",
      initialValue: 5000,
      hidden: ({ parent }) => !parent?.autoplay,
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
    select: { title: "title", firstImage: "firstImage" },
    prepare({ title, firstImage }) {
      return {
        title: title || "Compare Images",
        subtitle: "Image Comparison Slider",
        media: firstImage,
      };
    },
  },
});
