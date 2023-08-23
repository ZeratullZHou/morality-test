import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/rule", component: "docs" },
  ],
  npmClient: 'yarn',
});
