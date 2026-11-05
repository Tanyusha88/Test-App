import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// Served from https://<user>.github.io/Test-App/ via GitHub Pages, so
// asset URLs need the repo name as a base path (not needed on a custom
// domain or a root-level Pages site).
export default defineConfig({
  base: '/Test-App/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Thank you, me.',
        short_name: 'Thank you, me.',
        description: 'A daily self-thanks journal.',
        start_url: '.',
        display: 'standalone',
        background_color: '#f5ead8',
        theme_color: '#f5ead8',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
