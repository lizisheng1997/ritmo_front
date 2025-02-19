<template>
  <view class="content" :style="{
    paddingTop: state.navAllHeight + 'rpx'
  }">
    <view class="nav" :style="{ top: 0, paddingTop: (state.navAllHeight - 90) + 'rpx'   }">
      RITMOHUB
    </view>
    <!--  -->
    <swiper class="swiper home-swiper m35" circular indicator-dots autoplay >
      <!-- state.imagesList -->
      <swiper-item  v-for="(item, index) in state.imagesList" :key="index">
        <image class="imageW100" :src="item"></image>
      </swiper-item>
    </swiper>
    <!--  -->
    <view class="reserves p0-35 flex">
      <view class="item">
        <image class="icon" src="http://47.116.190.37:8002/static/home/reserves1.png"></image>
        <view class="title mt20">{{ t('Spacereservation') }}</view>
        <!-- <view class="text p0-10 oneEllipsis mt10">配文</view> -->
      </view>
      <view class="item">
        <image class="icon" src="http://47.116.190.37:8002/static/home/reserves2.png"></image>
        <view class="title mt20">{{ t('Roomreservation') }}</view>
        <!-- <view class="text p0-10 oneEllipsis mt10">配文配文配文配文配文配文</view> -->
      </view>
      <view class="item">
        <image class="icon" src="http://47.116.190.37:8002/static/home/reserves3.png"></image>
        <view class="title mt20">{{ t('Officereservation') }}</view>
        <!-- <view class="text p0-10 oneEllipsis mt10 textColor">{{ t('Notyetopen') }}</view> -->
      </view>
    </view>
    <!--  -->
    <view class="cards flex ">
      <view class="item">
        <image class="icon" src="http://47.116.190.37:8002/static/home/card1.png"></image>
        <view class="text mt10">{{ t('Activityroom') }}</view>
      </view>
      <view class="item">
        <image class="icon" src="http://47.116.190.37:8002/static/home/card2.png"></image>
        <view class="text mt10">{{ t('Cornerreservation') }}</view>
      </view>
      <view class="item" @click="routerTo(`/pages/user/inviteFriends`, true)">
        <image class="icon" src="http://47.116.190.37:8002/static/home/card3.png"></image>
        <view class="text mt10">{{ t('Invitefriends') }}</view>
      </view>
      <view class="item" @click="routerTo(`/pages/user/myReservation`, true)">
        <image class="icon" src="http://47.116.190.37:8002/static/home/card4.png"></image>
        <view class="text mt10">{{ t('Myreservations') }}</view>
      </view>
    </view>
    <!--  -->
    <view class="user m0-35 flex">
      <image class="head " :src=" state.avatarUrl ? state.avatarUrl : '../../static/home/head.png' "></image>
      <view class="center mr20">
        <template v-if=" state.userId">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image class="icon ml10" src="/@/static/home/vip3.png" v-if="state.isInstitution"></image>
            <template v-else >
              <image class="icon ml10" src="/@/static/home/vip0.png" v-if="state.level == 0" style="width: 91rpx;"></image>
              <image class="icon ml10" src="/@/static/home/vip1.png" v-else-if="state.level == 1"></image>
              <image class="icon ml10" src="/@/static/home/vip2.png" v-else-if="state.level == 2"></image>
            </template>
          </view>
          <view class="name mt10" v-if="state.userId">ID：{{ state.userId }}</view>
        </template>
        <template v-else>
          <view class="not"  @click="routerTo(`/pages/login/index`)">{{ t('Notloggedinyet') }}</view>
        </template>
      </view>
      <view class="right" v-if="state.userId && state.level == 2">
        <image class="icon" src="http://47.116.190.37:8002/static/home/switch.png"></image>
        <text class="" @click="routerTo(`/pages/home/institutions`)">{{ t('Switch') }}</text>
      </view>
    </view>
    <!--  -->
    <view class="list">
      <!-- <view class="li mt35">
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </view>
      <view class="li mt35">
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import Space from '/@/api/space';
const spaceApi = new Space();
const userApi = new User();
const { t } = useI18n()

onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  getSpaceList()
})
onShow(() => {
  if(uni.getStorageSync('accessToken') && uni.getStorageSync('userInfos')) {
    getUserInfo()
  }
})
// 参数
const state = reactive({
  status: 0, // 
  navAllHeight: 0,
  nickname: '', // 名称
  avatarUrl: '', // 头像
  userId: '',
  level: 0, // 0：非会员, 1: 初级会员, 2: 高级会员, 3: 企业会员
  isInstitution: false, // 是否是机构
  isNewUser: true, // 是否是新用户
  imagesList: [] as any[],
  // 
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar_url? res.data.avatar_url : ''
    state.userId = res.data.id
    state.level = res.data.vip_level
    state.isInstitution = res.data.current_org_id ? true : false
  })
}
// 获取列表
const getSpaceList = () => {
  spaceApi.getSpaceList().then((res: any) => {
    console.log(res.data);
    state.imagesList = res.data[0].images
  })
}
</script>
<style >
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
        width: 80%;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #232322;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
      width: calc( 100% - 310rpx );
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
          max-width: calc( 100% - 126rpx );
        }
        .icon {
          display: inline-block;
          width: 36rpx;
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
      width: 140rpx;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 30rpx;
      color: #232322;
      margin-top: 56rpx;
      text-align: right;
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
