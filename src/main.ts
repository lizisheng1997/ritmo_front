import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store/index';
import uView from './uni_modules/vk-uview-ui';
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'

// 创建 VueI18n 实例并配置
const i18n = createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  locale: uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'en',
  messages: {
    zh: zhCN,
    en: en
  }
})
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
