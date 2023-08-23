import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", title: "道德测试"  },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'yarn',
});
