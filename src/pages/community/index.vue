<template>
  <view class="content" :style="{
    paddingTop: state.navAllHeight + 'rpx'
  }">
    <view class="nav flex p0-35">
      <view class="btn">
        <image class="icon mr15" src="http://47.116.190.37:8002/static/community/nav1.png"></image>
        <text class="text">我的主页</text>
      </view>
      <view class="btn">
        <image class="icon mr15" src="http://47.116.190.37:8002/static/community/nav2.png"></image>
        <text class="text">回复我的</text>
        <view class="count">3</view>
      </view>
    </view>
    <!--  -->
    <view class="p0-35">
      <scroll-view
          class="tabs mt35"
          scroll-x="true"
          scroll-left="0"
          enable-flex="true"
          style="height: 70rpx">
            <view class="text pb25" :class=" index == state.current ? 'textAct' : '' " v-for=" (item, index) in communityIndexTabs " @click="state.current = index">{{ item }}</view>
        </scroll-view>
    </view>
    <!--  -->
    <communityList :list="cList">

    </communityList>
    <!--  -->
    <view class="add" @click="routerTo('/pages/community/addCommunity')">
      <image class="icon" src="/@/static/iconAdd.png"> </image>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import communityList from '/@/components/communityList.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { communityIndexTabs } from '/@/utils/universalArray';
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app';
const { t } = useI18n()

// 引入组件
onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
})
// 参数
const cList = ref([
{
						price: 35,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 75,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
					},
					{
						price: 385,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 784,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
					},
					{
						price: 7891,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 2341,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 661,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 1654,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 1678,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 924,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 8243,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
])
const state = reactive({
  status: 0, // 
  current: 0,
  navAllHeight: 0,
  nickname: '', // 名称
  avatarUrl: '', // 头像
  userId: '',
  level: 0, // 0：非会员, 1: 初级会员, 2: 高级会员, 3: 企业会员
  isNewUser: true, // 是否是新用户
})
</script>

<style lang="scss" scoped>
.content {
  .nav {
    justify-content: space-between;
  }
  .btn {
    width: 320rpx;
    height: 120rpx;
    line-height: 120rpx;
    border-radius: 20rpx;
    background-color: #F5F3EF;
    position: relative;
    text-align: center;
    .icon{
      display: inline-block;
      width: 50rpx;
      height: 50rpx;
      vertical-align: middle;
    }
    .text {
      font-size: 28rpx;
      font-weight: 600;
      color: #232322;
    }
    .count {
      position: absolute;
      right: 45rpx;
      top: 25rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      font-size: 20rpx;
      font-weight: 500;
      color: #ffffff;
      border-radius: 32rpx;
      background-color: #FF3434;
    }
  }
  .tabs {
    width: 100%;
    white-space: nowrap;
    .text {
      display: inline-block;
      // width: 120rpx;
      font-size: 32rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #898784;
      position: relative;
      margin-right: 60rpx;
    }
    .textAct {
      color: #232322;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40rpx;
        height: 8rpx;
        background-color: #FFCF00;
      }
    }

  }
}
.add {
  position: fixed;
  right: 35rpx;
  bottom: 140rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #FFCF00;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
