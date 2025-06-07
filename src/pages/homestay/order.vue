<template>
  <view class="content p0-15">
    <view class="hotelCard p25 mt25">
      <view class="hotel mb25">
        <image
          class="banner mr20"
          src="https://ritmohub.cn/uploads/homepage/en/en_carousel_1743043442.png"></image>
        <view class="center">
          <view class="name mt10">房型一</view>
          <view class="text">60㎡ · 2室1厅2卫 · 2床 · 可住4人</view>
        </view>
      </view>
      <!--  -->
      <view class="line mb25"></view>
      <view class="count p25">
        <view
          class=""
          style="display: flex">
          <view class="date mr45">
            <view class="day">
              5月9日
              <text class="week">明天</text>
            </view>
            <view class="text"> 入住时间: 14:00以后 </view>
          </view>
          <view class="date">
            <view class="day">
              5月9日
              <text class="week">明天</text>
            </view>
            <view class="text"> 离店时间: 12:00以前 </view>
          </view>
        </view>
        <view class="num"> 共4晚 </view>
      </view>
      <!--  -->
      <view class="form">
        <view class="li p15-0">
          <view class="label">房间数 </view>
          <view class="text"> 1间(每间可入住两人） </view>
        </view>
        <view class="li p15-0">
          <view class="label">入住人 <text class="icon">*</text></view>
          <view class="input">
            <u-input
              v-model="state.value"
              :border="false"
              placeholder="每间房填写一位入住人信息" />
          </view>
        </view>
        <view class="li p15-0">
          <view class="label">手机号 <text class="icon">*</text></view>
          <view class="input">
            <u-input
              v-model="state.value"
              :border="false"
              placeholder="用于接受信息和预订" />
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="priceCrad mt25 p25">
      <view class="price">
        <view class="label">价格明细</view>
        <view
          class="text"
          style="color: #ff3434">
          共
          <text
            class=""
            style="font-size: 26rpx"
            >¥</text
          >
          1152
        </view>
      </view>
      <view class="li m25-0">
        <view class="label">房费（¥288*1间*4晚）</view>
        <view
          class="text"
          style="color: #898784"
          >¥1152</view
        >
      </view>
      <view class="li">
        <view class="label">促销活动</view>
        <view
          class="text"
          style="color: #ff3434"
          >-¥10</view
        >
      </view>
    </view>
    <!--  -->
    <view class="footer flex">
      <view class="left">
        <view class="price">
          <text class="text"> {{ t('total') }} : </text>
          <text class="num">¥100</text>
        </view>
      </view>
      <view class="right">
       去支付
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import bottomOperation from '/@/components/bottomOperation.vue';
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import Login from '/@/api/login';
import { onLoad } from '@dcloudio/uni-app';
const loginApi = new Login();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {});
const state = reactive({
  value: ''
});
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>
.content {
  .hotelCard {
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #ffffff;
    border-radius: 12rpx;
    .hotel {
      display: flex;
      .banner {
        display: inline-block;
        width: 130rpx;
        height: 100rpx;
        border-radius: 6rpx;
      }
      .center {
        width: calc(100% - 175rpx);
        .name {
          font-weight: 600;
          font-size: 28rpx;
          line-height: 44rpx;
          color: #232322;
        }
        .text {
          font-weight: 500;
          font-size: 24rpx;
          color: #232322;
        }
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background-color: #f5f3ef;
    }
    .count {
      background-color: #f5f3ef;
      border-radius: 10rpx;
      display: flex;
      justify-content: space-between;
      .date {
        .day {
          font-weight: 600;
          font-size: 36rpx;
          color: #232322;
          .week {
            font-weight: 500;
            font-size: 24rpx;
          }
        }
        .text {
          font-weight: 500;
          font-size: 20rpx;
          color: #898784;
        }
      }
      .num {
        line-height: 75rpx;
        font-weight: 500;
        font-size: 20rpx;
        color: #898784;
      }
    }
    .form {
      .li {
        display: flex;
        border-bottom: 1px solid #f5f3ef;
        line-height: 72rpx;
        &:last-child {
          border-bottom: none !important;
        }
        .label {
          width: 140rpx;
          font-weight: 500;
          font-size: 32rpx;
          color: #232322;
          .icon {
            color: #ff0000;
          }
        }
        .text {
          font-weight: 500;
          font-size: 32rpx;
          color: #232322;
        }
      }
    }
  }
  .priceCrad {
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #ffffff;
    border-radius: 12rpx;
    .price {
      display: flex;
      justify-content: space-between;
      .label {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 44rpx;
        color: #232322;
      }
      .text {
        font-weight: 600;
        font-size: 32rpx;
        line-height: 52rpx;
      }
    }
    .li {
      display: flex;
      justify-content: space-between;
      .label {
        font-weight: 500;
        font-size: 28rpx;
        color: #898784;
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 25rpx 35rpx;
    height: 180rpx;
    background-color: #ffffff;
    justify-content: space-between;
    .left {
      .price {
        .text {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 80rpx;
          color: #232322;
        }
        .num {
          font-size: 40rpx;
          font-weight: 600;
          line-height: 52rpx;
          color: #ff3434;
        }
      }
    }
    .right {
      width: 200rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #232322;
      background-color: #ffcf00;
    }
  }
}
</style>
