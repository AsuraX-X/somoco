import type { Rule } from "sanity";

export const vehicle = {
  name: "vehicle",
  title: "Vehicle",
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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "string",
      description: "e.g. seating capacity or load capacity",
    },
    {
      name: "torque",
      title: "Torque",
      type: "string",
      description: "e.g. 250 Nm @ 2000 rpm",
    },
    {
      name: "horsepower",
      title: "Horsepower",
      type: "string",
      description: "e.g. 300 hp",
    },
    {
      name: "engine",
      title: "Engine",
      type: "string",
      description: "Engine specification / displacement",
    },
    {
      name: "technicalFeatures",
      title: "Technical Features",
      type: "object",
      fields: [
        {
          name: "performance",
          title: "Performance",
          type: "array",
          of: [
            {
              type: "object",
              name: "performanceFeature",
              title: "Performance Feature",
              fields: [
                { name: "feature", title: "Feature", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
              preview: { select: { title: "feature", subtitle: "value" } },
            },
          ],
          description: "List of performance features and their values",
        },
        {
          name: "drivetrain",
          title: "Drivetrain",
          type: "array",
          of: [
            {
              type: "object",
              name: "drivetrainFeature",
              title: "Drivetrain Feature",
              fields: [
                { name: "feature", title: "Feature", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
              preview: { select: { title: "feature", subtitle: "value" } },
            },
          ],
          description: "List of drivetrain features and their values",
        },
        {
          name: "suspension",
          title: "Suspension",
          type: "array",
          of: [
            {
              type: "object",
              name: "suspensionFeature",
              title: "Suspension Feature",
              fields: [
                { name: "feature", title: "Feature", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
              preview: { select: { title: "feature", subtitle: "value" } },
            },
          ],
          description: "List of suspension features and their values",
        },
        {
          name: "brakes",
          title: "Brakes",
          type: "array",
          of: [
            {
              type: "object",
              name: "brakesFeature",
              title: "Brakes Feature",
              fields: [
                { name: "feature", title: "Feature", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
              preview: { select: { title: "feature", subtitle: "value" } },
            },
          ],
          description: "List of brakes features and their values",
        },
      ],
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
      title: "Vehicle Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Images of the vehicle",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
    },
  },
};

export default vehicle;
