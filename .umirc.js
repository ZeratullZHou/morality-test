import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/login", component: "login" },
    { path: "/", component: "index" },
    { path: "/rule", component: "docs" },
  ],
  npmClient: 'yarn',
});
