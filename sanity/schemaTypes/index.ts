import { type SchemaTypeDefinition } from "sanity";
import { vehicle } from "./vehicle";
import { blog } from "./blog";
import tyre from "./tyre";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicle, blog, tyre],
};
