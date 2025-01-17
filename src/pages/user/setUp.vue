<template>
  <view class="content">
    <view class="menu mt35 p0-35">
      <view class="li flex">
        <view class="left">
          评价
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          语言
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          清除缓存
        </view>
        <view class="right">
          <text class="text2">2Mb</text>
        </view>
      </view>
      <view class="li flex" @click="openBottomOperation(0)">
        <view class="left">
          退出登录
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="openBottomOperation(1)">
        <view class="left">
          删除账号
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=0`)">
        <view class="left">
          用户协议
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=1`)">
        <view class="left">
          隐私协议
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          去更新
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      
    </view>
    <bottomOperation ref="bottomOperationRef" />
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 引入组件
const bottomOperation = defineAsyncComponent( 
  () => import('/@/components/bottomOperation.vue')
)
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
// 
const bottomOperationRef = ref()
const openBottomOperation = (type: number) => {
  bottomOperationRef.value.openDialog(type)
}
</script>

<style lang="scss" scoped>
.content {
  .menu {
    .li {
      justify-content: space-between;
      border-bottom: 1PX solid #F5F3EF;
      padding-bottom: 30rpx;
      margin-top: 30rpx;
      .left {
        font-size: 32rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: #232322;
      }
      .right {
        text {
          display: inline-block;
          font-size: 24rpx;
          font-weight: 500;
          line-height: 40rpx;
        }
        .text1 {
          color: #FF3434;
        }
        .text2 {
          color: #232322;
        }
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
}
</style>
