import { getPostsByCategory, getCategories } from '@/lib/wordpress';
import { Post, Category } from '@/types';
import Link from 'next/link';
import PinterestImage from '@/components/PinterestImage';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // seconds

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat: Category) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const categoryDescriptions: { [key: string]: string } = {
    fashion: 'Entdecke zeitlose Fashion-Trends, elegante Outfits und inspirierende Style-Tipps. Deine Quelle für exklusiven Mode-Content.',
    beauty: 'Beauty-Trends, Hautpflege-Tipps und Make-up-Inspiration für natürliche Eleganz. Alles über Schönheit und Selbstpflege.',
    lifestyle: 'Lifestyle-Inspiration, Interior Design und kuratierte Empfehlungen für ein stilvolles Leben. Dein Guide für bewusstes Wohnen.',
  };

  const description = categoryDescriptions[slug.toLowerCase()] || `Alle Artikel der Kategorie ${categoryName} auf Lookenly - Fashion, Beauty & Lifestyle Blog.`;

  return {
    title: `${categoryName} | Lookenly - Fashion, Beauty & Lifestyle Blog`,
    description,
    keywords: `${categoryName}, Fashion, Beauty, Lifestyle, Trends, Style, Lookenly`,
    openGraph: {
      title: `${categoryName} | Lookenly`,
      description,
      type: 'website',
      siteName: 'Lookenly',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} | Lookenly`,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lookenly.com'}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const categoryDescriptions: { [key: string]: string } = {
    fashion: 'Timeless Elegance',
    beauty: 'Refined Grace',
    lifestyle: 'Curated Living',
  };

  const description = categoryDescriptions[slug.toLowerCase()] || 'Curated Stories';

  if (posts.length === 0) {
    // Kategorie existiert, aber keine Posts
    return (
      <div className="min-h-screen bg-bg-custom">
        {/* Hero Section */}
        <section className="bg-primary text-white py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
              {categoryName}
            </h1>
            <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
            <p className="font-montserrat text-lg tracking-widest uppercase text-neutral-300">
              {description}
            </p>
          </div>
        </section>

        {/* No Posts Message */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-montserrat text-sm tracking-widest uppercase text-neutral-600 mb-4">
              No Stories Yet
            </p>
            <p className="text-neutral-500 text-sm mb-8">
              This collection is coming soon. Check back later for curated content.
            </p>
            <Link
              href="/"
              className="inline-block border border-primary text-text-primary px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-custom">
      {/* Hero Section */}
      <section className="bg-primary text-white py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            {categoryName}
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
          <p className="font-montserrat text-lg tracking-widest uppercase text-neutral-300">
            {description}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-montserrat text-sm text-neutral-600">
              {posts.length} {posts.length === 1 ? 'Story' : 'Stories'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post: Post) => (
              <Link
                key={post.id}
                href={`/${post.categories.nodes[0]?.slug || 'uncategorized'}/${post.slug}`}
                className="group"
              >
                {post.featuredImage && (
                  <div className="aspect-[3/2] relative overflow-hidden bg-secondary mb-6">
                    <PinterestImage
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      width={900}
                      height={600}
                      className="group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                    />
                  </div>
                )}
                <div>
                  <span className="inline-block font-montserrat text-xs tracking-widest uppercase text-primary mb-3">
                    {categoryName}
                  </span>
                  <h2
                    className="font-playfair text-2xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <div
                    className="font-montserrat text-sm text-neutral-600 leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <time className="block mt-4 font-montserrat text-xs text-neutral-400 tracking-wide">
                    {new Date(post.date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 bg-bg-custom">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-block border border-primary text-text-primary px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore All Stories
          </Link>
        </div>
      </section>
    </div>
  );
}
