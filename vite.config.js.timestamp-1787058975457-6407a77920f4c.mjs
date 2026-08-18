// vite.config.js
import { defineConfig } from "file:///C:/Users/kotya/.gemini/antigravity-ide/scratch/chef-brigade-academy/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/kotya/.gemini/antigravity-ide/scratch/chef-brigade-academy/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "icons/apple-touch-icon.png",
        "icons/*.png",
        "assets/*.png",
        "*.pdf"
      ],
      manifest: {
        name: "Acad\xE9mie de la Brigade",
        short_name: "Brigade",
        description: "\u30D5\u30E9\u30F3\u30B9\u6599\u7406\u5B66\u6821\u306E\u8B1B\u7FA9\u3001\u53A8\u623F\u3067\u4F7F\u3048\u308B\u30D5\u30E9\u30F3\u30B9\u8A9E\u30FB\u82F1\u8A9E\u30FB\u5B9F\u52D9\u8A9E\u5F59\u3092\u5B66\u3079\u308B\u7D71\u5408\u578BPWA\u5B66\u7FD2\u30A2\u30D7\u30EA\u3002",
        theme_color: "#0A1931",
        background_color: "#0A1931",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "icons/icon-72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "icons/icon-96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "icons/icon-128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "icons/icon-152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "icons/icon-384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json,pdf}"],
        // Increase file limit because our PDFs are up to 2.8MB
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrb3R5YVxcXFwuZ2VtaW5pXFxcXGFudGlncmF2aXR5LWlkZVxcXFxzY3JhdGNoXFxcXGNoZWYtYnJpZ2FkZS1hY2FkZW15XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrb3R5YVxcXFwuZ2VtaW5pXFxcXGFudGlncmF2aXR5LWlkZVxcXFxzY3JhdGNoXFxcXGNoZWYtYnJpZ2FkZS1hY2FkZW15XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9rb3R5YS8uZ2VtaW5pL2FudGlncmF2aXR5LWlkZS9zY3JhdGNoL2NoZWYtYnJpZ2FkZS1hY2FkZW15L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXG4gICAgICAgICdmYXZpY29uLmljbycsXG4gICAgICAgICdpY29ucy9hcHBsZS10b3VjaC1pY29uLnBuZycsXG4gICAgICAgICdpY29ucy8qLnBuZycsXG4gICAgICAgICdhc3NldHMvKi5wbmcnLFxuICAgICAgICAnKi5wZGYnXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ0FjYWRcdTAwRTltaWUgZGUgbGEgQnJpZ2FkZScsXG4gICAgICAgIHNob3J0X25hbWU6ICdCcmlnYWRlJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdcdTMwRDVcdTMwRTlcdTMwRjNcdTMwQjlcdTY1OTlcdTc0MDZcdTVCNjZcdTY4MjFcdTMwNkVcdThCMUJcdTdGQTlcdTMwMDFcdTUzQThcdTYyM0ZcdTMwNjdcdTRGN0ZcdTMwNDhcdTMwOEJcdTMwRDVcdTMwRTlcdTMwRjNcdTMwQjlcdThBOUVcdTMwRkJcdTgyRjFcdThBOUVcdTMwRkJcdTVCOUZcdTUyRDlcdThBOUVcdTVGNTlcdTMwOTJcdTVCNjZcdTMwNzlcdTMwOEJcdTdENzFcdTU0MDhcdTU3OEJQV0FcdTVCNjZcdTdGRDJcdTMwQTJcdTMwRDdcdTMwRUFcdTMwMDInLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwQTE5MzEnLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzBBMTkzMScsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgb3JpZW50YXRpb246ICdwb3J0cmFpdCcsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi03Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi05Ni5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0xMjgucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTI4eDEyOCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0xNDQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTQ0eDE0NCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0xNTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTUyeDE1MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0xOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpY29ucy9pY29uLTE5Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0zODQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMzg0eDM4NCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi01MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpY29ucy9pY29uLTUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHBuZyxzdmcsanNvbixwZGZ9J10sXG4gICAgICAgIC8vIEluY3JlYXNlIGZpbGUgbGltaXQgYmVjYXVzZSBvdXIgUERGcyBhcmUgdXAgdG8gMi44TUJcbiAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDQgKiAxMDI0ICogMTAyNFxuICAgICAgfVxuICAgIH0pXG4gIF1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WSxTQUFTLG9CQUFvQjtBQUN0YSxTQUFTLGVBQWU7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZUFBZTtBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxxQ0FBcUM7QUFBQTtBQUFBLFFBRXBELCtCQUErQixJQUFJLE9BQU87QUFBQSxNQUM1QztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
