/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import unfonts from "unplugin-fonts/vite";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    ...(mode !== "test" && {
      plugins: [
        react(),
        eslint(),
        checker({ typescript: true }),
        unfonts({
          google: {
            families: [
              { name: "Titillium+Web", styles: "wght@700" },
              { name: "Source+Serif+Pro", styles: "wght@400;700" },
              { name: "Merriweather+Sans", styles: "wght@400;700" },
              {
                name: "Source+Sans+Pro",
                styles:
                  "ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700",
              },
            ],
          },
        }),
      ],
    }),
    test: {
      environment: "jsdom",
      setupFiles: "src/shared/lib/test/setup.ts",
      coverage: {
        provider: "v8",
        exclude: ["src/shared/api/realworld/**"],
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BASE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"), // 여기서는 프리픽스를 그대로 유지
          // rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 프리픽스를 제거할 경우
        },
      },
    },
    preview: { open: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // "article-service": [
            //   "src/shared/api/article/article.service.ts",
            //   "src/shared/api/article/index.ts",
            // ],
            // "auth-service": [
            //   "src/shared/api/auth/auth.service.ts",
            //   "src/shared/api/auth/index.ts",
            // ],
            // "comment-service": [
            //   "src/shared/api/comment/comment.service.ts",
            //   "src/shared/api/comment/index.ts",
            // ],
            // "favorite-service": [
            //   "src/shared/api/favorite/favorite.service.ts",
            //   "src/shared/api/favorite/index.ts",
            // ],
            // "profile-service": [
            //   "src/shared/api/profile/profile.service.ts",
            //   "src/shared/api/profile/index.ts",
            // ],
            // "tag-service": [
            //   "src/shared/api/tag/tag.service.ts",
            //   "src/shared/api/tag/index.ts",
            // ],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/app": path.resolve("src/app"),
        "@/entities": path.resolve("src/entities"),
        "@/features": path.resolve("src/features"),
        "@/pages": path.resolve("src/pages"),
        "@/shared": path.resolve("src/shared"),
        "@/widgets": path.resolve("src/widgets"),
      },
    },
  });
});
