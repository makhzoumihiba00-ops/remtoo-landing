import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

function pagesStylesheet() {
  return {
    name: 'pages-stylesheet',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('./assets/site.css', './src/css/style.css');
      },
    },
    writeBundle(_options, bundle) {
      const stylesheet = Object.values(bundle).find(
        (output) => output.type === 'asset' && output.fileName.endsWith('.css'),
      );

      if (!stylesheet || !stylesheet.source) {
        throw new Error('Vite did not emit the compiled stylesheet.');
      }

      writeFileSync(resolve(root, 'assets/site.css'), stylesheet.source);
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), pagesStylesheet()],
  base: './',
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
