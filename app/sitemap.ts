import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const SITE_URL = "https://www.somocoghana.com";

type SanityDoc = {
  _id: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vehicles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tyres`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/batteries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/spare-parts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/partners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  let vehicles: SanityDoc[] = [];
  let tyres: SanityDoc[] = [];
  let batteries: SanityDoc[] = [];
  let blogs: SanityDoc[] = [];

  try {
    [vehicles, tyres, batteries, blogs] = await Promise.all([
      client.fetch<SanityDoc[]>(
        `*[_type == "vehicle" && disabled != true]{ _id, _updatedAt }`
      ),
      client.fetch<SanityDoc[]>(
        `*[_type == "tyres" && disabled != true]{ _id, _updatedAt }`
      ),
      client.fetch<SanityDoc[]>(
        `*[_type == "battery"]{ _id, _updatedAt }`
      ),
      client.fetch<SanityDoc[]>(
        `*[_type == "blog"]{ _id, _updatedAt }`
      ),
    ]);
  } catch (err) {
    console.error("sitemap: failed to fetch dynamic routes from Sanity", err);
  }

  const vehicleRoutes: MetadataRoute.Sitemap = (vehicles ?? []).map((v) => ({
    url: `${SITE_URL}/vehicles/${v._id}`,
    lastModified: v._updatedAt ? new Date(v._updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tyreRoutes: MetadataRoute.Sitemap = (tyres ?? []).map((t) => ({
    url: `${SITE_URL}/tyres/${t._id}`,
    lastModified: t._updatedAt ? new Date(t._updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const batteryRoutes: MetadataRoute.Sitemap = (batteries ?? []).map((b) => ({
    url: `${SITE_URL}/batteries/${b._id}`,
    lastModified: b._updatedAt ? new Date(b._updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${SITE_URL}/blogs/${b._id}`,
    lastModified: b._updatedAt ? new Date(b._updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...vehicleRoutes,
    ...tyreRoutes,
    ...batteryRoutes,
    ...blogRoutes,
  ];
}
