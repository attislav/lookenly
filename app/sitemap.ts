import { MetadataRoute } from 'next';
import { getPosts, getCategories, getTags } from '@/lib/wordpress';

// Revalidate sitemap every hour (3600 seconds)
// This ensures new WordPress posts appear in the sitemap automatically
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lookenly.com';

  // Statische Seiten
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Alle Posts holen
  const posts = await getPosts();
  const postPages = posts.map((post) => {
    // URL mit Kategorie: /fashion/post-slug statt /post/post-slug
    const category = post.categories.nodes[0]?.slug || 'uncategorized';
    return {
      url: `${baseUrl}/${category}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  // Alle Kategorien holen
  const categories = await getCategories();
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Alle Tags holen
  const tags = await getTags();
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
}
