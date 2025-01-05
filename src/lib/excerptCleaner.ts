/**
 * Nettoie un extrait WordPress en supprimant les balises HTML et le texte "Lire la suite"
 */
export function cleanWordPressExcerpt(excerpt: string): string {
  // Première passe : suppression des balises HTML
  let cleaned = excerpt.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Deuxième passe : nettoyage des entités HTML et caractères spéciaux
  cleaned = cleaned
    .replace(/&[^;]+;/g, '') // Supprime toutes les entités HTML
    .replace(/\[&hellip;\]|\[…\]|…|\.{3}/g, '') // Supprime tous les types de points de suspension
    .replace(/\s*Lire la suite.*$/i, '') // Supprime "Lire la suite" et tout ce qui suit
    .replace(/\s*→.*$/, '') // Supprime la flèche et tout ce qui suit
    .replace(/\s+/g, ' ') // Normalise les espaces
    .trim();

  return cleaned;
}