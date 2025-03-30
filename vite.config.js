import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // ← ここを追加
    port: process.env.PORT || 5173, // Renderの環境変数PORTを使用
  },
  preview: {
    allowedHosts: ["my-react-app-1t3e.onrender.com"], // ← ここを追加
  },
});
