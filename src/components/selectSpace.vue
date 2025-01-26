<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630" length="500px">
    <view class="popup p0-35">
      <view class="title">
        选择空间
      </view>
      <scroll-view class="form" :scroll-top="0" scroll-y="true">
        <view class="li flex mb25 pb25">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/addHead.png"></image>
            <text class="text">xxxxx空间</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.id == 'wxpay' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.id = 'wxpay'"></image>
        </view>
        <view class="li flex mb25 pb25">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/addHead.png"></image>
            <text class="text">xxxxx空间</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.id == 'alipay' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.id = 'alipay'"></image>
        </view>
        <view class="li flex">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/addHead.png"></image>
            <text class="text">xxxxx空间</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.id == 'stripe' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.id = 'stripe'"></image>
        </view>
      </scroll-view>
      <view class="footerPopup p0-35">
        <view class="btn" @click="sumbit(true)">确认</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showTips } from '../utils/currentFun';
const { t } = useI18n()

// 参数
const state = reactive({
  isShow: false, // 
  id: '', // 
  provider: '', // 支付环境
})
// 打开弹窗
const openDialog = (id:string) => {
  // console.log(rows)
  state.id = id 
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = (show: boolean) => {
  state.isShow = false
  emit('refresh', show, state.id)
  
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 32rpx;
  line-height: 96rpx;
  text-align: center;
  color: #232322;
}
.popup {
  position: relative;
  height: 100%;
}
.form {
  height: 700rpx;
  .li {
    justify-content: space-between;
    border-bottom: 1PX solid #F5F3EF;
    &:last-child {
      border-bottom: none !important;
    }
    .left {
      width: calc(100% - 58rpx);
      .icon {
        display: inline-block;
        width: 60rpx;
        height: 60rpx;
      }
      .text {
        display: inline-block;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 60rpx;
        color: #232322;
      }
    }
    .select {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
  }
}
.footerPopup {
  position: absolute;
  left: 0;
  bottom: 35rpx;
  width: 100%;
  .btn {
    width: 100%;
    background-color: #FFCF00;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: 600;
    font-size: 28rpx;
    color: #232322;
    border-radius: 10rpx;
  }
}
</style>
