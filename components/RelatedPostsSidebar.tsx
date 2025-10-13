import Link from 'next/link';
import PinterestImage from './PinterestImage';
import { Post } from '@/types';

interface RelatedPostsSidebarProps {
  posts: Post[];
  categoryName: string;
}

export default function RelatedPostsSidebar({ posts, categoryName }: RelatedPostsSidebarProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      {/* Header */}
      <div className="mb-8">
        <h3 className="font-playfair text-2xl font-bold text-neutral-900 mb-2">
          More in {categoryName}
        </h3>
        <div className="w-12 h-px bg-amber-900"></div>
      </div>

      {/* Related Posts List - Horizontal Layout */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.categories.nodes[0]?.slug || 'uncategorized'}/${post.slug}`}
            className="group flex gap-4"
          >
            {/* Small Thumbnail on the Left */}
            {post.featuredImage && (
              <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden bg-neutral-100">
                <PinterestImage
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}

            {/* Title on the Right */}
            <div className="flex-1 min-w-0">
              <h4
                className="font-playfair text-sm font-bold text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-3 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-10 pt-8 border-t border-neutral-200">
        <Link
          href={`/category/${categoryName.toLowerCase()}`}
          className="inline-flex items-center gap-2 font-montserrat text-sm tracking-widest uppercase text-neutral-900 hover:text-amber-900 transition-colors group"
        >
          View All {categoryName}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </Link>
      </div>
    </aside>
  );
}
