import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://saral-practice.onrender.com",
      "/external-images": {
        target: "https://scontent-mad1-1.cdninstagram.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
