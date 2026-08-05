import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In production the ingress routes /api to the api service; this mirrors that
  // for `npm run dev` so the frontend fetch path is identical in both.
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
