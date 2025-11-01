import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "aceternity.navbar-menu",
  title: "Navbar Menu",
  type: "object",
  icon: Menu,
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
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "products",
              title: "Products",
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
                      name: "description",
                      title: "Description",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "href",
                      title: "Link",
                      type: "url",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { label: "label" },
            prepare({ label }) {
              return { title: label };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
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
    select: { title: "title", menuItems: "menuItems" },
    prepare({ title, menuItems }) {
      return {
        title: title || "Navbar Menu",
        subtitle: menuItems ? `${menuItems.length} menu items` : "Navigation",
        media: Menu,
      };
    },
  },
});
