import type { Rule } from "sanity";

export const battery = {
  name: "battery",
  title: "Battery",
  type: "document",
  fields: [
    {
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Battery Name",
      type: "string",
    },
    {
      name: "image",
      title: "Battery Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "details",
              title: "Feature Details",
              type: "array",
              of: [{ type: "string" }],
              description: "List of bullet points for this feature",
            },
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "brand",
      subtitle: "name",
      media: "image",
    },
  },
};
