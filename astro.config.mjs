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

        // Créer le dossier mail et PHPMailer s'ils n'existent pas
        const mailDir = path.join(dir.pathname, 'mail');
        const phpMailerDir = path.join(mailDir, 'PHPMailer');
        await fs.mkdir(mailDir, { recursive: true });
        await fs.mkdir(phpMailerDir, { recursive: true });

        // Copier les fichiers PHP
        await fs.copyFile(
          'public/mail/send.php',
          path.join(mailDir, 'send.php')
        );
        await fs.copyFile(
          'public/mail/PHPMailer/Exception.php',
          path.join(phpMailerDir, 'Exception.php')
        );
        await fs.copyFile(
          'public/mail/PHPMailer/PHPMailer.php',
          path.join(phpMailerDir, 'PHPMailer.php')
        );
      }
    }
  }
});