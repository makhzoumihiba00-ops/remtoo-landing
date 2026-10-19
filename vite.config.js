import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        curriculum: resolve(root, 'curriculum.html'),
        forSchools: resolve(root, 'for-schools.html'),
        forTeachers: resolve(root, 'for-teachers.html'),
        freeSample: resolve(root, 'free-sample.html'),
        pricing: resolve(root, 'pricing.html'),
        whatsIncluded: resolve(root, 'whats-included.html'),
      },
    },
  },
});
