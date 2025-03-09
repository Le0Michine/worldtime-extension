import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "src",
    reporters: [
        "default",
        "html",
        "verbose"
    ]
  },
});
