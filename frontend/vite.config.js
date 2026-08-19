import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/career': { target: 'http://localhost:8082', changeOrigin: true, rewrite: p => p.replace('/api/career', '/api') },
      '/api/learning': { target: 'http://localhost:8081', changeOrigin: true, rewrite: p => p.replace('/api/learning', '/api') },
      '/api': { target: 'http://localhost:8080', changeOrigin: true }
    }
  }
})