import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['modal-view', 'menu-box', 'notify-box'].includes(tag),
        }
      }
    })
  ],
  server: {
    port: 8080,
  },
})
