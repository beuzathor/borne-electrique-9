import { WP_CONFIG } from './config';
import type { WPResponse } from './types';

export async function wpFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<WPResponse<T>> {
  try {
    const queryParams = new URLSearchParams({
      ...params,
      per_page: WP_CONFIG.perPage.toString()
    });

    const url = `${WP_CONFIG.baseUrl}${endpoint}?${queryParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('WordPress API Error:', {
        endpoint,
        status: response.status,
        statusText: response.statusText
      });
      return {
        data: null,
        totalPages: 1,
        totalItems: 0,
        error: `HTTP error! status: ${response.status}`
      };
    }

    const data = await response.json();
    return {
      data,
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1'),
      totalItems: parseInt(response.headers.get('X-WP-Total') || '0'),
      error: null
    };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return {
      data: null,
      totalPages: 1,
      totalItems: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}