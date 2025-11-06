import { getPostBySlug } from '@/lib/wordpress';
import { redirect } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

/**
 * LEGACY REDIRECT: /post/[slug] → /[category]/[slug]
 *
 * This route is deprecated. All posts should use the category-based URL structure.
 * This redirect ensures old links (from Google, Pinterest, etc.) still work.
 */
export default async function LegacyPostRedirect({ params }: PostPageProps) {
  const { slug } = await params;

  // Fetch post to get the correct category
  const post = await getPostBySlug(slug);

  if (!post) {
    // Post not found - redirect to homepage
    redirect('/');
  }

  // Get primary category
  const category = post.categories.nodes[0]?.slug || 'uncategorized';

  // 301 Permanent Redirect to correct URL structure
  redirect(`/${category}/${slug}`);
}
