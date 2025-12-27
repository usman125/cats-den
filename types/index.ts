import type { StructuredTextDocument } from "react-datocms";

// Re-export for convenience
export type { StructuredTextDocument };

// DatoCMS Image types
export interface KittenImage {
  url: string;
  alt: string | null;
  width: number;
  height: number;
}

// For responsive images (when using responsiveImage in queries)
export interface ResponsiveImage {
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  alt: string | null;
  title: string | null;
  base64: string;
}

// Characteristics can come as array or as JSON object with nested array
export type CharacteristicsField = string[] | { characteristics: string[] } | null;

export interface Breed {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: KittenImage | null;
  characteristics: CharacteristicsField;
}

// Helper function to extract characteristics array
export function getCharacteristics(characteristics: CharacteristicsField): string[] {
  if (!characteristics) return [];
  if (Array.isArray(characteristics)) return characteristics;
  if (characteristics.characteristics) return characteristics.characteristics;
  return [];
}

export interface Kitten {
  id: string;
  name: string;
  slug: string;
  breed: Breed;
  price: number;
  age: string;
  gender: "male" | "female";
  description: string;
  thumbnail: KittenImage | null;
  images: KittenImage[];
  availability: "available" | "reserved" | "sold";
  featured: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  createdAt: string;
}

// SEO Meta Tag from DatoCMS
export interface SeoMetaTag {
  tag: string;
  attributes?: Record<string, string>;
  content?: string;
}

// SEO Field from DatoCMS
export interface SeoField {
  title?: string;
  description?: string;
  image?: {
    url: string;
  };
  twitterCard?: string;
}

// Page types (from DatoCMS)
export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: {
    value: StructuredTextDocument;
  } | null;
  _seoMetaTags?: SeoMetaTag[];
  seo?: SeoField | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: {
    value: StructuredTextDocument;
  } | null;
  featuredImage: KittenImage | null;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  quote: string;
  rating: number;
  kittenPurchased?: string;
  customerImage?: KittenImage;
}

// User types (MongoDB)
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  addresses: Address[];
  wishlist: string[]; // kitten IDs
  createdAt: Date;
  updatedAt: Date;
}

// Cart types
export interface CartItem {
  kittenId: string;
  kitten: Kitten;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  updatedAt: Date;
}

// Order types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  kittenId: string;
  kittenName: string;
  kittenBreed: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentIntentId?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter types
export interface KittenFilters {
  breed?: string;
  gender?: "male" | "female";
  minPrice?: number;
  maxPrice?: number;
  availability?: "available" | "reserved" | "sold";
  featured?: boolean;
  search?: string;
}





