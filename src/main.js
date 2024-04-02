import './assets/main.css';
import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
export function createApp() {
    const app = createSSRApp(App);
    app.use(router);
    return { app, router };
}
