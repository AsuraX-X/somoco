import { type SchemaTypeDefinition } from "sanity";
import { vehicle } from "./vehicle";
import { blog } from "./blog";
import tyre from "./tyre";
import { dealer } from "./dealer";
import { servicePartner } from "./servicePartner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicle, blog, tyre, dealer, servicePartner],
};
