<template>
  <view class="content">
    <image class="back" src="/@/static/iconLeftBlack.png" @click="routerBack(1)"></image>
    <view class="top">
      <image class="leftIcon" src="/@/static/user/title2.png" v-if="state.type == 'zh'"></image>
      <image class="leftIcon" src="/@/static/user/title1.png" v-else></image>
      <image class="rightIcon" src="/@/static/user/high.png"></image>
      <view class="card p35">
        <view class="title">
          <image class="icon mr10" src="/@/static/user/gift.png"></image>
          {{ t('InvitationwithGifts') }} ：
        </view>
        <view class="hour mt35">
          <text class="num">{{ state.count }}</text>
          <text class="text">{{ t('hour') }}</text>
        </view>
        <view class="fub p35-0">
          {{ t('JuniorMeetingRoom') }}
        </view>
      </view>
    </view>
    <!--  -->
    <view class="p0-35">
      <view class="copyCard flex p35">
        <view class="title">
          <image class="icon" src="/@/static/user/invite.png"></image>
          {{ t('Invitationcode') }} :
        </view>
        <view class="code">
          {{ state.code }}
          <image class="icon" src="/@/static/user/copy.png" @click="copyText(state.code)"></image>
        </view>
      </view>
      <!--  -->
      <view class="footerOne mt35" >
        {{ t('ShareNow') }}
      </view>
      <view class="tips mt35">
        {{ t('Rewardrule') }}
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import { routerBack, copyText } from '/@/utils/currentFun';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  state.type = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  
  getUserInfo()
});
// 参数
const state = reactive({
  type: '',
  count: 0, // 
  code: '',
})
// 获取用户资料
const getUserInfo = async () => {
  await userApi.getUserInfo({}).then((res: any) => {
    // console.log(res.invite.code);
    state.count = res.data.invited_count
    state.code = res.data.invite_code
  });
};
</script>

<style lang="scss" scoped>
.content {
  .back {
    position: fixed;
    left: 35rpx;
    top: 88rpx;
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
    margin: 20rpx 35rpx 0 0;
    z-index: 9999;
  }
  .top  {
    width: 100%;
    height: 640rpx;
    background-color: #FFCF00;
    border-radius: 0 0 35rpx 35rpx;
    position: relative;
    .leftIcon {
      display: inline-block;
      width: 360rpx;
      height: 166rpx;
      position: absolute;
      left: 30rpx;
      top: 165rpx;
    }
    .rightIcon {
      display: inline-block;
      width: 280rpx;
      height: 280rpx;
      position: absolute;
      right: 0;
      top: 125rpx;
    }
    .card {
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 0px #00000026;
      position: absolute;
      left: 35rpx;
      bottom: -65rpx;
      width: calc( 100% - 70rpx );
      border-radius: 24rpx;
      .title {
        .icon {
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
        }
      }
      .hour {
        text-align: center;
        .num {
          display: inline-block;
          font-size: 88rpx;
          font-weight: 700;
          color: #FFCF00;
        }
        .text {
          display: inline-block;
          font-size: 48rpx;
          font-weight: 400;
          color: #232322;
        }
      }
      .fub {
        text-align: center;
        font-size: 32rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #898784;
      }
    }
  }
  .copyCard {
    margin-top: 65rpx;
    box-shadow: 0px 0px 10px 0px #00000026;
    background-color: #ffffff;
    border-radius: 24rpx;
    justify-content: space-between;
    .title {
      font-size: 32rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
      }
    }
    .code {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 56rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
  }
  .tips {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #898784;
  }
}
</style>
