import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  // tanstackRouter generates src/routeTree.gen.ts from src/routes and must run
  // before the react plugin.
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
  // In production the ingress routes /api to the api service; this mirrors that
  // for `npm run dev` so the frontend fetch path is identical in both.
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
