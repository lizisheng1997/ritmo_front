import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store/index';
import uView from './uni_modules/vk-uview-ui';
import i18n from './locales/index'

export function createApp() {
  const app = createSSRApp(App);

  // pinia 仓库管理
  setupStore(app);
  // 引入多语言
  app.use(i18n);
  // 使用 uView UI
  app.use(uView);
  return {
    app
  };
}
