import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Served from https://<user>.github.io/Test-App/ via GitHub Pages, so
// asset URLs need the repo name as a base path (not needed on a custom
// domain or a root-level Pages site).
export default defineConfig({
  base: '/Test-App/',
  plugins: [react()],
})
