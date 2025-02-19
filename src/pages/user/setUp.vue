<template>
  <view class="content">
    <view class="menuForm mt35 p0-35">
      <view class="li flex">
        <view class="left">
          {{ t('Comment') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/language`)">
        <view class="left" >
          {{ t('Language') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <!-- #ifdef APP-PLUS || H5 -->
      <view class="li flex">
        <view class="left">
          {{ t('Clearcache') }}
        </view>
        <view class="right">
          <text class="text2">0Mb</text>
        </view>
      </view>
      <!-- #endif -->
      <view class="li flex" @click="openBottomOperation(0)">
        <view class="left">
          {{ t('Logout') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="openBottomOperation(1)">
        <view class="left">
          {{ t('Deleteaccount') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=0`)">
        <view class="left">
          {{ t('userAgreement') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=1`)">
        <view class="left">
          {{ t('privacyPolicy') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <!-- #ifdef APP-PLUS || H5 -->
      <view class="li flex">
        <view class="left">
          {{ t('update') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <!-- #endif -->
      
    </view>
    <bottomOperation ref="bottomOperationRef" />
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import bottomOperation from '/@/components/bottomOperation.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
import { onLoad } from '@dcloudio/uni-app';
const loginApi = new Login();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: t('Settings')
  });
});
const operatePopupRef = ref()
// 
const bottomOperationRef = ref()
const openBottomOperation = (type: number) => {
  bottomOperationRef.value.openDialog(type)
}
// 退出登录
const loginOut = async() => {

}
</script>

<style >
page {
  background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.content {
  
}
</style>
