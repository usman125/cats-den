import { datoCMSClient, datoCMSPreviewClient } from "./client";
import {
  GET_ALL_BREEDS,
  GET_BREED_BY_SLUG,
  GET_ALL_KITTENS,
  GET_FEATURED_KITTENS,
  GET_KITTEN_BY_SLUG,
  GET_KITTENS_BY_BREED,
  GET_PAGE_BY_SLUG,
  GET_ALL_BLOG_POSTS,
  GET_BLOG_POST_BY_SLUG,
  GET_ALL_TESTIMONIALS,
  GET_HOMEPAGE_DATA,
} from "./queries";
import {
  mockBreeds,
  mockKittens,
  mockTestimonials,
  mockBlogPosts,
} from "./mock-data";
import type {
  Breed,
  Kitten,
  PageContent,
  BlogPost,
  Testimonial,
  KittenFilters,
  PaginatedResponse,
} from "@/types";

// Helper to determine if we should use mock data
const useMockData = !process.env.DATOCMS_API_TOKEN;

// Get the appropriate client based on preview mode
function getClient(preview = false) {
  return preview ? datoCMSPreviewClient : datoCMSClient;
}

// Transform DatoCMS response to our types
function transformKitten(data: Record<string, unknown>): Kitten {
  return {
    id: data.id as string,
    name: data.name as string,
    slug: data.slug as string,
    breed: data.breed as Breed,
    price: data.price as number,
    age: data.age as string,
    gender: data.gender as "male" | "female",
    description: data.description as string,
    thumbnail: data.thumbnail as Kitten["thumbnail"],
    images: data.images as Kitten["images"],
    availability: data.availability as Kitten["availability"],
    featured: data.featured as boolean,
    vaccinated: data.vaccinated as boolean,
    microchipped: data.microchipped as boolean,
    createdAt: data._createdAt as string,
  };
}

// =============================================================================
// BREED FUNCTIONS
// =============================================================================

export async function getAllBreeds(preview = false): Promise<Breed[]> {
  if (useMockData) {
    return mockBreeds;
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{ allBreeds: Breed[] }>(
      GET_ALL_BREEDS
    );
    return data.allBreeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return mockBreeds;
  }
}

export async function getBreedBySlug(slug: string, preview = false): Promise<Breed | null> {
  if (useMockData) {
    return mockBreeds.find((b) => b.slug === slug) || null;
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{ breed: Breed | null }>(
      GET_BREED_BY_SLUG,
      { slug }
    );
    return data.breed;
  } catch (error) {
    console.error("Error fetching breed:", error);
    return mockBreeds.find((b) => b.slug === slug) || null;
  }
}

// =============================================================================
// KITTEN FUNCTIONS
// =============================================================================

export async function getAllKittens(
  filters?: KittenFilters,
  page = 1,
  pageSize = 12,
  preview = false
): Promise<PaginatedResponse<Kitten>> {
  if (useMockData) {
    let filtered = [...mockKittens];

    if (filters?.breed) {
      filtered = filtered.filter((k) => k.breed.slug === filters.breed);
    }
    if (filters?.gender) {
      filtered = filtered.filter((k) => k.gender === filters.gender);
    }
    if (filters?.availability) {
      filtered = filtered.filter((k) => k.availability === filters.availability);
    }
    if (filters?.minPrice) {
      filtered = filtered.filter((k) => k.price >= filters.minPrice!);
    }
    if (filters?.maxPrice) {
      filtered = filtered.filter((k) => k.price <= filters.maxPrice!);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (k) =>
          k.name.toLowerCase().includes(search) ||
          k.breed.name.toLowerCase().includes(search) ||
          k.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  try {
    const client = getClient(preview);
    // Build DatoCMS filter
    const filter: Record<string, unknown> = {};
    
    // If filtering by breed slug, first resolve it to an ID
    if (filters?.breed) {
      const breed = await getBreedBySlug(filters.breed, preview);
      if (breed) {
        filter.breed = { eq: breed.id };
      }
    }
    if (filters?.gender) {
      filter.gender = { eq: filters.gender };
    }
    if (filters?.availability) {
      filter.availability = { eq: filters.availability };
    }

    const data = await client!.request<{
      allKittens: Record<string, unknown>[];
      _allKittensMeta: { count: number };
    }>(GET_ALL_KITTENS, {
      first: pageSize,
      skip: (page - 1) * pageSize,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    });

    return {
      items: data.allKittens.map(transformKitten),
      total: data._allKittensMeta.count,
      page,
      pageSize,
      totalPages: Math.ceil(data._allKittensMeta.count / pageSize),
    };
  } catch (error) {
    console.error("Error fetching kittens:", error);
    return {
      items: mockKittens,
      total: mockKittens.length,
      page: 1,
      pageSize: 12,
      totalPages: 1,
    };
  }
}

export async function getFeaturedKittens(limit = 6, preview = false): Promise<Kitten[]> {
  if (useMockData) {
    return mockKittens.filter((k) => k.featured).slice(0, limit);
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      allKittens: Record<string, unknown>[];
    }>(GET_FEATURED_KITTENS, { first: limit });
    return data.allKittens.map(transformKitten);
  } catch (error) {
    console.error("Error fetching featured kittens:", error);
    return mockKittens.filter((k) => k.featured).slice(0, limit);
  }
}

export async function getKittenBySlug(slug: string, preview = false): Promise<Kitten | null> {
  if (useMockData) {
    return mockKittens.find((k) => k.slug === slug) || null;
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      kitten: Record<string, unknown> | null;
    }>(GET_KITTEN_BY_SLUG, { slug });
    return data.kitten ? transformKitten(data.kitten) : null;
  } catch (error) {
    console.error("Error fetching kitten:", error);
    return mockKittens.find((k) => k.slug === slug) || null;
  }
}

