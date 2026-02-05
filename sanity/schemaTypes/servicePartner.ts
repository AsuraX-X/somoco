import type { Rule } from "sanity";

export const servicePartner = {
  name: "servicePartner",
  title: "Service Partner / Warranty Touch Point",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Channel Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Service Partner (MFS)", value: "service_partner" },
          {
            title: "Warranty Touch Point (GMFS)",
            value: "warranty_touchpoint",
          },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "vehicleTypes",
      title: "Vehicle Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "2-Wheeler (2W)", value: "2W" },
          { title: "3-Wheeler (3W)", value: "3W" },
        ],
      },
      validation: (Rule: Rule) => Rule.required().min(1),
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
      name: "zone",
      title: "Zone",
      type: "string",
    },
    {
      name: "branch",
      title: "Branch",
      type: "string",
    },
    {
      name: "address",
      title: "Location/Address",
      type: "string",
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
      name: "channelId",
      title: "Channel ID",
      type: "string",
    },
    {
      name: "bays",
      title: "Number of Bays",
      type: "number",
    },
    {
      name: "disabled",
      title: "Inactive",
      type: "boolean",
      description: "Mark as inactive to hide from website",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "name",
      towns: "towns",
      regions: "regions",
      vehicleTypes: "vehicleTypes",
    },
  },
};
