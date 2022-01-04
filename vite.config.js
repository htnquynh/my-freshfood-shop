import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/product": {
        target: "https://shopfreshapi.herokuapp.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/product/, ""),
      },
      "/group": {
        target: "https://shopfreshapi.herokuapp.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/group/, ""),
      },
    },
  },
  plugins: [vue()],
})
