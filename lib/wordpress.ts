import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper: Replace [year] with current year in content
function replaceYearPlaceholder(text: string): string {
  if (!text) return text;
  const currentYear = new Date().getFullYear().toString();
  return text.replace(/\[year\]/gi, currentYear);
}

// Funktion zum Abrufen aller Posts
export async function getPosts() {
  const query = `
    query GetPosts {
      posts(first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    const posts = data.posts.nodes;

    // Replace [year] in all posts
    return posts.map((post: any) => ({
      ...post,
      title: replaceYearPlaceholder(post.title),
      excerpt: replaceYearPlaceholder(post.excerpt),
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Funktion zum Abrufen aller Kategorien
export async function getCategories() {
  const query = `
    query GetCategories {
      categories(first: 50) {
        nodes {
          id
          name
          slug
          description
          count
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Funktion zum Abrufen eines einzelnen Posts
export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            description
            avatar {
              url
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { slug });
    const post = data.post;

    // Replace [year] in content server-side
    if (post && post.content) {
      post.content = replaceYearPlaceholder(post.content);
    }
    if (post && post.title) {
      post.title = replaceYearPlaceholder(post.title);
    }
    if (post && post.excerpt) {
      post.excerpt = replaceYearPlaceholder(post.excerpt);
    }

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Funktion zum Abrufen von Posts nach Kategorie
export async function getPostsByCategory(categorySlug: string) {
  const query = `
    query GetPostsByCategory($categorySlug: String!) {
      posts(where: { categoryName: $categorySlug }, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { categorySlug });
    const posts = data.posts.nodes;

    // Replace [year] in all posts
    return posts.map((post: any) => ({
      ...post,
      title: replaceYearPlaceholder(post.title),
      excerpt: replaceYearPlaceholder(post.excerpt),
    }));
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Funktion zum Abrufen aller Tags
export async function getTags() {
  const query = `
    query GetTags {
      tags(first: 100) {
        nodes {
          id
          name
          slug
          description
          count
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query);
    return data.tags.nodes;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Funktion zum Abrufen von Posts nach Tag
export async function getPostsByTag(tagSlug: string) {
  const query = `
    query GetPostsByTag($tagSlug: String!) {
      posts(where: { tag: $tagSlug }, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { tagSlug });
    const posts = data.posts.nodes;

    // Replace [year] in all posts
    return posts.map((post: any) => ({
      ...post,
      title: replaceYearPlaceholder(post.title),
      excerpt: replaceYearPlaceholder(post.excerpt),
    }));
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

// Funktion zum Abrufen verwandter Posts (gleiche Kategorie, ohne aktuellen Post)
export async function getRelatedPosts(categorySlug: string, currentPostId: string, limit: number = 4) {
  const query = `
    query GetRelatedPosts($categorySlug: String!, $limit: Int!) {
      posts(where: { categoryName: $categorySlug }, first: $limit) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { categorySlug, limit });
    // Filter out current post
    const posts = data.posts.nodes.filter((post: any) => post.id !== currentPostId);

    // Replace [year] in all posts
    return posts.map((post: any) => ({
      ...post,
      title: replaceYearPlaceholder(post.title),
      excerpt: replaceYearPlaceholder(post.excerpt),
    }));
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Funktion zum Suchen von Posts
export async function searchPosts(searchQuery: string) {
  const query = `
    query SearchPosts($searchQuery: String!) {
      posts(where: { search: $searchQuery }, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data: any = await graphQLClient.request(query, { searchQuery });
    const posts = data.posts.nodes;

    // Replace [year] in all posts
    return posts.map((post: any) => ({
      ...post,
      title: replaceYearPlaceholder(post.title),
      excerpt: replaceYearPlaceholder(post.excerpt),
    }));
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
