import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aceternity.dotted-glow-background",
  title: "Dotted Glow Background",
  type: "object",
  icon: Sparkles,
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
      description: "For organization only, not displayed",
      group: "content",
    }),
    defineField({
      name: "gap",
      title: "Gap Between Dots",
      type: "number",
      description: "Distance between dot centers in pixels",
      initialValue: 12,
      validation: (Rule) => Rule.min(1).max(50),
      group: "settings",
    }),
    defineField({
      name: "radius",
      title: "Dot Radius",
      type: "number",
      description: "Base radius of each dot in pixels",
      initialValue: 2,
      validation: (Rule) => Rule.min(1).max(10),
      group: "settings",
    }),
    defineField({
      name: "opacity",
      title: "Global Opacity",
      type: "number",
      description: "Overall opacity of the effect (0-1)",
      initialValue: 0.6,
      validation: (Rule) => Rule.min(0).max(1),
      group: "style",
    }),
    defineField({
      name: "speedMin",
      title: "Minimum Speed",
      type: "number",
      description: "Minimum animation speed in rad/s",
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(5),
      group: "settings",
    }),
    defineField({
      name: "speedMax",
      title: "Maximum Speed",
      type: "number",
      description: "Maximum animation speed in rad/s",
      initialValue: 1.3,
      validation: (Rule) => Rule.min(0).max(5),
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
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Dotted Glow Background",
        subtitle: "Aceternity Background Effect",
        media: Sparkles,
      };
    },
  },
});
