// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
    }),
    Components({
      resolvers: [
        IconsResolver({
          // You can add 'mdi' here if you want to use unplugin-icons for mdi
          // but for Vuetify, we will configure it differently
          enabledCollections: ['lucide'], 
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '10.169.130.43',
    port: 2225
  },
  // This is optional but can be helpful
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot']
  // REMOVED: optimizeDeps: { include: ['@mdi/font'] }
})