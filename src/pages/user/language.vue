<template>
  <view class="content p35">
    <view class="menuForm mt35">
      <view class="li flex">
        <view class="left">
          简体中文
        </view>
        <view class="right">
          <image class="icon" src="/@/static/selectIcon.png" v-if="state.idx == 'zh'"></image>
          <image class="icon" src="/@/static/select.png" @click="state.idx = 'zh'" v-else></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left" >
          English
        </view>
        <view class="right">
          <image class="icon" src="/@/static/selectIcon.png" v-if="state.idx == 'en'"></image>
          <image class="icon" src="/@/static/select.png" @click="state.idx = 'en'" v-else></image>
        </view>
      </view>
      
    </view>
    <view class="footerOne" @click="operatePopupRef.openDialog()">
      {{ t('Save') }}
    </view>
    <operatePopup ref="operatePopupRef" @refresh="submit"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import operatePopup from '/@/components/operatePopup.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app';
const { t } = useI18n()

onLoad(() => {
  uni.setNavigationBarTitle({
    title: t('Language')
  });
  state.idx = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  // 
})
// 参数
const state = reactive({
  idx: '', //
})
const operatePopupRef = ref()
// 
const submit = async(type: boolean) => {
  if( type ) {
    uni.setStorageSync('languageType', state.idx);
    showTips('success')
  }
}
</script>

<style lang="scss" scoped>
.content {
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
