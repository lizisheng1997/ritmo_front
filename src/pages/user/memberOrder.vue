<template>
  <view class="content p35">
    <view class="card p35">
      <view class="count flex p0-55">
        <text class="num">4人</text>
        <image class="icon mt25" src="http://47.116.190.37:8002/static/user/memberOrderCradD.png"></image>
        <text class="num">8人</text>
      </view>
      <view class="fub">扩容</view>
      <view class="title mt35">大鱼网络有限公司</view>
      <view class="dateText mt35">扩容时间</view>
      <view class="day mt25">238天</view>
      <view class="info">
        <view class="li flex mt25">
          <text class="label">操作人：</text>
          <text class="text">段誉</text>
        </view>
        <view class="li flex mt25">
          <text class="label">所属机构：</text>
          <text class="text">大鱼网络有限公司</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="order mt35 p35">
      <view class="title mb35">
        订单明细
      </view>
      <view class="expansion mb10 flex">
        <view class="text">成员扩容</view>
        <view class="price">¥3000</view>
      </view>
      <view class="count">
        5人 × 238天
      </view>
      <view class="all">
        总计
        <text class="">¥3000</text>
      </view>
    </view>
    <!--  -->
    <view class="pay p35 flex">
      <view class="price">
        <text class="all">总计：</text>
        <text class="unit" style="font-size: 28rpx;">￥</text>
        <text class="unit">3000</text>
      </view>
      <view class="btn">确认扩容</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .card {
    height: 668rpx;
    background-image: url('http://47.116.190.37:8002/static/user/memberOrderCardBg.png.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // box-shadow: 0px 2px 10px 0px #0000001A;
    .count {
      justify-content: space-between;
      .num {
        display: inline-block;
        font-size: 48rpx;
        font-weight: 700;
        line-height: 64rpx;
        color: #232322;
      }
      .icon {
        display: inline-block;
        width: 140rpx;
        height: 24rpx;
        vertical-align: middle;
      }
    }
    .fub {
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
      color: #232322;
      margin-top: -10rpx;
      vertical-align: top;
    }
    .title {
      line-height: 100rpx;
      border-radius: 10rpx;
      background: #FFCF001A;
      border: 1px solid #FFCF00;
      text-align: center;
      color: #232322;
      font-size: 28rpx;
      font-weight: 600;
    }
    .dateText {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      text-align: center;
      color: #898784;
    }
    .day {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      text-align: center;
      color: #232322;
    }
    .info {
      margin-top: 100rpx;
      padding-top: 15rpx;
      border-top: 1PX dashed #D7D4CF;
      .li {
        justify-content: space-between;
        .label {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #898784;
        }
        .text {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
  .order {
    border-radius: 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px 0px #0000001A;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      color: #232322;
    }
    .expansion {
      justify-content: space-between;
      text {
        display: inline-block;
        line-height: 36rpx;
        font-size: 28rpx;
        color: #232322;
      }
      .text {
        font-weight: 400;
      }
      .price {
        font-weight: 600;
      }
    }
    .count {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #898784;
    }
    .all {
      margin-top: 45rpx;
      padding-top: 35rpx;
      border-top: 1PX dashed #D7D4CF;
      text-align: right;
      font-size: 28rpx;
      font-weight: 400;
      color: #232322;
      text {
        font-weight: 600;
      }
    }
  }
  .pay {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 16px 0px #00000026;
    justify-content: space-between;
    .price {
      line-height: 80rpx;
      text {
        display: inline-block;
      }
      .all {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #232322;
      }
      .unit {
        font-size: 40rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #FF3434;
      }
    }
    .btn {
      width: 208rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 20rpx;
      background-color: #FFCF00;
      font-size: 32rpx;
      font-weight: 600;
      color: #232322;
    }
  }
}
</style>
