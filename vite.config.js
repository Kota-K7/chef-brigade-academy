import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
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
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
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
