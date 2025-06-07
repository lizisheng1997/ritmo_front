<template>
  <view class="content">
    <view class="position p0-35">
      <image class="back" src="../../static/iconLeftBlack.png"></image>
      <view class="city ml15">
        <view class="cityName pl15">丽水</view>
        <view class="date ml25">
          <view class="mt5">
            <text class="text">住</text>
            5.09
          </view>
          <view class="">
            <text class="text">离</text>
            5.09
          </view>
        </view>
      </view>
      
      <view class="myPlace">
        <image class="myPlaceIcon" src="../../static/collect.png"></image>
        <view class="text">收藏</view>
      </view>
    </view>
    <!--  -->
    <view class="search p0-20">
      <view class="item">
        位置区域
        <image class="icon" src="../../static/iconDownBlack.png"></image>
      </view>
      <view class="item">
        价格/人数
        <image class="icon" src="../../static/iconDownBlack.png"></image>
      </view>
      <view class="item">
        智能排序
        <image class="icon" src="../../static/iconDownBlack.png"></image>
      </view>
    </view>
    <!--  -->
    <view class="list mt25">
      <view class="li  p10" @click="routerTo(`/pages/homestay/details`)">
        <image class="banner" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <view class="center">
          <view class="name">
            飞茑集民宿(松阳店)
          </view>
          <view class="city m10-0">
            <image class="icon" src="../../static/address.png"></image>
            北京市
          </view>
          <view class="evaluate">
            <image class="icon" src="../../static/community/starAct.png"></image>
            <text class="num">4.9</text>
            <text class="text">
              “房间很干净,服务很好,风景很不错...”
            </text>
          </view>
          <view class="tags mt10">
            <view class="tag">影音房</view>
            <view class="tag">影音房</view>
            <view class="tag">影音房</view>
          </view>
          <view class="price">
            <text class="unit">￥</text>
            <text class="num">388</text>
            <text class="text">起</text>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import bottomOperation from '/@/components/bottomOperation.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
import { onLoad } from '@dcloudio/uni-app';
const loginApi = new Login();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: t('Settings')
  });
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
  padding: 88rpx 0 0 0;
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
      width: calc( 100% - 155rpx );
      height: 80rpx;
      border: 1PX solid #D7D4CF;
      border-radius: 10rpx;
      display: flex;
      .cityName {
        display: inline-block;
        line-height: 70rpx;
        font-weight: 600;
        font-size: 36rpx;
      }
      .date {
        font-weight: 600;
        font-size: 12px;
        color: #232322;
        .text {
          font-weight: 400 !important;
          color: #898784;
        }
      }

    }
    .myPlace {
      width: 80rpx;
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
  .search {
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      font-weight: 500;
      font-size: 24rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 24rpx;
        height: 28rpx;
        vertical-align: middle;
        margin-top: -3rpx;
      }
    }
  }
  .list {
    background: linear-gradient(360deg, #FFFFFF 16.1%, #FFD400 328.81%);
    padding: 25rpx 25rpx 0 25rpx;
    .li {
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px #c1c1c1;
      border-radius: 15rpx;
      display: flex;
      .banner {
        display: inline-block;
        width: 216rpx;
        height: 216rpx;
        border-radius: 8rpx;
        margin-right: 25rpx;
      }
      .center {
        width: calc( 100% - 245rpx );
        .name {
          font-weight: 600;
          font-size: 28rpx;
          line-height: 44rpx;
          color: #232322;
        }
        .city {
          font-weight: 500;
          font-size: 20rpx;
          color: #232322;
          .icon {
            display: inline-block;
            width: 20rpx;
            height: 22rpx;
          }
        }
        .evaluate {
          display: flex;
          .icon {
            display: inline-block;
            width: 22rpx;
            height: 22rpx;
            vertical-align: middle;
            margin: 3px 10rpx 0 0;
          }
          .num {
            font-weight: 500;
            font-size: 24rpx;
            color: #FFCF00;

          }
          .text {
            display: inline-block;
            width: 360rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 18rpx;
            line-height: 36rpx;
          }
        }
        .tags {
          display: flex;
          .tag {
            display: inline-block;
            padding: 10rpx 8rpx;
            border-radius: 5rpx;
            background-color: #F5F3EF;
            color: #898784;
            font-weight: 400;
            font-size: 16rpx;
            line-height: 1;
            margin-right: 15rpx;

          }
        }
        .price {
          text-align: right;
          .unit {
            font-weight: 500;
            font-size: 20rpx;
            color: #E93516;

          }
          .num {
            font-weight: 500;
            font-size: 36rpx;
            color: #E93516;
          }
          .text {
            font-weight: 500;
            font-size: 20rpx;
            color: #898784;
          }
        }
      }

    }

  }
}
</style>
