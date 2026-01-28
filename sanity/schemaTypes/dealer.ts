import type { Rule } from "sanity";

export const dealer = {
  name: "dealer",
  title: "Dealer/Service Partner",
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
          { title: "Partner Dealer", value: "partner_dealer" },
          { title: "Spares Dealer", value: "spares_dealer" },
          { title: "Service Partner", value: "service_partner" },
          { title: "Warranty Touch Point", value: "warranty_touchpoint" },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "region",
      title: "Region",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "address",
      title: "Full Address",
      type: "text",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "contactNumber",
      title: "Contact Number",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) => Rule.email(),
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
      subtitle: "city",
      type: "type",
    },
  },
};
