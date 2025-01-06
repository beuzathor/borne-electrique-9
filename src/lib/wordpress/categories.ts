import { wpFetch } from './api';
import { WP_CONFIG } from './config';
import type { WPCategory, WPPost, WPResponse } from './types';

export async function getCategories(): Promise<WPResponse<WPCategory[]>> {
  return wpFetch<WPCategory[]>(WP_CONFIG.endpoints.categories, {
    per_page: '100'
  });
}

export async function getPostsByCategory(categoryId: number, page = 1): Promise<WPResponse<WPPost[]>> {
  return wpFetch<WPPost[]>(WP_CONFIG.endpoints.posts, {
    categories: categoryId.toString(),
    page: page.toString(),
    _embed: 'true',
    per_page: WP_CONFIG.perPage.toString()
  });
}