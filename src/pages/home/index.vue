<template>
  <view class="content" :style="{
    paddingTop: state.navAllHeight + 'rpx'
  }">
    <view class="nav" :style="{ top: 0, paddingTop: (state.navAllHeight - 90) + 'rpx'   }">
      Ritmohub
    </view>
    <!--  -->
    <swiper class="swiper home-swiper m35" circular indicator-dots autoplay >
      <swiper-item>
        <image class="imageW100" src="/@/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="/@/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="/@/static/loginBg.png"></image>
      </swiper-item>
    </swiper>
    <!--  -->
    <view class="reserves p0-35 flex">
      <view class="item">
        <image class="icon" src="/@/static/home/reserves1.png"></image>
        <view class="title mt20">工位预定</view>
        <view class="text p0-10 oneEllipsis mt10">配文</view>
      </view>
      <view class="item">
        <image class="icon" src="/@/static/home/reserves2.png"></image>
        <view class="title mt20">会议室预定</view>
        <view class="text p0-10 oneEllipsis mt10">配文配文配文配文配文配文</view>
      </view>
      <view class="item">
        <image class="icon" src="/@/static/home/reserves3.png"></image>
        <view class="title mt20 textColor">办公室预定</view>
        <view class="text p0-10 oneEllipsis mt10 textColor">暂未开放</view>
      </view>
    </view>
    <!--  -->
    <view class="cards flex ">
      <view class="item">
        <image class="icon" src="/@/static/home/card1.png"></image>
        <view class="text mt10">活动室</view>
      </view>
      <view class="item">
        <image class="icon" src="/@/static/home/card2.png"></image>
        <view class="text mt10">展示柜</view>
      </view>
      <view class="item">
        <image class="icon" src="/@/static/home/card3.png"></image>
        <view class="text mt10">邀请好友</view>
      </view>
      <view class="item">
        <image class="icon" src="/@/static/home/card4.png"></image>
        <view class="text mt10">我的预约</view>
      </view>
    </view>
    <!--  -->
    <view class="user m0-35 flex">
      <image class="head " src="/@/static/home/head.png"></image>
      <view class="center mr20">
        <template v-if=" state.status == 0 ">
          <view class="not"  @click="routerTo(`/pages/login/index`)">暂未登录</view>
        </template>
        <template v-if=" state.status == 1 ">
          <view class="company flex mt30">
            <text class="text oneEllipsis">杭州大鱼网络科技有限公司</text>
            <image class="icon ml10" src="/@/static/home/vip1.png"></image>
          </view>
          <view class="name mt10">段誉</view>
        </template>
      </view>
      <view class="right">
        <image class="icon" src="/@/static/home/switch.png"></image>
        切换
      </view>
    </view>
    <!--  -->
    <view class="list">
      <view class="li mt35">
        <image class="imageW100" src="/@/static/loginBg.png"></image>
      </view>
      <view class="li mt35">
        <image class="imageW100" src="/@/static/loginBg.png"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
})
// 参数
const state = reactive({
  status: 0, // 
  navAllHeight: 0,
})
</script>

<style scoped>
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  position: relative;
  .nav {
    font-size: 28rpx;
    font-weight: 900;
    line-height: 88rpx;
    text-align: center;
    z-index: 999;
    position: fixed;
    left: 0;
    width: 100%;
    background-color: #F5F3EF;
  }
  .reserves {
    justify-content: space-between;
    .item {
      width: 204rpx;
      height: 200rpx;
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px #0000001A;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .icon {
        display: inline-block;
        width: 80rpx;
        height: 80rpx;
      }
      .title {
        font-size: 28rpx;
        font-weight: 600;
        line-height: 36rpx;
        color: #232322;
        text-align: center;
      }
      .text{
        width: 100%;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;
        text-align: center;
        color: #898784;
      }
      .textColor {
        color: #D7D4CF !important;
      }
    }
  }
  .cards {
    justify-content: space-between;
    height: 156rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    box-shadow: 0px 4px 10px 0px #0000001A;
    margin: 35rpx;
    .item {
      width: 25%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .icon {
        display: inline-block;
        width: 80rpx;
        height: 80rpx;
      }
      .text {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #232322;
      }
    }
  }
  .user {
    height: 140rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 10px 0px #0000001A;
    border-radius: 20rpx;
    .head {
      display: inline-block;
      width: 80rpx;
      height: 80rpx;
      border-radius: 80rpx;
      margin: 30rpx 20rpx;
    }
    .center {
      width: calc( 100% - 260rpx );
      .not {
        line-height: 140rpx;
        font-size: 28rpx;
        font-weight: 600;
        color: #232322;
      }
      .company {
        font-size: 28rpx;
        font-weight: 600;
        color: #232322;
        .text {
          display: inline-block;
          width: calc( 100% - 126rpx );
        }
        .icon {
          display: inline-block;
          width: 116rpx;
          height: 36rpx;
        }
      }
      .name {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 30rpx;
        color: #898784;
      }
    }
    .right {
      width: 100rpx;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 30rpx;
      color: #232322;
      margin-top: 56rpx;
      .icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
  }
  .list {
    padding: 0 35rpx 35rpx ;
    .li {
      height: 340rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }
  }
}
</style>
