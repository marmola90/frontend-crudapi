import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const replacePlugin = (mode) => {
  return {
    name: "html-inject-env",
    transformIndexHtml: (html) => {
      if (mode === "production") {
        return html.replace(
          "<!-- REACT_ENV -->",
          `<script src="./config/front.env.js"></script`
        )
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), replacePlugin(mode)],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3001, // you can replace this port with any port
  }
}))