import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/dato";
import { StructuredTextRenderer } from "./structured-text-renderer";
import type { PageContent } from "@/types";

interface CMSPageProps {
  slug: string;
  preview?: boolean;
  /** Custom header component to render above content */
  header?: React.ReactNode;
  /** Custom footer component to render below content */
  footer?: React.ReactNode;
  /** Additional className for the content wrapper */
  className?: string;
  /** Whether to show the default page header (title + description) */
  showDefaultHeader?: boolean;
}

/**
 * Reusable component for rendering DatoCMS Page content
 * Can be used standalone or as a wrapper for hybrid pages
 */
export async function CMSPage({
  slug,
  preview = false,
  header,
  footer,
  className = "",
  showDefaultHeader = true,
}: CMSPageProps) {
  const page = await getPageBySlug(slug, preview);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      {showDefaultHeader && (
        <div className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
              {page.title}
            </h1>
            {page.seo?.description && (
              <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
                {page.seo.description}
              </p>
            )}
          </div>
        </div>
      )}

      {header}

      <div className={`container mx-auto px-4 py-12 ${className}`}>
        <div className="max-w-3xl mx-auto">
          <StructuredTextRenderer content={page.content?.value} />
        </div>
      </div>

      {footer}
    </div>
  );
}

/**
 * Helper to generate metadata from a DatoCMS Page SEO field
 */
export function buildMetadataFromPage(page: PageContent | null, fallbackTitle = "Page"): Metadata {
  if (!page) {
    return { title: fallbackTitle };
  }

  const seo = page.seo;
  
  const metadata: Metadata = {
    title: seo?.title || page.title || fallbackTitle,
    description: seo?.description,
  };

  if (seo?.image?.url) {
    metadata.openGraph = {
      images: [seo.image.url],
    };
  }

  return metadata;
}

/**
 * Helper to generate metadata from a DatoCMS Page by slug
 */
export async function generateCMSPageMetadata(
  slug: string,
  fallbackTitle = "Page"
): Promise<Metadata> {
  const page = await getPageBySlug(slug);
  return buildMetadataFromPage(page, fallbackTitle);
}

export default CMSPage;


