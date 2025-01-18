<template>
  <view class="content p35">
    <view class="menuForm mt35">
      <view class="li flex">
        <view class="left">
          简体中文
        </view>
        <view class="right">
          <image class="icon" src="/@/static/selectIcon.png" v-if="state.idx == 0"></image>
          <image class="icon" src="/@/static/select.png" v-else></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left" >
          English
        </view>
        <view class="right">
          <image class="icon" src="/@/static/selectIcon.png" v-if="state.idx == 1"></image>
          <image class="icon" src="/@/static/select.png" v-else></image>
        </view>
      </view>
      
    </view>
    <view class="footerOne">
      保存
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  idx: 0, // 手机号
  image: '',
})
</script>

<style lang="scss" scoped>
.content {
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
