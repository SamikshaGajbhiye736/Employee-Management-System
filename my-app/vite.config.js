import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: true, // bind to 0.0.0.0
    strictPort: false,
  },
  preview: {
    host: true, // bind preview server to 0.0.0.0
    port: 4173, // optional default preview port
  },
})