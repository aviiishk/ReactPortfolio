// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // produces dist/bundle-analysis.html showing what's inside each chunk
    visualizer({ filename: 'dist/bundle-analysis.html', open: false })
  ],
  build: {
    target: 'es2018',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor.react';
            if (id.includes('lodash')) return 'vendor.lodash';
            if (id.includes('date-fns') || id.includes('moment')) return 'vendor.date';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000
  }
});
