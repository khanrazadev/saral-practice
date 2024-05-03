import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      "/external-images": {
        target: "https://scontent-mad1-1.cdninstagram.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/external-images/, ""),
      },
    },
  },
  plugins: [react()],
});
