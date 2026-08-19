import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Use relative paths for GitHub Pages compatibility
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('recharts')) return 'vendor-charts';
            return 'vendor';
          }
        }
      }
    }
  }
})