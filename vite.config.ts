import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/sui": {
        target: "https://fullnode.devnet.sui.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sui/, ""),
        secure: false,
      },
    },
  },
});
