<template>
  <view class="content">
    <view class="mask"></view>
    <!--  -->
    <view class="interface">
      <view class="logo">
        <image class="imageW100" src="/@/static/logo.png"></image>
      </view>
      <view class="phone">132****2336</view>
      <view class="provider mt30">中国联通提供认证服务</view>
      <view class="btn btnOne mt50">{{ t('oneLogin') }}</view>
      <view class="btn btnCode mt30" @click="routerTo('/pages/login/codeLogin')">{{ t('codeLogin') }}</view>
      <view class="tips mt30 flex">
        <image class="icon mr10" src="/@/static/loginSelect.png" v-if="!state.select"></image>
        <image class="icon mr10" src="/@/static/selectIcon.png" v-else></image>
        同意Ritmohub <text class="" @click="openPupup">《用户协议》</text>、<text class="">《隐私政策》</text> 并使用本机号码进行登录
      </view>
    </view>
    <textPopup ref="textPopupRef" @refresh="textPopupRefresh"/>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 引入组件
const textPopup = defineAsyncComponent( 
  () => import('/@/components/textPopup.vue')
)
// 参数
const state = reactive({
  select: false, // 
})
// 打开弹窗
const textPopupRef = ref()
const openPupup = () => {
  textPopupRef.value.openDialog()
}
const textPopupRefresh = (show: boolean) => {
  state.select = show
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  width: 100%;
  background-image: url('/@/static/loginBg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #000;
    opacity: 0.3;
  }
  .interface {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      width: 308rpx;
      height: 308rpx;
      margin-top: 410rpx;
    }
    .phone {
      font-size: 48rpx;
      line-height: 64rpx;
      font-weight: 600;
      color: #FFFFFF;
      margin-top: 280rpx;
    }
    .provider {
      font-weight: 400;
      font-size: 24rpx;
      color: #D7D4CF;
      line-height: 30rpx;
    }
    .btn {
      width: 670rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-weight: 600;
      color: #232322;
      font-size: 32rpx;
      border-radius: 20rpx;
    }
    .btnOne {
      background-color: #FFCF00;
    }
    .btnCode {
      background-color: #F5F3EF;
    }
    .tips {
      font-weight: 400;
      width: 670rpx;
      font-size: 20rpx;
      line-height: 28rpx;
      color: #F5F3EF;
      text {
        color: #FFCF00;
      }
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        margin-top: -6rpx;
      }
    }
  }
}
</style>
