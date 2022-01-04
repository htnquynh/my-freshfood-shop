import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // string shorthand
      '/product': {
        target: 'https://shopfreshapi.herokuapp.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/group': {
        target: 'https://shopfreshapi.herokuapp.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
