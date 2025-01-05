import { wpFetch } from './api';
import { WP_CONFIG } from './config';
import type { WPPost, WPResponse } from './types';

export async function getPosts(page = 1): Promise<WPResponse<WPPost[]>> {
  return wpFetch<WPPost[]>(WP_CONFIG.endpoints.posts, {
    page: page.toString(),
    _embed: 'true'
  });
}

export async function getPostBySlug(slug: string): Promise<WPResponse<WPPost>> {
  const response = await wpFetch<WPPost[]>(WP_CONFIG.endpoints.posts, {
    slug,
    _embed: 'true'
  });
  
  return {
    ...response,
    data: response.data?.[0] || null
  };
}