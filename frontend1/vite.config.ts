import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer",
      stream: "stream-browserify",
      events: "events",
      process: "process/browser",
      util: "util",
      vm: "vm-browserify",
    },
  },
  define: {
    "process.env": {},
    global: "globalThis",
  },
});
