import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  date: string;
}

interface RelatedPostsFooterProps {
  posts: Post[];
}

export default function RelatedPostsFooter({ posts }: RelatedPostsFooterProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-secondary">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Das könnte dich auch interessieren
        </h2>
        <p className="text-stone-600 font-montserrat">
          Entdecke weitere spannende Artikel aus derselben Kategorie
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-[3/2] mb-4 overflow-hidden rounded-lg bg-secondary">
              {post.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <span className="text-stone-400 text-sm font-montserrat">
                    Kein Bild
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-playfair text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>

              {post.excerpt && (
                <p
                  className="text-stone-600 font-montserrat text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.replace(/<[^>]*>/g, '') // Strip HTML tags
                  }}
                />
              )}

              {/* Read More */}
              <div className="mt-3 flex items-center text-accent font-montserrat text-sm font-medium group-hover:text-primary transition-colors">
                <span>Weiterlesen</span>
                <svg
                  className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
