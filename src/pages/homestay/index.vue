<template>
  <view class="content">
    <view class="position">
      <image class="back" src="../../static/iconLeftBlack.png"></image>
      <view class="city">
        丽水
        <image class="cityIcon" src="../../static/iconDownBlack.png"></image>
      </view>
      <view class="input">
        <u-input v-model="state.value" :border="false" placeholder="位置/民宿名/编号" />
      </view>
      <view class="myPlace">
        <image class="myPlaceIcon" src="../../static/myPlace.png"></image>
        <view class="text">我的位置</view>
      </view>
    </view>
    <!--  -->
    <view class="range p25-0">
      <view class="date">
        5月9日
        <view class="week">明天</view>
        <view class="icon">-</view>
        5月9日
        <view class="week">周二</view>
      </view>
      <view class="day">
        共4晚
      </view>
    </view>
    <!--  -->
    <view class="count p25-0">
      人数/床数/居室数 <image class="icon ml5" src="../../static/iconDownBlack.png"></image>
    </view>
    <!--  -->
    <view class="tags">
      <view class="tag tagAct">古堰画乡景区</view>
      <view class="tag">杨家塘村</view>
      <view class="tag">仙都景区</view>
    </view>
    <view class="btn mt35" @click="routerTo(`/pages/homestay/list`)">
      开始搜索
    </view>
    <!--  -->
    <view class="hot mt25">
      民宿推荐
      <image class="icon" src="../../static/rightBlack.png"></image>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
const loginApi = new Login();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
});
const state = reactive({
  value: '',
})
</script>

<style >
page {
  background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 88rpx 35rpx 0 35rpx;
  .position {
    display: flex;
    padding-bottom: 25rpx;
    .back {
      display: inline-block;
      width: 54rpx;
      height: 54rpx;
      margin-top: 8rpx;
    }
    .city {
      width: 140rpx;
      text-align: center;
      height: 38rpx;
      line-height: 38rpx;
      border-right: 1PX solid #F5F3EF;
      margin: 16rpx 20rpx 0 0;
      font-weight: 600;
      font-size: 36rpx;

      .cityIcon {
        display: inline-block;
        width: 24rpx;
        height: 28rpx;
      }
    }
    .myPlace {
      width: 100rpx;
      text-align: center;
      .myPlaceIcon {
        display: inline-block;
        width: 28rpx;
        height: 28rpx;
      }
      .text {
        font-weight: 500;
        font-size: 20rpx;
        letter-spacing: 0px;
        color: #898784;

      }
    }
  }
  .range {
    display: flex;
    width: 100%;
    border-top: 1PX solid #F5F3EF;
    border-bottom: 1PX solid #F5F3EF;
    .date {
      width: calc( 100% - 110rpx );
      font-weight: 600;
      font-size: 36rpx;
      view {
        display: inline-block;
      }
      .week {
        font-weight: 500 !important;
        font-size: 28rpx !important;
      }
      .icon {
        height: 1px;
        margin: 0 15rpx;
        font-weight: 200 !important;
        color: #898784;
      }
    }
    .day {
      text-align: right;
      width: 110rpx;
      line-height: 54rpx;
    }
  }
  .count {
    font-weight: 500;
    font-size: 16px;
    color: #232322;
    .icon {
      display: inline-block;
      width: 24rpx;
      height: 28rpx;
    }
  }
  .tags {
    display: flex;
    .tag {
      display: inline-block;
      padding: 0 20rpx;
      line-height: 50rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #898784;
      border-radius: 5rpx;
    }
    .tagAct {
      background: #FFC75B29;
      color: #FA9847;
    }
  }
  .btn {
    width: 100%;
    font-weight: 600;
    font-size: 36rpx;
    line-height: 88rpx;
    text-align: center;
    color: #232322;
    background-color: #FFCF00;
    border-radius: 20rpx;
  }
  .hot {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 32rpx;
    color: #232322;
    .icon {
      display: inline-block;
      width: 44rpx;
      height: 46rpx;
    }
  }
}
</style>
