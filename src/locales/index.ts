import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN.json';
import en from './en.json';

const i18n = createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  locale: uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh',
  messages: {
    zh: zhCN,
    en: en
  }
})

export default i18n