<template>
  <view class="content p35">
    <view class="menuForm mt35">
      <view class="li flex">
        <view class="left">
          简体中文
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/selectIcon.png" v-if="state.idx == 'zh'"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/select.png" @click="state.idx = 'zh'" v-else></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left" >
          English
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/selectIcon.png" v-if="state.idx == 'en'"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/select.png" @click="state.idx = 'en'" v-else></image>
        </view>
      </view>
      
    </view>
    <view class="footerOne" @click="operatePopupRef.openDialog()">
      保存
    </view>
    <operatePopup ref="operatePopupRef" @refresh="submit"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app';
const { t } = useI18n()

// 引入组件
const operatePopup = defineAsyncComponent( 
  () => import('/@/components/operatePopup.vue')
)
onLoad(() => {
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
    showTips('切换成功')
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
