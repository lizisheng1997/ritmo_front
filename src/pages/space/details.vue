<template>
  <view class="content">
    <view class="back" @click="routerBack(1)">
      <image class="icon" src="/@/static/icon_left_black@2x.png"></image>
    </view>
    <swiper class="swiper" circular indicator-dots autoplay >
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
    </swiper>
    <!--  -->
    <view class="center p35">
      <view class="name">A001工位</view>
      <view class="grade mt15">初级</view>
      <view class="fub mt25">
        会议室采用了先进的音视频设备，确保与会者能够更清晰地听到发言者的声音，同时也方便远程参会者参与。大屏幕投影仪和白板设备则让会议更加直观和高效。
      </view>
      <view class="brief mt25">
        <text class="label">所属区域：</text>
        初级会员区域
      </view>
      <view class="brief mt25" v-if="state.type == 1 || state.type == 2">
        <text class="label">容纳人数：</text>
        4-8人
      </view>

      <view class="brief mt25" v-if="state.type != 2">
        <text class="label">租赁价格：</text>
        ¥20元/30分钟起租
      </view>
      <view class="line m35-0"></view>
      <!--  -->
      <view class="cards">
        <view class="card m10">
          <image class="icon mt15" src="/@/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
        <view class="card m10">
          <image class="icon mt15" src="/@/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
        <view class="card m10">
          <image class="icon mt15" src="/@/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
        <view class="card m10">
          <image class="icon mt15" src="/@/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
        <view class="card m10">
          <image class="icon mt15" src="/@/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type
  // getInfo()
});
// 参数
const state = reactive({
  type: 0, // 0工位1会议室2办公室3展示柜
  content: '',
})
const getInfo = () => {
  // if( state.type == 0 ) {
  //   userApi.getAgreementsTerms().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // } else if( state.type == 1 ) {
  //   userApi.getAgreementsPrivacy().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // }
}
</script>

<style scoped>
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  position: relative;
  .back {
    position: absolute;
    left: 35rpx;
    top: 88rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: #FFFFFFB2;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5rpx;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .swiper{
    height: 480rpx;
    .uni-swiper-wrapper {
      .uni-swiper-slides {
        width: 100%;
        height: 100%;
      }
    }
  }
  .center {
    
    .name {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 48rpx;
      color: #232322;
    }
    .grade {
      display: inline-block;
      width: 46rpx;
      height: 28rpx;
      line-height: 28rpx;
      text-align: center;
      border-radius: 4rpx;
      background-color: #22D274;
      font-size: 16rpx;
      font-weight: 500;
      color: #ffffff;
      vertical-align: middle;
    }
    .grade1 {
      background-color: #ED9E05;
    }
    .fub {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .brief {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
      .label {
        color: #898784;
      }
    }
    .line {
      width: 100%;
      height: 1PX;
      background-color: #D7D4CF;
    }
    .cards {
      overflow: hidden;
      .card {
        float: left;
        width: 110rpx;
        height: 110rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        text-align: center;
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
        }
        .text {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 28rpx;
          color: #232322;
        }
      }
    }
  }
}
</style>
