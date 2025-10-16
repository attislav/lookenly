import { getPostBySlug, getPosts, getRelatedPosts } from '@/lib/wordpress';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import PinterestShareButton from '@/components/PinterestShareButton';
import RelatedPostsSidebar from '@/components/RelatedPostsSidebar';
import ContentWithPinterestButtons from '@/components/ContentWithPinterestButtons';
import TableOfContents from '@/components/TableOfContents';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate static paths for all posts with their categories
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: Post) => ({
    category: post.categories.nodes[0]?.slug || 'uncategorized',
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Lookenly',
      description: 'Der gesuchte Artikel wurde nicht gefunden.',
    };
  }

  // Clean and prepare description
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').trim() || '';
  const description = cleanExcerpt.substring(0, 160) || `${post.title.replace(/<[^>]*>/g, '')} - Entdecke die neuesten Fashion, Beauty und Lifestyle Trends auf Lookenly.`;

  // Get category for keywords
  const category = post.categories.nodes[0];
  const keywords = [
    category?.name || 'Fashion',
    'Beauty',
    'Lifestyle',
    'Lookenly',
    'Trends',
    'Style',
  ].join(', ');

  const categorySlug = category?.slug || 'uncategorized';

  return {
    title: `${post.title.replace(/<[^>]*>/g, '')} | Lookenly`,
    description,
    keywords,
    authors: [{ name: post.author?.node.name || 'Lookenly Team' }],
    openGraph: {
      title: post.title.replace(/<[^>]*>/g, ''),
      description,
      images: post.featuredImage ? [{
        url: post.featuredImage.node.sourceUrl,
        width: post.featuredImage.node.mediaDetails?.width || 1200,
        height: post.featuredImage.node.mediaDetails?.height || 630,
        alt: post.featuredImage.node.altText || post.title.replace(/<[^>]*>/g, ''),
      }] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.node.name || 'Lookenly Team'],
      siteName: 'Lookenly',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.replace(/<[^>]*>/g, ''),
      description,
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lookenly.com'}/${categorySlug}/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, category: categoryParam } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get primary category
  const category = post.categories.nodes[0];

  // Verify category matches URL (redirect if mismatch)
  if (category && category.slug !== categoryParam) {
    notFound();
  }

  const relatedPosts = category
    ? await getRelatedPosts(category.slug, post.id, 5)
    : [];

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/${category?.slug || 'uncategorized'}/${slug}`;
  const imageUrl = post.featuredImage?.node.sourceUrl || '';

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Image */}
      {post.featuredImage && (
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-primary">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover opacity-90"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      )}

      {/* Main Content Container with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-9">
            {/* Categories */}
            {post.categories.nodes.length > 0 && (
              <div className="flex gap-3 mb-6">
                {post.categories.nodes.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="font-montserrat text-xs tracking-widest uppercase text-primary hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-text-primary leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-12 pb-8 border-b border-secondary">
              <time className="font-montserrat text-sm text-neutral-500 tracking-wide">
                {new Date(post.date).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.author && (
                <>
                  <span className="text-neutral-300">|</span>
                  <span className="font-montserrat text-sm text-neutral-700">
                    {post.author.node.name}
                  </span>
                </>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex gap-4 mb-12">
              <PinterestShareButton
                url={currentUrl}
                imageUrl={imageUrl}
                description={post.title}
                className="bg-primary hover:bg-primary text-white px-6 py-3 font-montserrat text-xs tracking-widest uppercase transition-colors"
              />
            </div>

            {/* Table of Contents */}
            <TableOfContents content={post.content || ''} />

            {/* Post Content with Pinterest Buttons on Images */}
            <ContentWithPinterestButtons
              content={post.content || ''}
              postUrl={currentUrl}
              postTitle={post.title}
              className="prose prose-xl max-w-none blog-content
                prose-headings:font-playfair prose-headings:text-text-primary prose-headings:leading-tight
                prose-h1:text-5xl prose-h1:font-bold prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight
                prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-tight
                prose-h3:text-3xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-snug
                prose-h4:text-2xl prose-h4:font-semibold prose-h4:mt-8 prose-h4:mb-4
                prose-h5:text-xl prose-h5:font-semibold prose-h5:mt-6 prose-h5:mb-3
                prose-h6:text-lg prose-h6:font-semibold prose-h6:mt-6 prose-h6:mb-3 prose-h6:uppercase prose-h6:tracking-wider
                prose-p:font-montserrat prose-p:text-neutral-800 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:decoration-primary/30 hover:prose-a:decoration-primary prose-a:transition-colors
                prose-strong:text-text-primary prose-strong:font-semibold
                prose-em:text-neutral-700 prose-em:italic
                prose-img:rounded-none prose-img:w-full prose-img:my-10 prose-img:cursor-pointer
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:text-xl prose-blockquote:leading-relaxed prose-blockquote:my-10
                prose-ul:font-montserrat prose-ul:text-neutral-700 prose-ul:text-lg prose-ul:leading-relaxed prose-ul:my-6
                prose-ol:font-montserrat prose-ol:text-neutral-700 prose-ol:text-lg prose-ol:leading-relaxed prose-ol:my-6
                prose-li:mb-3
                prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-neutral-800 prose-code:font-mono prose-code:text-base
                prose-pre:bg-primary prose-pre:text-neutral-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8
                prose-hr:border-secondary prose-hr:my-12"
            />

            {/* Author Bio */}
            {post.author && post.author.node.description && (
              <div className="mt-16 pt-12 border-t border-secondary">
                <div className="flex gap-6">
                  {post.author.node.avatar && (
                    <div className="flex-shrink-0">
                      <Image
                        src={post.author.node.avatar.url}
                        alt={post.author.node.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-primary"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-playfair text-2xl font-bold mb-3 text-text-primary">
                      {post.author.node.name}
                    </h3>
                    <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                      {post.author.node.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 mt-16 lg:mt-0">
            <RelatedPostsSidebar
              posts={relatedPosts}
              categoryName={category?.name || 'Stories'}
            />
          </div>
        </div>
      </div>

      {/* Back to Blog CTA */}
      <div className="bg-bg-custom py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-block border border-primary text-text-primary px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            Back to Stories
          </Link>
        </div>
      </div>
    </article>
  );
}
