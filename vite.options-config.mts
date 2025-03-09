import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./",
  plugins: [react()],
  server: {
    port: 3000,
    open: "./options.html"
  },
  build: {
    outDir: "./dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        app: "./options.html",
      },
    },
  },
});
