import { searchPosts } from '@/lib/wordpress';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import PinterestImage from '@/components/PinterestImage';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  return {
    title: query ? `Suche: ${query} - Lookenly` : 'Suche - Lookenly',
    description: `Suchergebnisse für "${query}" auf Lookenly`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const results = query ? await searchPosts(query) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Suchergebnisse
            </h1>
            {query && (
              <p className="font-montserrat text-lg text-neutral-600">
                {results.length} {results.length === 1 ? 'Ergebnis' : 'Ergebnisse'} für{' '}
                <span className="font-semibold text-amber-900">&quot;{query}&quot;</span>
              </p>
            )}
            {!query && (
              <p className="font-montserrat text-lg text-neutral-600">
                Gib einen Suchbegriff ein, um Artikel zu finden
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {query && results.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-neutral-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="font-playfair text-2xl font-bold text-neutral-900 mb-3">
              Keine Ergebnisse gefunden
            </h2>
            <p className="font-montserrat text-neutral-600 mb-8 max-w-md mx-auto">
              Versuche es mit anderen Suchbegriffen oder durchstöbere unsere Kategorien
            </p>
            <Link
              href="/"
              className="inline-block border border-neutral-900 text-neutral-900 px-8 py-3 font-montserrat text-sm tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              Zurück zur Startseite
            </Link>
          </div>
        )}

        {query && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post: Post) => (
              <article
                key={post.slug}
                className="group bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/${post.categories.nodes[0]?.slug || 'uncategorized'}/${post.slug}`}>
                  {/* Featured Image */}
                  {post.featuredImage ? (
                    <div className="relative aspect-[3/2] bg-neutral-900 overflow-hidden">
                      <PinterestImage
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={80}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/2] bg-neutral-100 flex items-center justify-center">
                      <span className="text-neutral-400 font-montserrat text-sm">
                        Kein Bild
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Categories */}
                    {post.categories.nodes.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.categories.nodes.slice(0, 2).map((cat) => (
                          <span
                            key={cat.slug}
                            className="font-montserrat text-xs tracking-widest uppercase text-amber-900"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2
                      className="font-playfair text-xl font-bold mb-3 text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p
                        className="font-montserrat text-sm text-neutral-600 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.replace(/<[^>]*>/g, ''),
                        }}
                      />
                    )}

                    {/* Meta */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <time className="font-montserrat text-xs text-neutral-400 tracking-wide">
                        {new Date(post.date).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
