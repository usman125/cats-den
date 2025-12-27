import { MetadataRoute } from "next";
import { getAllBreeds, getAllKittens, getAllBlogPosts } from "@/lib/dato";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://catsden.com";

  // Fetch dynamic content
  const [breeds, kittensData, blogData] = await Promise.all([
    getAllBreeds(),
    getAllKittens({}, 1, 100), // Get up to 100 kittens
    getAllBlogPosts(1, 100), // Get up to 100 blog posts
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/kittens`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/breeds`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/health-guarantee`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic breed pages
  const breedPages: MetadataRoute.Sitemap = breeds.map((breed) => ({
    url: `${baseUrl}/breeds/${breed.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic kitten pages
  const kittenPages: MetadataRoute.Sitemap = kittensData.items.map((kitten) => ({
    url: `${baseUrl}/kitten/${kitten.slug}`,
    lastModified: new Date(kitten.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogData.items.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...breedPages, ...kittenPages, ...blogPages];
}

