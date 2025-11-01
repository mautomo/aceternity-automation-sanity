import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aceternity.sparkles",
  title: "Sparkles Effect",
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
      name: "background",
      title: "Background Color",
      type: "string",
      description: "CSS color value (e.g., '#0d47a1', 'transparent')",
      initialValue: "transparent",
      group: "style",
    }),
    defineField({
      name: "particleColor",
      title: "Particle Color",
      type: "string",
      description: "CSS color for particles",
      initialValue: "#ffffff",
      group: "style",
    }),
    defineField({
      name: "minSize",
      title: "Minimum Particle Size",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(10),
      group: "settings",
    }),
    defineField({
      name: "maxSize",
      title: "Maximum Particle Size",
      type: "number",
      initialValue: 3,
      validation: (Rule) => Rule.min(0.1).max(10),
      group: "settings",
    }),
    defineField({
      name: "speed",
      title: "Animation Speed",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(10),
      group: "settings",
    }),
    defineField({
      name: "particleDensity",
      title: "Particle Density",
      type: "number",
      initialValue: 120,
      validation: (Rule) => Rule.min(10).max(500),
      group: "settings",
    }),
    defineField({
      name: "colorVariant",
      title: "Section Background",
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
        title: title || "Sparkles Effect",
        subtitle: "Aceternity Background Effect",
        media: Sparkles,
      };
    },
  },
});
