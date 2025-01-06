export interface WPResponse<T> {
  data: T | null;
  totalPages: number;
  totalItems: number;
  error: string | null;
}

export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  categories: number[];
  featured_media: number;
  meta_title: string;
  meta_description: string;
  canonical: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

// ... reste du fichier inchangé ...