import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5151,
    watch: {
      usePolling: true,
    },
  },

  build: {
    rollupOptions: {},
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'prop-types'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'prop-types'],
  },
});
