import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@tanstack/react-router')) {
              return 'router'
            }
          }
        },
      },
    },
  },
  server: {
    port: 5174,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 4174,
    strictPort: false,
    host: true,
  },
})
