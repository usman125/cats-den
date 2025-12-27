import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cat's Den - Premium Kittens",
    short_name: "Cat's Den",
    description:
      "Find your perfect feline companion at Cat's Den. Healthy, well-socialized kittens from champion bloodlines.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#C96B4B",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["shopping", "lifestyle"],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
  };
}

