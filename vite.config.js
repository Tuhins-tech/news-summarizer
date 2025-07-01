// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Important for Vercel if routing fails
  build: {
    outDir: 'dist'
  }
});
