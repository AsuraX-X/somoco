// Centralized GROQ queries for the project
// Keep queries here so they can be reused across components and pages.

export const ALL_VEHICLES = `*[_type == "vehicle" && disabled != true] | order(coalesce(ranking, 9999) asc, name asc){ _id, name, ranking, "image": images[1], engine, horsepower, headerImage1, headerImage2, type }`;

export const VEHICLE_PREVIEW_LIST = `*[_type == "vehicle" && disabled != true] | order(coalesce(ranking, 9999) asc, name asc){ _id, name, ranking, "slug": slug.current, "image": images[1] }`;

// Fetch a single vehicle by _id. Pass {"id": "<docId>"} as params.
export const VEHICLE_BY_ID = `*[_type == "vehicle" && _id == $id && disabled != true][0]{
  _id,
  name,
  slug,
  description,
  capacity,
  torque,
  horsepower,
  engine,
  technicalFeatures,
  gallery,
  images,
  headerImage1,
  headerImage2
}`;

// Fetch a single vehicle by slug. Pass {"slug": "the-slug"} as params.
export const VEHICLE_BY_SLUG = `*[_type == "vehicle" && slug.current == $slug && disabled != true][0]{
  _id,
  name,
  slug,
  description,
  capacity,
  torque,
  horsepower,
  engine,
  technicalFeatures,
  gallery,
  images,
  headerImage1,
  headerImage2
}`;

// Lightweight list used for components like the homepage carousel (first image + basic fields)
// Order by `ranking` ascending so lower numbers appear first, use `name` as a tiebreaker.
export const VEHICLES_FOR_CAROUSEL = `*[_type == "vehicle" && disabled != true] | order(ranking asc, name asc){ _id, name, ranking, "image": images[1], engine, horsepower, type }`;

// Latest 3 vehicles (fallback instead of sample()). Use when sample() is unsupported.
export const LATEST_3_VEHICLES = `*[_type == "vehicle" && disabled != true] | order(_createdAt desc)[0...3]{ _id, name, "image": images[1], engine, horsepower }`;

// Random 3 vehicles for featured products (client-side random selection)
export const ALL_VEHICLES_FOR_RANDOM = `*[_type == "vehicle" && disabled != true]{ _id, name, ranking, "image": images[1], engine, horsepower }`;

// Lightweight list used for the tyres carousel. Includes brand and sizes and a single image.
export const TYRES_FOR_CAROUSEL = `*[_type == "tyres" && disabled != true] | order(coalesce(ranking, 9999) asc, brand asc){ _id, name, brand, ranking, "image": images[0], sizes }`;

// Fetch a single tyre by _id. Pass {"id": "<docId>"} as params.
export const TYRE_BY_ID = `*[_type == "tyres" && _id == $id && disabled != true][0]{
  _id,
  name,
  brand,
  description,
  sizes,
  features,
  gallery,
  images,
  headerImage1,
  headerImage2
}`;

// All tyres for product listing
export const ALL_TYRES = `*[_type == "tyres" && disabled != true] | order(coalesce(ranking, 9999) asc, brand asc, name asc){ _id, name, brand, ranking, "image": images[0], sizes }`;

// All batteries for product listing
export const ALL_BATTERIES = `*[_type == "battery"] | order(brand asc, name asc){ _id, name, brand, image }`;

// Fetch a single battery by _id. Pass {"id": "<docId>"} as params.
export const BATTERY_BY_ID = `*[_type == "battery" && _id == $id][0]{
  _id,
  name,
  brand,
  image,
  features
}`;

// All dealers and service partners
export const ALL_DEALERS = `*[(_type == "dealer" || _type == "servicePartner") && disabled != true] | order(name asc){ _id, _type, name, type, regions, towns, contactNumbers, vehicleTypes }`;

// Get unique regions from all locations (flattens the arrays)
export const DEALER_REGIONS = `array::unique(*[(_type == "dealer" || _type == "servicePartner") && disabled != true].regions[]) | order(@)`;

// Get towns for a specific region. Pass {"region": "regionName"} as params.
export const DEALER_TOWNS_BY_REGION = `array::unique(*[(_type == "dealer" || _type == "servicePartner") && $region in regions[] && disabled != true].towns[]) | order(@)`;

// Get dealers/service partners filtered by region and/or town. Pass {"region": "regionName", "town": "townName"} as params.
export const DEALERS_BY_LOCATION = `*[(_type == "dealer" || _type == "servicePartner") && $region in regions[] && $town in towns[] && disabled != true] | order(type asc, name asc){ _id, _type, name, type, regions, towns, contactNumber, vehicleTypes }`;

const queries = {
  ALL_VEHICLES,
  VEHICLE_PREVIEW_LIST,
  VEHICLE_BY_ID,
  VEHICLE_BY_SLUG,
  VEHICLES_FOR_CAROUSEL,
  TYRES_FOR_CAROUSEL,
  TYRE_BY_ID,
  ALL_TYRES,
  ALL_BATTERIES,
  BATTERY_BY_ID,
  LATEST_3_VEHICLES,
  ALL_DEALERS,
  DEALER_REGIONS,
  DEALER_TOWNS_BY_REGION,
  DEALERS_BY_LOCATION,
};

export default queries;
