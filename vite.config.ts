import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from the root ("/"); GitHub Pages serves from "/lunchmate/".
// Detect Vercel via its build-time env var so the same repo deploys correctly to both.
const base = process.env.VERCEL ? '/' : process.env.GITHUB_PAGES ? '/lunchmate/' : '/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? base : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
