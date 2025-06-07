<template>
  <view class="content">
    <view class="homestayBanner">
      <image class="image" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
      <view class="swiper p10">
        <image class="item" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <image class="item" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <image class="item" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <image class="item" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <image class="item" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <view class="count">+6</view>
      </view>
    </view>
    <!--  -->
    <view class="homestayCard p25">
      <view class="homestay">
        <view class="name">飞茑集民宿（松阳店）</view>
        <view class="details">
          详情
          <image class="icon" src="../../static/rightBlack.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="evaluate mt25">
        <view class="div">
          <image class="icon" src="../../static/community/starAct.png"></image>
          <text class="num">4.9</text>
          <text class="text">
            “房间很干净,服务很好,风景很不错...”
          </text>
        </view>
        <view class="details ">
          285人已评价
          <image class="icon" src="../../static/rightBlack.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="address mt35">
        <view class="text mt10">
          民宿地址民宿地址民宿地址民宿地址民宿地址民宿地址
        </view>
        <view class="btns">
          <view class="btn">
            <u-icon name="phone-fill" color="#FFCF00"></u-icon>
          </view>
          <view class="btn ml15">
            <u-icon name="tags-fill" color="#FFCF00"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="listCard p10">
      <view class="date p0-25">
        <view class="left">
          <text class="text">5月9日</text>
          <text class="day">明天</text>
          <text class="count m0-25">4晚</text>
          <text class="text">5月13日</text>
          <text class="day">周二</text>
        </view>
        <view class="hotel">1间·1人</view>
      </view>
      <view class="div">
        <view class="li  p10">
          <image class="banner" src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
          <view class="center">
            <view class="name">
              房型1
            </view>
            <view class="city m10-0">
              60㎡ · 2室1厅2卫 · 2床 · 可住4人
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
              <text class="btn ml25"  @click="routerTo(`/pages/homestay/order`)">订</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="hotelTitle mt35 ml35">
      房屋概况
    </view>
    <view class="introduceCard p25 ">
      <view class="text">
        融合自然与现代，位于风景秀丽的山间，周围绿树环绕，空气清新，是远离城市喧嚣、享受静谧时光的理想之地。
      </view>
      <view class="title m15-0">设施/服务</view>
      <view class="text">
        投影投影投影投影投影投影投影投影
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
});
// 
</script>

<style >
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>
.content {
  .homestayBanner {
    width: 100%;
    height: 680rpx;
    position: relative;
    .image {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .swiper {
      position: absolute;
      left: 37rpx;
      top: 390rpx;
      display: flex;
      justify-content: space-between;
      width: 670rpx;
      background-color: #FFFFFF;
      border-radius: 16rpx;
      .item {
        display: inline-block;
        width: 116rpx;
        height: 116rpx;
        border-radius: 8rpx;
      }
      .count {
        width: 116rpx;
        line-height: 116rpx;
        border-radius: 8rpx;
        position: absolute;
        right: 10rpx;
        top: 10rpx;
        background-color: #363232;
        opacity: 0.8;
        font-weight: 500;
        font-size: 28rpx;
        text-align: center;
        color: #FFFFFF;
      }
    }
  }
  .homestayCard {
    background-color: #FFFFFF;
    border-radius: 48rpx 0 48rpx 48rpx;
    margin-top: -60rpx;
    position: relative;
    .homestay {
      display: flex;
      justify-content: space-between;
      .name {
        font-weight: 600;
        font-size: 40rpx;
        line-height: 44rpx;
        color: #232322;
        width: 520rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .details {
        font-weight: 500;
        font-size: 28rpx;
        color: #232322;
        .icon {
          display: inline-block;
          width: 34rpx;
          height: 36rpx;
          vertical-align: middle;
        }
      }
    }
    .evaluate {
      display: flex;
      justify-content: space-between;
      .div {
        display: flex;
        .icon {
          display: inline-block;
          width: 36rpx;
          height: 36rpx;
          vertical-align: middle;
          margin: 1px 10rpx 0 0;
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
          font-size: 28rpx;
          line-height: 36rpx;
        }
      }
      .details {
        font-weight: 500;
        font-size: 28rpx;
        color: #232322;
        .icon {
          display: inline-block;
          width: 34rpx;
          height: 36rpx;
          vertical-align: middle;
        }
      }
    }
    .address {
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 28rpx;
        line-height: 36rpx;
        color: #232322;
        width: 500rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btns {
        display: flex;
        .btn {
          background-color: #a08708;
          width: 64rpx;
          height: 64rpx;
          border-radius: 32rpx;
          display: flex;
          justify-content: center;
          text-align: center;
        }
      }
    }
  }
  .listCard {
    margin: 10rpx;
    border-radius: 12rpx;
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #FFFFFF;
    .date {
      display: flex;
      justify-content: space-between;
      .left {
        text {
          display: inline-block;
        }
        .text {
          font-weight: 600;
          font-size: 36rpx;
          color: #232322;
        }
        .day {
          font-weight: 500;
          font-size: 28rpx;
          color: #232322;

        }
        .count {
          font-weight: 500;
          font-size: 18rpx;
          color: #232322;
          width: 40rpx;
          line-height: 18rpx;
          text-align: center;
          border-radius: 18rpx;
          border: 1PX solid #232322;
          vertical-align: middle;
          margin-top: -10rpx;
        }
      }
      .hotel {
        line-height: 54rpx;
      }
    }
    .div {
      .li {
        display: flex;
        .banner {
          display: inline-block;
          width: 180rpx;
          height: 200rpx;
          border-radius: 8rpx;
          margin-right: 25rpx;
        }
        .center {
          width: calc( 100% - 210rpx );
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
            .btn {
              display: inline-block;
              width: 70rpx;
              line-height: 60rpx;
              text-align: center;
              background-color: #FFCF00;
              border-radius: 16rpx;
              font-weight: 600;
              font-size: 28rpx;
              color: #232322;
            }
          }
        }

      }
    }
  }
  .hotelTitle {
    font-weight: 600;
    font-size: 40rpx;
    line-height: 44rpx;
    color: #232322;
  }
  .introduceCard {
    margin: 20rpx 10rpx 10rpx;
    border-radius: 12rpx;
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #FFFFFF;
    .title {
      font-weight: 600;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #232322;
    }
    .text {
      font-weight: 500;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #232322;

    }
  }
}
</style>
