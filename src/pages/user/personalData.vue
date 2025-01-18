<template>
  <view class="content p35">
    <view class="head">
      <view class="picture">
        <image class="imageW100" src="/@/static/home/head.png"></image>
        <image class="icon" src="/@/static/user/uploadImg.png"></image>
      </view>
    </view>
    <!--  -->
    <view class="menuForm " style="margin-top: 80rpx;">
      <view class="li flex">
        <view class="left">
          昵称
        </view>
        <view class="right flex">
          <text class="text2">段誉</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=0`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          个人简介
        </view>
        <view class="right flex">
          <text class="text2 textTwoEllipsis twoEllipsis">段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉段誉</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=1`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          常驻空间
        </view>
        <view class="right flex">
          <text class="text2">段誉</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=2`)"></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="hide flex">
      <text class="text">隐藏手机号和邮箱</text>
      <u-switch v-model="state.checked" active-color="#FF3434" inactive-color="#D7D4CF"></u-switch>
    </view>
    <!--  -->
    <view class="menuForm mt35">
      <view class="li flex">
        <view class="left">
          手机号
        </view>
        <view class="right flex">
          <text class="text2">+86 13200009999</text>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          邮箱
        </view>
        <view class="right flex">
          <text class="text2">32743832898@gmail.com</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=3`)"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  checked: false,
  select: false, // 
  image: '',
})
</script>

<style lang="scss" scoped>
.content {
  .head {
    display: flex;
    justify-content: center;
    .picture {
      width: 160rpx;
      height: 160rpx;
      position: relative;
      .imageW100 {
        border-radius: 160rpx;
      }
      .icon {
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .menuForm {
    
  }
  .hide {
    justify-content: space-between;
    margin-top: 65rpx;
    .text {
      display: inline-block;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 54rpx;
      color: #898784;
    }
  }
}
</style>
