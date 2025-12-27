import type { Breed, Kitten, Testimonial, BlogPost } from "@/types";

// Mock data for development when DatoCMS is not configured
export const mockBreeds: Breed[] = [
  {
    id: "1",
    name: "British Shorthair",
    slug: "british-shorthair",
    description:
      "The British Shorthair is a powerful, compact cat with a broad chest and strong legs. Known for their calm demeanor and plush coat.",
    image: {
      url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
      alt: "British Shorthair cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Calm", "Affectionate", "Independent", "Good with children"],
  },
  {
    id: "2",
    name: "Ragdoll",
    slug: "ragdoll",
    description:
      "Ragdolls are known for their docile nature and tendency to go limp when picked up. They are large, affectionate cats with striking blue eyes.",
    image: {
      url: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800",
      alt: "Ragdoll cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Gentle", "Laid-back", "Affectionate", "Great lap cat"],
  },
  {
    id: "3",
    name: "Maine Coon",
    slug: "maine-coon",
    description:
      "The Maine Coon is one of the largest domestic cat breeds, known for their intelligence, playful personality, and luxurious long coat.",
    image: {
      url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800",
      alt: "Maine Coon cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Intelligent", "Playful", "Gentle giant", "Dog-like"],
  },
  {
    id: "4",
    name: "Persian",
    slug: "persian",
    description:
      "Persian cats are known for their long, luxurious coats and sweet, gentle personalities. They are calm and make excellent indoor companions.",
    image: {
      url: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=800",
      alt: "Persian cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Sweet", "Quiet", "Gentle", "Low activity"],
  },
  {
    id: "5",
    name: "Scottish Fold",
    slug: "scottish-fold",
    description:
      "Scottish Folds are characterized by their unique folded ears. They are adaptable, affectionate cats with a sweet expression.",
    image: {
      url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
      alt: "Scottish Fold cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Adaptable", "Sweet", "Playful", "Good with other pets"],
  },
  {
    id: "6",
    name: "Bengal",
    slug: "bengal",
    description:
      "Bengals are athletic, agile cats with a wild appearance. They are highly active and intelligent, requiring lots of stimulation.",
    image: {
      url: "https://images.unsplash.com/photo-1598463166228-c0f90d180918?w=800",
      alt: "Bengal cat",
      width: 800,
      height: 600,
    },
    characteristics: ["Athletic", "Intelligent", "Curious", "Energetic"],
  },
];

