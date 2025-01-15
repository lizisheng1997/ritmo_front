import type { App } from 'vue';

import { createPinia } from 'pinia';

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  app.use(pinia);
}

// 导出
export default pinia;
