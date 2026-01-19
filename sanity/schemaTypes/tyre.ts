import type { Rule } from "sanity";

export const tyre = {
  name: "tyres",
  title: "Tyres",
  type: "document",
  fields: [
    {
      name: "headerImage1",
      title: "Header Image 1",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "headerImage2",
      title: "Header Image 2",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "disabled",
      title: "Disabled",
      type: "boolean",
      description: "Hide this tyre from the website",
      initialValue: false,
    },
    {
      name: "ranking",
      title: "Ranking",
      type: "number",
      description: "Display order ranking (lower numbers appear first)",
      validation: (Rule: Rule) => Rule.min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      description: "e.g. available tyre sizes",
      of: [{ type: "string" }],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            { name: "feature", title: "Feature", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: { select: { title: "feature", subtitle: "value" } },
        },
      ],
      description: "List of features and their values",
    },
    {
      name: "gallery",
      title: "Gallery (up to 4 items)",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          title: "Gallery Item",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.max(4),
    },
    {
      name: "images",
      title: "tyre Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Images of the tyre",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "brand",
      media: "headerImage1",
    },
  },
};

export default tyre;
