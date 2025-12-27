"use client";

import { Image as DatoCMSImage } from "react-datocms";
import type { ResponsiveImageType } from "react-datocms";

interface DatoImageProps {
  data: ResponsiveImageType | null | undefined;
  className?: string;
  pictureClassName?: string;
  priority?: boolean;
  layout?: "intrinsic" | "fixed" | "responsive" | "fill";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "none";
}

/**
 * Wrapper around react-datocms Image for rendering responsive DatoCMS images.
 * 
 * To use this component, update your GraphQL query to include the responsiveImage fragment:
 * 
 * ```graphql
 * fragment ResponsiveImageFields on ResponsiveImage {
 *   srcSet
 *   webpSrcSet
 *   sizes
 *   src
 *   width
 *   height
 *   aspectRatio
 *   alt
 *   title
 *   base64
 * }
 * ```
 * 
 * Then query the image field with responsiveImage:
 * 
 * ```graphql
 * image {
 *   responsiveImage(imgixParams: { w: 800, h: 600, fit: crop, auto: format }) {
 *     ...ResponsiveImageFields
 *   }
 * }
 * ```
 */
export function DatoImage({
  data,
  className = "",
  pictureClassName = "",
  priority = false,
  layout = "responsive",
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "blur",
}: DatoImageProps) {
  if (!data) {
    return null;
  }

  return (
    <DatoCMSImage
      data={data}
      className={className}
      pictureClassName={pictureClassName}
      priority={priority}
      layout={layout}
      objectFit={objectFit}
      objectPosition={objectPosition}
      placeholder={placeholder}
    />
  );
}

/**
 * Simple image component that works with the basic FileField data
 * (the structure you're currently using in your queries)
 */
interface SimpleImageData {
  url: string;
  alt?: string | null;
  width?: number;
  height?: number;
}

interface SimpleDatoImageProps {
  data: SimpleImageData | null | undefined;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

export function SimpleDatoImage({
  data,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fill = false,
}: SimpleDatoImageProps) {
  if (!data?.url) {
    return null;
  }

  // Use Next.js Image with imgix transformations (DatoCMS uses imgix)
  const imgixUrl = new URL(data.url);
  imgixUrl.searchParams.set("auto", "format"); // Auto-format (webp when supported)
  imgixUrl.searchParams.set("q", "80"); // Quality

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgixUrl.toString()}
        alt={data.alt || ""}
        className={`object-cover ${className}`}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgixUrl.toString()}
      alt={data.alt || ""}
      width={data.width}
      height={data.height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
    />
  );
}

export default DatoImage;






