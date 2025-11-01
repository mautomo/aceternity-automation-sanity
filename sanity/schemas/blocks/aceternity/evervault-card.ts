import { defineField, defineType } from "sanity";
import { CreditCard } from "lucide-react";

export default defineType({
  name: "aceternity-evervault-card",
  title: "Evervault Card",
  type: "object",
  icon: CreditCard,
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
      description: "For organization only (not displayed)",
      group: "content",
    }),
    defineField({
      name: "text",
      title: "Card Text",
      type: "string",
      description: "Text displayed in the center of the card",
      initialValue: "Hover me",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description text below the card",
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
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Evervault Card",
        subtitle: "Encrypted hover card with gradient effect",
        media: CreditCard,
      };
    },
  },
});
