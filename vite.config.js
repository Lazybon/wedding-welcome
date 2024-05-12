import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://lazybon.github.io/wedding-welcome',
  plugins: [react()],
})
