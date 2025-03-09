import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./",
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    emptyOutDir: false,
    outDir: "./dist",
  },
});
