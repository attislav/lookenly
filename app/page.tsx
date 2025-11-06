import Link from 'next/link';
import Image from 'next/image';
import PinterestImage from '@/components/PinterestImage';
import { getPosts, getCategories } from '@/lib/wordpress';
import { Post, Category } from '@/types';
import { siteConfig } from '@/config/site.config';

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // seconds

export default async function Home() {
  // Daten von WordPress holen (Server-Side)
  const posts = await getPosts();
  const categories = await getCategories();

  // Top 6 Posts für die Startseite (WordPress only - no mock data)
  const featuredPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen bg-bg-custom">
      {/* Hero Section - Minimalistisch & Elegant */}
      <section className="relative bg-primary text-white py-32 md:py-48 overflow-hidden">
        <Image
          src={siteConfig.hero.backgroundImage}
          alt={`${siteConfig.site.name} Hero`}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            {siteConfig.hero.title}
          </h1>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="font-montserrat text-lg md:text-xl tracking-widest uppercase text-neutral-300 mb-12">
            {siteConfig.hero.subtitle}
          </p>
          {/* Hero CTA removed - anchor links (#) don't make sense here */}
        </div>
      </section>

      {/* Kategorien Section - Dynamisch aus WordPress */}
      {categories.length > 0 && (
        <section className="py-24 bg-bg-custom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-4 text-text-primary">
              Collections
            </h2>
            <div className="w-16 h-px bg-primary mx-auto mb-20"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.slice(0, 3).map((cat: Category, index: number) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative bg-white border border-secondary overflow-hidden hover:border-primary transition-all duration-500"
                >
                  <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
                    {/* Category images: category-1.jpg, category-2.jpg, category-3.jpg */}
                    <Image
                      src={`/images/category-${index + 1}.jpg`}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="font-playfair text-3xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-montserrat text-xs tracking-widest uppercase text-neutral-500">
                      {cat.count} {cat.count === 1 ? 'Post' : 'Posts'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Posts Section - Editorial Style */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-4 text-text-primary">
            Latest Stories
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-20"></div>

          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featuredPosts.map((post: Post) => (
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
                      />
                    </div>
                  )}
                  <div>
                    {post.categories.nodes.length > 0 && (
                      <span className="inline-block font-montserrat text-xs tracking-widest uppercase text-primary mb-3">
                        {post.categories.nodes[0].name}
                      </span>
                    )}
                    <h3
                      className="font-playfair text-2xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <div
                      className="font-montserrat text-sm text-neutral-600 leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bg-custom">
              <p className="font-montserrat text-sm tracking-widest uppercase text-neutral-600 mb-4">
                No Posts Available Yet
              </p>
              <p className="text-neutral-500 text-sm max-w-md mx-auto">
                Connect your WordPress installation by adding your URL to{' '}
                <code className="bg-secondary px-2 py-1 rounded font-mono text-xs">.env.local</code>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Teaser Section - Elegant */}
      <section className="py-32 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            The Story Behind {siteConfig.site.name}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
          <p className="font-montserrat text-base text-neutral-300 leading-relaxed mb-12 max-w-2xl mx-auto">
            {siteConfig.site.description}
          </p>
          <Link
            href="/about"
            className="inline-block border border-accent text-accent px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Newsletter Section - Minimalistisch */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Stay Inspired
          </h2>
          <p className="font-montserrat text-sm text-neutral-600 mb-10 tracking-wide">
            Subscribe to receive our latest stories and updates.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email Address"
              disabled
              className="flex-1 px-6 py-4 border border-secondary font-montserrat text-sm bg-gray-50 cursor-not-allowed opacity-60"
            />
            <button
              type="button"
              disabled
              className="bg-primary text-white px-10 py-4 font-montserrat text-sm tracking-widest uppercase opacity-60 cursor-not-allowed"
              title="Newsletter coming soon"
            >
              Subscribe
            </button>
          </div>
          <p className="font-montserrat text-xs text-neutral-400 mt-4 italic">
            Newsletter functionality coming soon
          </p>
        </div>
      </section>
    </div>
  );
}
