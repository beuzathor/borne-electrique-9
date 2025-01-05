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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export type WPError = {
  code: string;
  message: string;
  data: {
    status: number;
  };
};