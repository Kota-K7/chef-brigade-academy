import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icons/apple-touch-icon.png',
        'icons/*.png',
        'assets/*.png',
        '*.pdf'
      ],
      manifest: {
        name: 'Académie de la Brigade',
        short_name: 'Brigade',
        description: 'フランス料理学校の講義、厨房で使えるフランス語・英語・実務語彙を学べる統合型PWA学習アプリ。',
        theme_color: '#0A1931',
        background_color: '#0A1931',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'icons/icon-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/icon-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'icons/icon-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/icon-384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json,pdf}'],
        // Increase file limit because our PDFs are up to 2.8MB
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      }
    })
  ]
});
