import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store/index';
import uView from './uni_modules/vk-uview-ui';
import i18n from './locales/index'

export function createApp() {
  const app = createSSRApp(App);
  // 全局混入分享逻辑
  app.mixin({
    // 分享给好友
    onShareAppMessage() {
      return {
        title: 'RITMOHUB', // 使用 i18n 国际化
        path: "/pages/home/index", // 默认跳首页
        desc: '欢迎使用RITMOHUB微信小程序。',
        imageUrl: "/static/logo1.png", // 可选分享图片
      };
    },
    // 分享到朋友圈
    onShareTimeline() {
      return {
        title: 'RITMOHUB',
        query: "",
        imageUrl: "/static/logo1.png", // 可选分享图片
      };
    },
  });
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
