import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import PinterestShareButton from '@/components/PinterestShareButton';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Lookenly`,
    description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, ''),
      images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/post/${params.slug}`;
  const imageUrl = post.featuredImage?.node.sourceUrl || '';

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Image */}
      {post.featuredImage && (
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-neutral-900">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        {post.categories.nodes.length > 0 && (
          <div className="flex gap-3 mb-6">
            {post.categories.nodes.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="font-montserrat text-xs tracking-widest uppercase text-amber-900 hover:text-amber-700 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-neutral-900 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Meta Info */}
        <div className="flex items-center gap-6 mb-12 pb-8 border-b border-neutral-200">
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
            className="bg-black hover:bg-amber-900 text-white px-6 py-3 font-montserrat text-xs tracking-widest uppercase transition-colors"
          />
        </div>

        {/* Post Content */}
        <div
          className="prose prose-xl max-w-none
            prose-headings:font-playfair prose-headings:text-neutral-900 prose-headings:leading-tight
            prose-h1:text-5xl prose-h1:font-bold prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight
            prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-tight
            prose-h3:text-3xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-snug
            prose-h4:text-2xl prose-h4:font-semibold prose-h4:mt-8 prose-h4:mb-4
            prose-h5:text-xl prose-h5:font-semibold prose-h5:mt-6 prose-h5:mb-3
            prose-h6:text-lg prose-h6:font-semibold prose-h6:mt-6 prose-h6:mb-3 prose-h6:uppercase prose-h6:tracking-wider
            prose-p:font-montserrat prose-p:text-neutral-800 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-amber-900 prose-a:font-medium prose-a:underline prose-a:decoration-amber-900/30 hover:prose-a:decoration-amber-900 prose-a:transition-colors
            prose-strong:text-neutral-900 prose-strong:font-semibold
            prose-em:text-neutral-700 prose-em:italic
            prose-img:rounded-none prose-img:w-full prose-img:my-10
            prose-blockquote:border-l-4 prose-blockquote:border-amber-900 prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:text-xl prose-blockquote:leading-relaxed prose-blockquote:my-10
            prose-ul:font-montserrat prose-ul:text-neutral-700 prose-ul:text-lg prose-ul:leading-relaxed prose-ul:my-6
            prose-ol:font-montserrat prose-ol:text-neutral-700 prose-ol:text-lg prose-ol:leading-relaxed prose-ol:my-6
            prose-li:mb-3
            prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-neutral-800 prose-code:font-mono prose-code:text-base
            prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8
            prose-hr:border-neutral-200 prose-hr:my-12"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Author Bio */}
        {post.author && post.author.node.description && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <div className="flex gap-6">
              {post.author.node.avatar && (
                <div className="flex-shrink-0">
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-amber-900"
                  />
                </div>
              )}
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-3 text-neutral-900">
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

      {/* Back to Blog CTA */}
      <div className="bg-neutral-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-block border border-neutral-900 text-neutral-900 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300"
          >
            Back to Stories
          </Link>
        </div>
      </div>
    </article>
  );
}
