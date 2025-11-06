import { getPostsByTag, getTags } from '@/lib/wordpress';
import { Post } from '@/types';
import Link from 'next/link';
import PinterestImage from '@/components/PinterestImage';

interface TagPageProps {
  params: {
    slug: string;
  };
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // seconds

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag: any) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const tagName = slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${tagName} - Lookenly`,
    description: `Explore stories tagged with ${tagName}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const posts = await getPostsByTag(slug);
  const tagName = slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-bg-custom">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-2 border border-accent mb-6">
              <span className="font-montserrat text-sm tracking-widest uppercase text-accent">
                Tag
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              {tagName}
            </h1>
          </div>
        </section>

        {/* No Posts Message */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-montserrat text-sm tracking-widest uppercase text-neutral-600 mb-4">
              No Stories Found
            </p>
            <p className="text-neutral-500 text-sm mb-8">
              No content has been tagged with "{tagName}" yet.
            </p>
            <Link
              href="/"
              className="inline-block border border-primary text-gray-900 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
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
      <section className="bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 border border-accent mb-6">
            <span className="font-montserrat text-sm tracking-widest uppercase text-accent">
              Tag
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            {tagName}
          </h1>
          <p className="font-montserrat text-sm text-neutral-400">
            {posts.length} {posts.length === 1 ? 'Story' : 'Stories'}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  {post.categories.nodes.length > 0 && (
                    <span className="inline-block font-montserrat text-xs tracking-widest uppercase text-primary mb-3">
                      {post.categories.nodes[0].name}
                    </span>
                  )}
                  <h2
                    className="font-playfair text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2"
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
            className="inline-block border border-primary text-gray-900 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explore All Stories
          </Link>
        </div>
      </section>
    </div>
  );
}
