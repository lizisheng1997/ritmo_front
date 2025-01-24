<template>
  <view class="content">
    <view class="back" @click="routerBack(1)">
      <image class="icon" src="http://47.116.190.37:8002/static/icon_left_black@2x.png"></image>
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
    <view class="album pl5" @click="routerTo('/pages/space/album')">
      相册
      <image class="icon" src="http://47.116.190.37:8002/static/iconLeftW.png"> </image>
    </view>
    <!--  -->
    <view class="center p35">
      <view class="name mb20">
        杭州·顺丰中心节奏空间
      </view>
      <view class="distance">00:00～24:00</view>
      <view class="read mt35">
        {{ state.content }}
      </view>
      <!--  -->
      <view class="tabs flex mt35">
        <view class="text pb25" :class=" index == state.current ? 'textAct' : '' " v-for=" (item, index) in list " @click="state.current = index">{{ item }}</view>
      </view>
      <!--  -->
      <view class="cards">
        <view class="card m10">
          <image class="icon mt15" src="http://47.116.190.37:8002/static/space/icon (1).png"></image>
          <view class="text">WIFI</view>
        </view>
      </view>
      <!--  -->
      <view class="info mt35">
        <view class="title mb25">初级工位</view>
        <image class="banner mb25" src="http://47.116.190.37:8002/static/addHead.png"></image>
        <view class="text">配备人体工学椅，27寸4k显示器，每个桌面配备插座供电，有贴心的照明系统。</view>
      </view>
      <!--  -->
      <view class="info mt35">
        <view class="title mb25">高级工位</view>
        <image class="banner mb25" src="http://47.116.190.37:8002/static/addHead.png"></image>
        <view class="text">配备人体工学椅，27寸4k显示器，每个桌面配备插座供电，有贴心的照明系统。</view>
      </view>
      <!--  -->
      <view class="info mt35">
        <view class="title mb25">交通方式</view>
        <view class="text">大运河地铁站 200m；
          14路、230路、9路公交车</view>
      </view>
      <!--  -->
      <view class="info mt35">
        <view class="title mb25">周边停车</view>
        <view class="text">地下车库，地面车位，5元/小时</view>
      </view>
      <!--  -->
      <view class="info mt35">
        <view class="title mb25">周边餐饮</view>
        <view class="text">星巴克、KFC、古茗、外婆家等</view>
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
let list = ['服务', '设施', '周边']
const state = reactive({
  type: 0, // 0工位1会议室2办公室3展示柜
  content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
  current: 0,
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

<style >
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  background-color: #FFFFFF;
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
  .album {
    position: absolute;
    left: 35rpx;
    top: 388rpx;
    width: 100rpx;
    height: 36rpx;
    line-height: 36rpx;
    font-size: 20rpx;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    border-radius: 36rpx;
    background-color: #232322;
    z-index: 9999;
    .icon {
      display: inline-block;
      width: 32rpx;
      height: 32rpx;
      transform: rotate(180deg);
      vertical-align: middle;
    }
  }
  .center {
    .name {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 48rpx;
      color: #232322;
    }
    .distance {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 24rpx;
      color: #898784;
    }
    .read {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .tabs {
      border-bottom: 1PX solid #F5F3EF;
      .text {
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
    .cards {
      overflow: hidden;
      .card {
        float: left;
        width: 110rpx;
        height: 110rpx;
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
    .info {
      .title {
        font-size: 28rpx;
        font-weight: 600;
        line-height: 36rpx;
        color: #232322;
      }
      .banner {
        display: inline-block;
        width: 100%;
      }
      .text {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #232322;
      }
    }
  }
}
</style>
