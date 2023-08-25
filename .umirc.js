import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        { path: '/login', component: 'login' },
        { path: '/', component: 'index' },
        { path: '/rule', component: 'docs' },
        { path: '/add-rule', component: 'rules' },
    ],
    npmClient: 'yarn',
    mfsu: false,
});
