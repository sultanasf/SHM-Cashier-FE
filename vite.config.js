import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4333,
    host: 'localhost',
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
})
