<template>
  <view class="content" v-if="state.info">
    <view class="back" @click="routerBack(1)">
      <image class="icon" src="/@/static/iconLeftBlack.png"></image>
    </view>
    <swiper class="swiper" circular indicator-dots autoplay >
      <template v-for="(item, index) in state.info.images" :key="index">
        <swiper-item v-if=" state.info.images >= 4 ? index <= 4 : index <= state.info.images.length -1 ">
          <image class="imageW100" :src="item"></image>
        </swiper-item>
      </template>
    </swiper>
    <!--  -->
    <view class="album pl5" @click="routerTo(`/pages/space/album?id=${state.id}`)">
      相册
      <image class="icon" src="https://ritmohub.cn/static/iconLeftW.png"> </image>
    </view>
    <!--  -->
    <view class="center p35">
      <view class="name mb20">
        {{ state.info.name }}
      </view>
      <view class="distance"> {{ state.info.business_hours }}</view>
      <view class="read mt35">
        {{ state.info.intro }}
      </view>
      <!--  -->
      <view class="tabs flex mt35">
        <view class="text pb25" :class=" index == state.current ? 'textAct' : '' " v-for=" (item, index) in list " @click="state.current = index">{{ item }}</view>
      </view>
      <template v-if="state.current == 0">
        <view class="cards">
          <view class="card m10" v-for=" (item, index) in state.info.services" :key="index">
            <image class="icon mt15" src="https://ritmohub.cn/static/space/icon (1).png"></image>
            <view class="text">{{ item.name }}</view>
          </view>
        </view>
      </template>
      <!--  -->
      <template v-else-if="state.current == 1">
        <view class="info mt35" v-if="state.info.workspace_basic_intro">
          <view class="title mb25">初级工位</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.workspace_basic_intro }}</view>
        </view>
        <!--  -->
        <view class="info mt35" v-if="state.info.workspace_premium_intro">
          <view class="title mb25">高级工位</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.workspace_premium_intro }}</view>
        </view>
        <!--  -->
        <view class="info mt35" v-if="state.info.meeting_room_basic_intro">
          <view class="title mb25">基础会议室</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.meeting_room_basic_intro }}</view>
        </view>
        <!--  -->
        <view class="info mt35" v-if="state.info.meeting_room_premium_intro">
          <view class="title mb25">高级会议室</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.meeting_room_premium_intro }}</view>
        </view>
        <!--  -->
        <view class="info mt35" v-if="state.info.office_intro">
          <view class="title mb25">办公室</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.office_intro }}</view>
        </view>
        <!--  -->
        <view class="info mt35" v-if="state.info.showcase_intro">
          <view class="title mb25">展示柜</view>
          <!-- <image class="banner mb25" src="https://ritmohub.cn/static/addHead.png"></image> -->
          <view class="text">{{ state.info.showcase_intro }}</view>
        </view>
      </template>
      <!--  -->
      <template v-else-if="state.current == 2">
        <view class="info mt35">
          <view class="title mb25">交通方式</view>
          <view class="text">{{ state.info.traffic }}</view>
        </view>
        <!--  -->
        <view class="info mt35">
          <view class="title mb25">周边停车</view>
          <view class="text">{{ state.info.parking }}</view>
        </view>
        <!--  -->
        <view class="info mt35">
          <view class="title mb25">周边餐饮</view>
          <view class="text">{{ state.info.dining }}</view>
        </view>
      </template>
      <!--  -->
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id
  getInfo()
});
// 参数
let list = ['服务', '设施', '周边']
const state = reactive({
  id: '', 
  info: {} as any,
  current: 0,
})
const getInfo = () => {
  spaceApi.getSpaceInfo(state.id).then((res: any) => {
    console.log(res.data);
    state.info = res.data
  })
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
