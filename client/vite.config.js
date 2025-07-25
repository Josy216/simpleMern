import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'https://mern-9inz.onrender.com'  // ✅ Backend proxy
      '/api': 'http://localhost:3000'  // ✅ Backend proxy
    }
  }
})
