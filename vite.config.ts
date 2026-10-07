import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/shop/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
  },
}))
