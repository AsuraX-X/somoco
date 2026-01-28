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

// All dealers grouped by type
export const ALL_DEALERS = `*[_type == "dealer" && disabled != true] | order(region asc, city asc, name asc){ _id, name, type, region, city, address, contactNumber, email }`;

// Get unique regions from dealers
export const DEALER_REGIONS = `array::unique(*[_type == "dealer" && disabled != true].region) | order(@)`;

// Get cities for a specific region. Pass {"region": "regionName"} as params.
export const DEALER_CITIES_BY_REGION = `array::unique(*[_type == "dealer" && _region == $region && disabled != true].city) | order(@)`;

// Get dealers filtered by region and city. Pass {"region": "regionName", "city": "cityName"} as params.
export const DEALERS_BY_LOCATION = `*[_type == "dealer" && region == $region && city == $city && disabled != true] | order(type asc, name asc){ _id, name, type, region, city, address, contactNumber, email }`;

const queries = {
  ALL_VEHICLES,
  VEHICLE_PREVIEW_LIST,
  VEHICLE_BY_ID,
  VEHICLE_BY_SLUG,
  VEHICLES_FOR_CAROUSEL,
  TYRES_FOR_CAROUSEL,
  TYRE_BY_ID,
  ALL_TYRES,
  LATEST_3_VEHICLES,
  ALL_DEALERS,
  DEALER_REGIONS,
  DEALER_CITIES_BY_REGION,
  DEALERS_BY_LOCATION,
};

export default queries;
