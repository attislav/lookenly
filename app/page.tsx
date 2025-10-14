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

  // Mock Posts für Demo (falls WordPress nicht verbunden)
  const mockPosts: Post[] = [
    {
      id: 'mock-1',
      title: 'The Art of Timeless Elegance',
      slug: 'timeless-elegance',
      excerpt: '<p>Discover how to curate a wardrobe that transcends seasons and trends, focusing on quality pieces that tell a story of refined taste.</p>',
      date: new Date().toISOString(),
      featuredImage: {
        node: {
          sourceUrl: '/images/post-1.jpg',
          altText: 'Timeless Elegance',
          mediaDetails: { width: 800, height: 1200 }
        }
      },
      categories: {
        nodes: [{ name: 'Fashion', slug: 'fashion' }]
      }
    },
    {
      id: 'mock-2',
      title: 'Sophisticated Beauty Rituals',
      slug: 'beauty-rituals',
      excerpt: '<p>Explore the refined approach to beauty that emphasizes natural radiance and timeless techniques over fleeting trends.</p>',
      date: new Date().toISOString(),
      featuredImage: {
        node: {
          sourceUrl: '/images/post-2.jpg',
          altText: 'Beauty Rituals',
          mediaDetails: { width: 800, height: 1200 }
        }
      },
      categories: {
        nodes: [{ name: 'Beauty', slug: 'beauty' }]
      }
    },
    {
      id: 'mock-3',
      title: 'Curating a Life of Grace',
      slug: 'life-of-grace',
      excerpt: '<p>The art of living well extends beyond aesthetics—it\'s about creating moments of beauty in everyday life.</p>',
      date: new Date().toISOString(),
      featuredImage: {
        node: {
          sourceUrl: '/images/post-3.jpg',
          altText: 'Life of Grace',
          mediaDetails: { width: 800, height: 1200 }
        }
      },
      categories: {
        nodes: [{ name: 'Lifestyle', slug: 'lifestyle' }]
      }
    }
  ];

  // Top 6 Posts für die Startseite (WordPress oder Mock)
  const featuredPosts = posts.length > 0 ? posts.slice(0, 6) : mockPosts;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Minimalistisch & Elegant */}
      <section className="relative bg-black text-white py-32 md:py-48 overflow-hidden">
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
          <div className="w-24 h-px bg-amber-200 mx-auto mb-8"></div>
          <p className="font-montserrat text-lg md:text-xl tracking-widest uppercase text-neutral-300 mb-12">
            {siteConfig.hero.subtitle}
          </p>
          {siteConfig.hero.cta && (
            <Link
              href={siteConfig.hero.cta.href}
              className="inline-block border border-amber-200 text-amber-200 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-amber-200 hover:text-black transition-all duration-300"
            >
              {siteConfig.hero.cta.text}
            </Link>
          )}
        </div>
      </section>

      {/* Editorial Quote Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-playfair text-3xl md:text-4xl italic text-neutral-800 leading-relaxed">
            "Fashion is the armor to survive the reality of everyday life"
          </p>
          <div className="mt-6 text-neutral-500 font-montserrat text-sm tracking-widest uppercase">
            Bill Cunningham
          </div>
        </div>
      </section>

      {/* Kategorien Section - Minimalistisch */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-4 text-neutral-900">
            Collections
          </h2>
          <div className="w-16 h-px bg-amber-900 mx-auto mb-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Fashion', desc: 'Timeless Elegance', image: '/images/fashion-category.jpg' },
              { name: 'Beauty', desc: 'Refined Grace', image: '/images/beauty-category.jpg' },
              { name: 'Lifestyle', desc: 'Curated Living', image: '/images/lifestyle-category.jpg' }
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase()}`}
                className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-amber-900 transition-all duration-500"
              >
                <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="font-playfair text-3xl font-bold mb-2 text-neutral-900 group-hover:text-amber-900 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-montserrat text-xs tracking-widest uppercase text-neutral-500">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section - Editorial Style */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center mb-4 text-neutral-900">
            Latest Stories
          </h2>
          <div className="w-16 h-px bg-amber-900 mx-auto mb-20"></div>

          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featuredPosts.map((post: Post) => (
                <Link
                  key={post.id}
                  href={`/${post.categories.nodes[0]?.slug || 'uncategorized'}/${post.slug}`}
                  className="group"
                >
                  {post.featuredImage && (
                    <div className="aspect-[3/2] relative overflow-hidden bg-neutral-100 mb-6">
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
                      <span className="inline-block font-montserrat text-xs tracking-widest uppercase text-amber-900 mb-3">
                        {post.categories.nodes[0].name}
                      </span>
                    )}
                    <h3
                      className="font-playfair text-2xl font-bold mb-3 text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-2"
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
            <div className="text-center py-20 bg-neutral-50">
              <p className="font-montserrat text-sm tracking-widest uppercase text-neutral-600 mb-4">
                No Posts Available Yet
              </p>
              <p className="text-neutral-500 text-sm max-w-md mx-auto">
                Connect your WordPress installation by adding your URL to{' '}
                <code className="bg-neutral-200 px-2 py-1 rounded font-mono text-xs">.env.local</code>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Teaser Section - Elegant */}
      <section className="py-32 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            The Story Behind {siteConfig.site.name}
          </h2>
          <div className="w-16 h-px bg-amber-200 mx-auto mb-8"></div>
          <p className="font-montserrat text-base text-neutral-300 leading-relaxed mb-12 max-w-2xl mx-auto">
            {siteConfig.site.description}
          </p>
          <Link
            href="/about"
            className="inline-block border border-amber-200 text-amber-200 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-amber-200 hover:text-black transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Newsletter Section - Minimalistisch */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Stay Inspired
          </h2>
          <p className="font-montserrat text-sm text-neutral-600 mb-10 tracking-wide">
            Subscribe to receive curated insights on fashion, beauty, and lifestyle.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 border border-neutral-300 font-montserrat text-sm focus:outline-none focus:border-amber-900 transition-colors"
            />
            <button
              type="submit"
              className="bg-black text-white px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-amber-900 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
