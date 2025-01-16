import { defineStore } from 'pinia';
// @ts-ignore
import type { T, useUserType } from '../../utils/types';


export const useUserStore = defineStore({
  id: 'user-store',
  state: (): useUserType => ({
    userInfo: {
      userId: ''
    } as any,
  }),
  getters: {},
  actions: {
    // 存储用户信息
    setUserInfo(data: T) {
      this.userInfo = data;
    },
    
  }
});
