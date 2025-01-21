<template>
  <view class="content membersIntroduction">
    <view class="top">
      <view class="user flex">
        <image class="head" :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image class="icon ml10" src="/@/static/home/vip0.png" v-if="state.level == 0" style="width: 91rpx;"></image>
            <image class="icon ml10" src="/@/static/home/vip1.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="/@/static/home/vip2.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="/@/static/home/vip3.png" v-else-if="state.level == 0"></image>
          </view>
          <view class="name mt10">有效期至 2024-05-25</view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">会员机构权益</view>
        <scroll-view class="interests-roll mt10" scroll-x="true"  scroll-left="120" :enable-flex="true" style="">
					<view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text oneEllipsis">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
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
      <view class="news">

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  getUserInfo()
});
// 参数
const state = reactive({
  nickname: '', // 
  avatarUrl: '', // 
  userId: '', // 
  level: 0, // 
  select: false, // 
  image: '',
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar? res.data.avatar.url : ''
    state.userId = res.data.id
    state.level = res.data.vip.level
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
  }
}
</style>
