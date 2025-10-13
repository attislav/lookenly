export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  categories: {
    nodes: Category[];
  };
  author?: {
    node: {
      name: string;
      description: string;
      avatar: {
        url: string;
      };
    };
  };
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}
