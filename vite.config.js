import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
