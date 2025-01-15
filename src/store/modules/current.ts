import { defineStore } from 'pinia';
import type { UseCurrentStore } from '/@/utils/types';

// 通用状态
export const useCurrentStore = defineStore('currentObject', {
  state: (): UseCurrentStore => ({
    clientLabelList: [], 
  }),
  actions: {
    // async setClientLabelList(data: any) {
    //   // console.log(data);
    //   this.clientLabelList = data;
    // },
    
  }
});
