<template>
  <view class="content p35">
    <!-- <rich-text :nodes="state.content"></rich-text> -->
     <view class="title">初级</view>
    <image class="icon" src="https://ritmohub.cn/static/vip/vip1-2.jpg"></image>
    <image class="icon" src="https://ritmohub.cn/static/vip/vip1-3.jpg"></image>
    <view class="title">高级</view>
    <image class="icon" src="https://ritmohub.cn/static/vip/vip2-2.jpg"></image>
    <image class="icon" src="https://ritmohub.cn/static/vip/vip2-3.jpg"></image>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.type = query!.type
  // getInfo()
});
// 参数
const state = reactive({
  type: 0, // 
  content: '',
})
const getInfo = () => {
  if( state.type == 0 ) {
    userApi.getAgreementsTerms().then((res: any) => {
      // console.log(res);
      state.content = res.data.content
    })
  } else if( state.type == 1 ) {
    userApi.getAgreementsPrivacy().then((res: any) => {
      // console.log(res);
      state.content = res.data.content
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  
}
</style>
