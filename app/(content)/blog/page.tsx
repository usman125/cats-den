import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/dato";
import { Card, Badge } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and stories about cat care, kitten health, and life with feline companions.",
  openGraph: {
    title: "Cat Care Blog | Cat's Den",
    description:
      "Expert tips, care guides, and heartwarming stories for cat lovers.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const { items: posts } = await getAllBlogPosts(1, 10);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-coral-light text-terracotta-dark font-medium rounded-full text-sm mb-4">
            Our Blog
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal">
            Cat Care & Tips
          </h1>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Helpful guides, expert advice, and heartwarming stories for cat
            lovers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <Card variant="elevated" className="text-center py-16">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-2">
              Coming Soon
            </h2>
            <p className="text-charcoal-light">
              We&apos;re working on some great content. Check back soon!
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card variant="elevated" padding="none" hoverable className="h-full">
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={post.featuredImage?.url || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <h2 className="font-heading text-xl font-semibold text-charcoal mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-charcoal-light text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-charcoal-light pt-3 border-t border-cream-dark">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}










