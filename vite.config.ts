import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Explicitly pass Turnstile key at build time (Vercel env vars)
  define: {
    __TURNSTILE_SITE_KEY__: JSON.stringify(
      process.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
    ),
  },
})
