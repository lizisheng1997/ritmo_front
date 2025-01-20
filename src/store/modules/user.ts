import { defineStore } from 'pinia';
// @ts-ignore
import type { T, useUserType } from '../../utils/types';


export const useUserStore = defineStore({
  id: 'user-store',
  state: (): useUserType => ({
    userInfo: {} as any,
    formInput: {
      key: 0,
      value: ''
    }
  }),
  getters: {},
  actions: {
    // 存储用户信息
    setUserInfo(data: T) {
      this.userInfo = data;
      // console.log(data);
      
      uni.setStorageSync('userInfos', data);
    },
    setFormInput(data: T) {
      this.formInput = data;
    },
    
  }
});
