import type { Rule } from "sanity";

export const dealer = {
  name: "dealer",
  title: "Dealer",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Dealer Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Dealer Type",
      type: "string",
      options: {
        list: [
          { title: "Vehicle Partner Dealer", value: "partner_dealer" },
          {
            title: "Tyres & Batteries Dealer Partner",
            value: "tyres_batteries_dealer",
          },
          { title: "Spares Dealer", value: "spares_dealer" },
          { title: "Service Partner", value: "service_partner" },
          { title: "Warranty Touch Point", value: "warranty_touchpoint" },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "regions",
      title: "Regions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "towns",
      title: "Towns",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "contactNumbers",
      title: "Contact Numbers",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "disabled",
      title: "Disabled",
      type: "boolean",
      description: "Hide this dealer from the website",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "name",
      towns: "towns",
      regions: "regions",
    },
  },
};
