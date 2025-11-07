import { type SchemaTypeDefinition } from "sanity";
import { vehicle } from "./vehicle";
import { blog } from "./blog";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicle, blog],
};
