import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'https://system.tridal.org',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target :'http://localhost:5000',
        // target :'http://frontend', for docker compose
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve:{
    alias:[{ find: "@", replacement: "/src"}]
  }
})
