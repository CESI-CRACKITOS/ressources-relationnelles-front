import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', '512.png', 'icons/*'],
      manifest: {
        name: 'Re(Source) relationelles',
        short_name: 'Re(Source)',
        theme_color: '#ffffff',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: './home',
        id: 'com.ressource.relationelles',
        description: 'Re(Source) relationelles is a relational database management system.',
        lang: 'fr-FR',
        dir: 'ltr'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
