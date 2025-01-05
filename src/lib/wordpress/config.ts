export const WP_CONFIG = {
  baseUrl: 'https://www.blog.installer-borne-recharge.fr/wp-json/wp/v2',
  perPage: 12,
  endpoints: {
    posts: '/posts',
    categories: '/categories',
    pages: '/pages',
    tags: '/tags',
    media: '/media'
  }
} as const;

// Types pour la configuration
export type WPEndpoint = keyof typeof WP_CONFIG.endpoints;
export type WPConfig = typeof WP_CONFIG;