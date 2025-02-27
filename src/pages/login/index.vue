<template>
  <view class="content">
    <view class="mask"></view>
    <!--  -->
    <view class="interface">
      <view class="logo">
        <image class="imageW100" src="https://ritmohub.cn/static/logo.png"></image>
      </view>
      <!-- #ifdef APP-PLUS || H5 -->
      <!-- <view class="phone">132****2336</view>
      <view class="provider mt30">中国联通提供认证服务</view>
      <view class="btn btnOne mt50">{{ t('oneLogin') }}</view>
      <view class="btn btnOne" style="margin-top: 45rpx;" @click="codeLoginTo">{{ t('codeLogin') }}</view> -->
      <!-- #endif -->
      <view class="btn btnOne" style="margin-top: 500rpx;" @click="codeLoginTo">{{ t('codeLogin') }}</view>
      <view class="tips mt30">
        <image class="icon mr10" src="/@/static/loginSelect.png" v-if="!state.select" @click="state.select = true"></image>
        <image class="icon mr10" src="/@/static/selectIcon.png" @click="state.select = false" v-else></image>
        {{ t('Agree') }}RITMOHUB<text class="" @click="openPupup(0)">《{{ t('userAgreement') }}》</text>、<text class="" @click="openPupup(1)">《{{ t('privacyPolicy') }}》</text> 
      </view>
    </view>
    <textPopup ref="textPopupRef" @refresh="textPopupRefresh"/>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import textPopup from '/@/components/textPopup.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app';
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.intro = query!.intro ? query!.intro : '';
});
// 参数
const state = reactive({
  select: false, // 
  intro: '',
})
// 打开弹窗
const textPopupRef = ref()
const openPupup = (type: number) => {
  textPopupRef.value.openDialog(type)
}
const textPopupRefresh = (show: boolean) => {
  state.select = show
}
const codeLoginTo = () => {
  if( !state.select ) {
    showTips(t('Pleasechecktheagreement'))
    return
  }
  routerTo(`/pages/login/codeLogin`)
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  width: 100%;
  background: url('https://ritmohub.cn/static/loginBg.png');
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
      white-space: normal; /* 保留空白符序列，但是正常换行 */
      word-break: break-all; /* 允许在单词内换行 */
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
