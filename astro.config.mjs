import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  trailingSlash: 'never',
  build: {
    format: 'directory',
    assets: 'assets',
    // Copier les fichiers PHP dans le dossier dist
    copyPublicFiles: true,
    // Configuration personnalisée pour copier les fichiers supplémentaires
    hooks: {
      'astro:build:done': async ({ dir, routes }) => {
        const fs = await import('fs/promises');
        const path = await import('path');

        // Créer le dossier mail s'il n'existe pas
        const mailDir = path.join(dir.pathname, 'mail');
        await fs.mkdir(mailDir, { recursive: true });

        // Copier send.php dans le dossier mail
        await fs.copyFile(
          'public/mail/send.php',
          path.join(mailDir, 'send.php')
        );
      }
    }
  }
});