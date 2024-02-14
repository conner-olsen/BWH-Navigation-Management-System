// vite.config.ts
import { defineConfig } from "file:///Users/ceciherriman/Desktop/team-D-production/.yarn/__virtual__/vite-virtual-e439e57f48/0/cache/vite-npm-4.5.1-567bbcf9ff-2ea9c030a5.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/ceciherriman/Desktop/team-D-production/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-34362bd81b/0/cache/@vitejs-plugin-react-swc-npm-3.5.0-750c0d5a74-ca3315e200.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///Users/ceciherriman/Desktop/team-D-production/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-65598893e2.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT),
    proxy: {
      "/api": process.env.BACKEND_SOURCE + ":" + process.env.BACKEND_PORT
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build"
  },
  plugins: [react(), eslint()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2VjaWhlcnJpbWFuL0Rlc2t0b3AvdGVhbS1ELXByb2R1Y3Rpb24vYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NlY2loZXJyaW1hbi9EZXNrdG9wL3RlYW0tRC1wcm9kdWN0aW9uL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NlY2loZXJyaW1hbi9EZXNrdG9wL3RlYW0tRC1wcm9kdWN0aW9uL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBlc2xpbnQgZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IHBhcnNlSW50KDxzdHJpbmc+cHJvY2Vzcy5lbnYuUE9SVCksXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiBwcm9jZXNzLmVudi5CQUNLRU5EX1NPVVJDRSArIFwiOlwiICsgcHJvY2Vzcy5lbnYuQkFDS0VORF9QT1JULFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiYnVpbGRcIixcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIGVzbGludCgpXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLGtCQUFrQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNLFNBQWlCLFFBQVEsSUFBSSxJQUFJO0FBQUEsSUFDdkMsT0FBTztBQUFBLE1BQ0wsUUFBUSxRQUFRLElBQUksaUJBQWlCLE1BQU0sUUFBUSxJQUFJO0FBQUEsSUFDekQ7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzdCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
