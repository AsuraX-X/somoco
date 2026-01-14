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

const queries = {
  ALL_VEHICLES,
  VEHICLE_PREVIEW_LIST,
  VEHICLE_BY_ID,
  VEHICLE_BY_SLUG,
  VEHICLES_FOR_CAROUSEL,
  LATEST_3_VEHICLES,
};

export default queries;
