import { gql } from "graphql-request";

// =============================================================================
// BASE FRAGMENTS (no dependencies)
// =============================================================================

// Image fields - used inline, not as a separate fragment to avoid duplication
const IMAGE_FIELDS = `
  url
  alt
  width
  height
`;

// =============================================================================
// BREED QUERIES
// =============================================================================

export const GET_ALL_BREEDS = gql`
  query GetAllBreeds {
    allBreeds(orderBy: name_ASC) {
      id
      name
      slug
      description
      characteristics
      image {
        ${IMAGE_FIELDS}
      }
    }
  }
`;

export const GET_BREED_BY_SLUG = gql`
  query GetBreedBySlug($slug: String!) {
    breed(filter: { slug: { eq: $slug } }) {
      id
      name
      slug
      description
      characteristics
      image {
        ${IMAGE_FIELDS}
      }
    }
  }
`;

// =============================================================================
// KITTEN QUERIES
// =============================================================================

export const GET_ALL_KITTENS = gql`
  query GetAllKittens($first: IntType, $skip: IntType, $filter: KittenModelFilter) {
    allKittens(first: $first, skip: $skip, filter: $filter, orderBy: _createdAt_DESC) {
      id
      name
      slug
      price
      age
      gender
      description
      availability
      featured
      vaccinated
      microchipped
      _createdAt
      thumbnail {
        ${IMAGE_FIELDS}
      }
      images {
        ${IMAGE_FIELDS}
      }
      breed {
        id
        name
        slug
        description
        characteristics
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
    _allKittensMeta(filter: $filter) {
      count
    }
  }
`;

export const GET_FEATURED_KITTENS = gql`
  query GetFeaturedKittens($first: IntType) {
    allKittens(first: $first, filter: { featured: { eq: true } }) {
      id
      name
      slug
      price
      age
      gender
      description
      availability
      featured
      vaccinated
      microchipped
      _createdAt
      thumbnail {
        ${IMAGE_FIELDS}
      }
      images {
        ${IMAGE_FIELDS}
      }
      breed {
        id
        name
        slug
        description
        characteristics
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`;

export const GET_KITTEN_BY_SLUG = gql`
  query GetKittenBySlug($slug: String!) {
    kitten(filter: { slug: { eq: $slug } }) {
      id
      name
      slug
      price
      age
      gender
      description
      availability
      featured
      vaccinated
      microchipped
      _createdAt
      thumbnail {
        ${IMAGE_FIELDS}
      }
      images {
        ${IMAGE_FIELDS}
      }
      breed {
        id
        name
        slug
        description
        characteristics
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`;

export const GET_KITTENS_BY_BREED = gql`
  query GetKittensByBreed($breedId: ItemId!, $first: IntType) {
    allKittens(first: $first, filter: { breed: { eq: $breedId } }) {
      id
      name
      slug
      price
      age
      gender
      description
      availability
      featured
      vaccinated
      microchipped
      _createdAt
      thumbnail {
        ${IMAGE_FIELDS}
      }
      images {
        ${IMAGE_FIELDS}
      }
      breed {
        id
        name
        slug
        description
        characteristics
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`;

// =============================================================================
// PAGE QUERIES
// =============================================================================

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    page(filter: { slug: { eq: $slug } }) {
      id
      title
      slug
      content {
        value
      }
      _seoMetaTags {
        tag
        attributes
        content
      }
      seo {
        title
        description
        image {
          url
        }
        twitterCard
      }
    }
  }
`;

// =============================================================================
// BLOG QUERIES
// =============================================================================

export const GET_ALL_BLOG_POSTS = gql`
  query GetAllBlogPosts($first: IntType, $skip: IntType) {
    allBlogPosts(first: $first, skip: $skip, orderBy: _publishedAt_DESC) {
      id
      title
      slug
      excerpt
      author
      _publishedAt
      tags
      featuredImage {
        ${IMAGE_FIELDS}
      }
      content {
        value
      }
    }
    _allBlogPostsMeta {
      count
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostBySlug($slug: String!) {
    blogPost(filter: { slug: { eq: $slug } }) {
      id
      title
      slug
      excerpt
      author
      _publishedAt
      tags
      featuredImage {
        ${IMAGE_FIELDS}
      }
      content {
        value
      }
    }
  }
`;

// =============================================================================
// TESTIMONIAL QUERIES
// =============================================================================

export const GET_ALL_TESTIMONIALS = gql`
  query GetAllTestimonials($first: IntType) {
    allTestimonials(first: $first, orderBy: _createdAt_DESC) {
      id
      customerName
      quote
      rating
      kittenPurchased
      customerImage {
        ${IMAGE_FIELDS}
      }
    }
  }
`;

// =============================================================================
// HOMEPAGE QUERY (combined for efficiency)
// =============================================================================

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    featuredKittens: allKittens(
      first: 6
      filter: { featured: { eq: true } }
      orderBy: _createdAt_DESC
    ) {
      id
      name
      slug
      price
      age
      gender
      description
      availability
      featured
      vaccinated
      microchipped
      _createdAt
      thumbnail {
        ${IMAGE_FIELDS}
      }
      images {
        ${IMAGE_FIELDS}
      }
      breed {
        id
        name
        slug
        description
        characteristics
        image {
          ${IMAGE_FIELDS}
        }
      }
    }
    allBreeds(orderBy: name_ASC) {
      id
      name
      slug
      description
      characteristics
      image {
        ${IMAGE_FIELDS}
      }
    }
    allTestimonials(first: 3, orderBy: _createdAt_DESC) {
      id
      customerName
      quote
      rating
      kittenPurchased
      customerImage {
        ${IMAGE_FIELDS}
      }
    }
  }
`;
