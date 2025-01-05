import { wpFetch } from './api';
import { WP_CONFIG } from './config';
import type { WPPage, WPResponse } from './types';

export async function getPages(): Promise<WPPage[]> {
  try {
    const response = await wpFetch<WPPage[]>(WP_CONFIG.endpoints.pages, {
      per_page: '100',
      _embed: 'true'
    });
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const response = await wpFetch<WPPage[]>(WP_CONFIG.endpoints.pages, {
      slug,
      _embed: 'true'
    });
    
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}