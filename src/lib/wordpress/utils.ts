/**
 * Nettoie le HTML d'une chaîne de caractères
 */
export function cleanHtml(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // Supprime les balises HTML
    .replace(/&amp;/g, '&') // Convertit &amp; en &
    .replace(/&lt;/g, '<') // Convertit &lt; en <
    .replace(/&gt;/g, '>') // Convertit &gt; en >
    .replace(/&quot;/g, '"') // Convertit &quot; en "
    .replace(/&#039;/g, "'") // Convertit &#039; en '
    .replace(/&nbsp;/g, ' '); // Convertit &nbsp; en espace
}

/**
 * Génère une URL propre pour un article
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

/**
 * Génère une URL propre pour une catégorie
 */
export function getCategoryUrl(slug: string): string {
  return `/blog/category/${slug}`;
}

/**
 * Formate une date WordPress
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}