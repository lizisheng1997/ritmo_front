<template>
  <view class="content membersIntroduction">
    <view class="top">
      <image class="back" src="http://47.116.190.37:8002/static/icon_left_black@2x.png" @click="routerBack(1)"></image>
      <view class="user flex">
        <image class="head" :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip0.png" v-if="state.level == 0" style="width: 91rpx;"></image>
            <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip1.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip2.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip3.png" v-else-if="state.level == 0"></image>
          </view>
          <view class="name mt10" v-if="state.expireTime">有效期至{{ state.expireTime }}</view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">会员机构权益</view>
        <scroll-view class="interests-roll mt35" scroll-x="true"  scroll-left="0" :enable-flex="true" style="">
					<view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/1.png"></image>
            <view class="text oneEllipsis">静音舱</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/2.png"></image>
            <view class="text oneEllipsis">有限打印</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/3.png"></image>
            <view class="text oneEllipsis">免费茶饮</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/4.png"></image>
            <view class="text oneEllipsis">高速WiFi</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/5.png"></image>
            <view class="text oneEllipsis">8时工区</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/6.png"></image>
            <view class="text oneEllipsis">全天工区</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/7.png"></image>
            <view class="text oneEllipsis">5时办公</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/8.png"></image>
            <view class="text oneEllipsis">全天办公</view>
          </view>
      </scroll-view>
        
    </view>
    <view class="p35">
      <view class="footerOne" @click="routerTo(`/pages/user/openIntroduction`)">
        租赁办公室，成为会员
      </view>
    </view>
    <!--  -->
    <view class="details">
      <view class="title">-会员机构权益-</view>
      <view class="news p0-35">
        <image class="icon" src="http://47.116.190.37:8002/static/vip/en1.jpg" v-if=" state.languageType == 'en' " style="height: 900rpx;"></image>
        <image class="icon" src="http://47.116.190.37:8002/static/vip/zh1.png" v-else style="height: 900rpx;"></image>
        <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-1.png"></image>
        <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-2.jpg"></image>
        <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-3.jpg"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  getUserInfo()
  // console.log(uni.getStorageSync('languageType'))
  state.languageType = uni.getStorageSync('languageType')
});
// 参数
const state = reactive({
  languageType: '', // 
  nickname: '', // 
  avatarUrl: '', // 
  userId: '', // 
  level: 0, // 
  expireTime: '',
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar? res.data.avatar.url : ''
    state.userId = res.data.id
    state.level = res.data.vip.level
    state.expireTime = res.data.vip.expire_time
  })
}
</script>

<style lang="scss" scoped>
.content {
  .top {
    height: 360rpx;
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .back {
      display: inline-block;
      width: 68rpx;
      height: 68rpx;
      position: absolute;
      left: 35rpx;
      top: 8%;
    }
  }
  .news {
    .icon {
      display: inline-block;
      width: 100%;
      margin-top: 35rpx;
    }
  }
}
</style>
