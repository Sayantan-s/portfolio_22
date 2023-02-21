import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import autoAlias from "vite-plugin-auto-alias";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react(),
      autoAlias({
        root: resolve(__dirname, "./src"),
        prefix: "@",
        jsonPath: resolve(__dirname, "./tsconfig.json"),
      }),
      legacy({
        targets: ["defaults", "not IE 11"],
        polyfills: ["es.promise.finally", "es/map", "es/set"],
        modernPolyfills: ["es.promise.finally"],
      }),
    ],
    server: {
      open: true,
      hmr: true,
      strictPort: true,
      port: 3000,
      host: "localhost",
      proxy: {
        "/api": {
          target: `${process.env.VITE_SERVER_ORIGIN}/api`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err.name, err.message);
            });
            proxy.on("proxyReq", (_, req, _res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url
              );
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
    build: {
      minify: "esbuild",
      cssCodeSplit: true,
    },
    optimizeDeps: {
      force: true,
    },
  });
};
