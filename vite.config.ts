import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the app is served from /lunchmate/ ; in dev it's served from /
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/lunchmate/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