export async function getKittensByBreed(
  breedId: string,
  limit = 6,
  preview = false
): Promise<Kitten[]> {
  if (useMockData) {
    return mockKittens.filter((k) => k.breed.id === breedId).slice(0, limit);
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      allKittens: Record<string, unknown>[];
    }>(GET_KITTENS_BY_BREED, { breedId, first: limit });
    return data.allKittens.map(transformKitten);
  } catch (error) {
    console.error("Error fetching kittens by breed:", error);
    return mockKittens.filter((k) => k.breed.id === breedId).slice(0, limit);
  }
}

// =============================================================================
// PAGE FUNCTIONS
// =============================================================================

export async function getPageBySlug(
  slug: string,
  preview = false
): Promise<PageContent | null> {
  if (useMockData) {
    return {
      id: slug,
      title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
      slug,
      content: null,
    };
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{ page: PageContent | null }>(
      GET_PAGE_BY_SLUG,
      { slug }
    );
    return data.page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// =============================================================================
// BLOG FUNCTIONS
// =============================================================================

export async function getAllBlogPosts(
  page = 1,
  pageSize = 10,
  preview = false
): Promise<PaginatedResponse<BlogPost>> {
  if (useMockData) {
    const total = mockBlogPosts.length;
    const start = (page - 1) * pageSize;
    const items = mockBlogPosts.slice(start, start + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      allBlogPosts: BlogPost[];
      _allBlogPostsMeta: { count: number };
    }>(GET_ALL_BLOG_POSTS, {
      first: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      items: data.allBlogPosts,
      total: data._allBlogPostsMeta.count,
      page,
      pageSize,
      totalPages: Math.ceil(data._allBlogPostsMeta.count / pageSize),
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      items: mockBlogPosts,
      total: mockBlogPosts.length,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };
  }
}

export async function getBlogPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  if (useMockData) {
    return mockBlogPosts.find((p) => p.slug === slug) || null;
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{ blogPost: BlogPost | null }>(
      GET_BLOG_POST_BY_SLUG,
      { slug }
    );
    return data.blogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return mockBlogPosts.find((p) => p.slug === slug) || null;
  }
}

// =============================================================================
// TESTIMONIAL FUNCTIONS
// =============================================================================

export async function getAllTestimonials(limit = 10, preview = false): Promise<Testimonial[]> {
  if (useMockData) {
    return mockTestimonials.slice(0, limit);
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      allTestimonials: Testimonial[];
    }>(GET_ALL_TESTIMONIALS, { first: limit });
    return data.allTestimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return mockTestimonials.slice(0, limit);
  }
}

// =============================================================================
// HOMEPAGE DATA
// =============================================================================

export async function getHomepageData(preview = false): Promise<{
  featuredKittens: Kitten[];
  breeds: Breed[];
  testimonials: Testimonial[];
}> {
  if (useMockData) {
    return {
      featuredKittens: mockKittens.filter((k) => k.featured).slice(0, 6),
      breeds: mockBreeds,
      testimonials: mockTestimonials.slice(0, 3),
    };
  }

  try {
    const client = getClient(preview);
    const data = await client!.request<{
      featuredKittens: Record<string, unknown>[];
      allBreeds: Breed[];
      allTestimonials: Testimonial[];
    }>(GET_HOMEPAGE_DATA);

    return {
      featuredKittens: data.featuredKittens.map(transformKitten),
      breeds: data.allBreeds,
      testimonials: data.allTestimonials,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      featuredKittens: mockKittens.filter((k) => k.featured).slice(0, 6),
      breeds: mockBreeds,
      testimonials: mockTestimonials.slice(0, 3),
    };
  }
}