export const mockKittens: Kitten[] = [
  {
    id: "k1",
    name: "Luna",
    slug: "luna-british-shorthair",
    breed: mockBreeds[0],
    price: 1500,
    age: "12 weeks",
    gender: "female",
    description:
      "Luna is a gorgeous blue British Shorthair with the most adorable round face. She loves to play and is very affectionate with her humans.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
      alt: "Luna the British Shorthair",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
        alt: "Luna the British Shorthair",
        width: 800,
        height: 600,
      },
      {
        url: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800",
        alt: "Luna playing",
        width: 800,
        height: 600,
      },
    ],
    availability: "available",
    featured: true,
    vaccinated: true,
    microchipped: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "k2",
    name: "Oliver",
    slug: "oliver-ragdoll",
    breed: mockBreeds[1],
    price: 1800,
    age: "10 weeks",
    gender: "male",
    description:
      "Oliver is a stunning blue point Ragdoll with beautiful blue eyes. He's incredibly gentle and loves being held.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800",
      alt: "Oliver the Ragdoll",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800",
        alt: "Oliver the Ragdoll",
        width: 800,
        height: 600,
      },
    ],
    availability: "available",
    featured: true,
    vaccinated: true,
    microchipped: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "k3",
    name: "Max",
    slug: "max-maine-coon",
    breed: mockBreeds[2],
    price: 2200,
    age: "14 weeks",
    gender: "male",
    description:
      "Max is a majestic red tabby Maine Coon with impressive ear tufts. He's playful, curious, and has the most wonderful personality.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800",
      alt: "Max the Maine Coon",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800",
        alt: "Max the Maine Coon",
        width: 800,
        height: 600,
      },
    ],
    availability: "available",
    featured: true,
    vaccinated: true,
    microchipped: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "k4",
    name: "Bella",
    slug: "bella-persian",
    breed: mockBreeds[3],
    price: 1600,
    age: "11 weeks",
    gender: "female",
    description:
      "Bella is a sweet white Persian with a beautiful flat face. She's calm, gentle, and loves to be pampered.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=800",
      alt: "Bella the Persian",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=800",
        alt: "Bella the Persian",
        width: 800,
        height: 600,
      },
    ],
    availability: "available",
    featured: true,
    vaccinated: true,
    microchipped: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "k5",
    name: "Milo",
    slug: "milo-scottish-fold",
    breed: mockBreeds[4],
    price: 1900,
    age: "9 weeks",
    gender: "male",
    description:
      "Milo is an adorable gray Scottish Fold with the cutest folded ears. He's playful and gets along great with everyone.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
      alt: "Milo the Scottish Fold",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
        alt: "Milo the Scottish Fold",
        width: 800,
        height: 600,
      },
    ],
    availability: "reserved",
    featured: true,
    vaccinated: true,
    microchipped: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "k6",
    name: "Zara",
    slug: "zara-bengal",
    breed: mockBreeds[5],
    price: 2500,
    age: "13 weeks",
    gender: "female",
    description:
      "Zara is a stunning spotted Bengal with amazing markings. She's athletic, intelligent, and loves to climb and explore.",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1598463166228-c0f90d180918?w=800",
      alt: "Zara the Bengal",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1598463166228-c0f90d180918?w=800",
        alt: "Zara the Bengal",
        width: 800,
        height: 600,
      },
    ],
    availability: "available",
    featured: true,
    vaccinated: true,
    microchipped: true,
    createdAt: new Date().toISOString(),
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    customerName: "Sarah M.",
    quote:
      "We adopted Luna from Cat's Den and she's been the most wonderful addition to our family. The team was professional and caring throughout the entire process.",
    rating: 5,
    kittenPurchased: "British Shorthair",
    customerImage: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      alt: "Sarah M.",
      width: 200,
      height: 200,
    },
  },
  {
    id: "t2",
    customerName: "James K.",
    quote:
      "Outstanding experience! Our Maine Coon, Thor, came fully vaccinated and well-socialized. The health guarantee gave us peace of mind.",
    rating: 5,
    kittenPurchased: "Maine Coon",
    customerImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      alt: "James K.",
      width: 200,
      height: 200,
    },
  },
  {
    id: "t3",
    customerName: "Emily R.",
    quote:
      "Cat's Den made finding our perfect kitten so easy. The staff was knowledgeable and helped us choose the right breed for our lifestyle.",
    rating: 5,
    kittenPurchased: "Ragdoll",
    customerImage: {
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      alt: "Emily R.",
      width: 200,
      height: 200,
    },
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Preparing Your Home for a New Kitten",
    slug: "preparing-home-new-kitten",
    excerpt:
      "Everything you need to know about kitten-proofing your home and setting up the perfect space for your new furry friend.",
    content: null,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
      alt: "Kitten in new home",
      width: 800,
      height: 600,
    },
    author: "Dr. Sarah Johnson",
    publishedAt: new Date().toISOString(),
    tags: ["kitten care", "new kitten", "preparation"],
  },
  {
    id: "b2",
    title: "Understanding Cat Body Language",
    slug: "understanding-cat-body-language",
    excerpt:
      "Learn to decode your cat's signals and understand what they're trying to tell you through their body language.",
    content: null,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
      alt: "Cat body language",
      width: 800,
      height: 600,
    },
    author: "Emily Watson",
    publishedAt: new Date().toISOString(),
    tags: ["cat behavior", "communication", "tips"],
  },
  {
    id: "b3",
    title: "Nutrition Guide for Growing Kittens",
    slug: "nutrition-guide-growing-kittens",
    excerpt:
      "A comprehensive guide to feeding your kitten the right nutrients for healthy growth and development.",
    content: null,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
      alt: "Kitten eating",
      width: 800,
      height: 600,
    },
    author: "Dr. Michael Chen",
    publishedAt: new Date().toISOString(),
    tags: ["nutrition", "kitten health", "feeding"],
  },
];





