import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    origin: 'https://shopfreshapi.herokuapp.com/',
    proxy: {
      "/products": {
        target: "https://shopfreshapi.herokuapp.com",
        changeOrigin: true,
      },
      "/group": {
        target: "https://shopfreshapi.herokuapp.com",
        changeOrigin: true,
      },
    },
  },
})