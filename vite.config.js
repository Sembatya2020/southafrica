import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { cpSync, existsSync } from 'fs';

function copyStaticRuntimeFiles() {
  return {
    name: 'copy-static-runtime-files',
    closeBundle() {
      const root = __dirname;
      const dist = resolve(root, 'dist');
      const entries = [
        'content.json',
        'content-de.json',
        'content-en.json',
        'admin',
        'images'
      ];

      entries.forEach((entry) => {
        const src = join(root, entry);
        const dest = join(dist, entry);
        if (existsSync(src)) {
          cpSync(src, dest, { recursive: true });
        }
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [copyStaticRuntimeFiles()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        supervision: resolve(__dirname, 'supervision.html'),
        beratung: resolve(__dirname, 'beratung.html'),
        ueberMich: resolve(__dirname, 'ueber-mich.html'),
        preise: resolve(__dirname, 'preise.html'),
        kontakt: resolve(__dirname, 'kontakt.html'),
        agb: resolve(__dirname, 'agb.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
        nutzung: resolve(__dirname, 'nutzung.html'),
        success: resolve(__dirname, 'success.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
});
