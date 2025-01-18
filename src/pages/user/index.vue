<template>
  <view class="content">
    <view class="info">
      <view class="user flex p0-35">
        <view class="left">
          <view class="name oneEllipsis">Hacker</view>
          <view class="id mt10">ID：3721881923</view>
        </view>
        <view class="right">
          <image class="head" src="/@/static/home/head.png"></image>
          <image class="icon" src="/@/static/rightBlack.png" @click="routerTo(`/pages/user/personalData`)"></image>
        </view>
      </view>
      <view class="vip flex m0-35">
        <view class="left ml35">
          <view class="grade mt35">
            普通成员
            <image class="icon" src="/@/static/rightBlack.png"></image>
          </view>
          <view class="date mt15">
            开通会员最高享受10项专属权益
          </view>
        </view>
        <view class="right mt45 mr45">
          开通会员
        </view>
      </view>
      <image class="bg" src="/@/static/user/userBotBg.png"></image>
    </view>
    <!--  -->
    <view class="interests mt55 flex p0-35">
      <view class="title">
        <text class="text">我的权益</text>
        <text class="fub ml15">暂无可用权益</text>
      </view>
      <view class="record">
        变更记录
        <image class="icon" src="/@/static/rightAsh.png" @click="routerTo(`/pages/user/record`)"></image>
      </view>
    </view>
    <view class="interestsList p0-35 flex mt35">
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
    </view>
    <view class="menuForm mt35 p0-35">
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/home/switch.png"></image>
          切换身份
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/user/menu7.png"></image>
          我的人脸 
        </view>
        <view class="right flex">
          <text class="text1">暂无图片</text>
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/user/menu2.png"></image>
          图片上传 
        </view>
        <view class="right flex">
          <text class="text1">暂无图片</text>
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/user/menu3.png"></image>
          邀请好友
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/user/menu4.png"></image>
          我的预约
        </view>
        <view class="right flex">
          <text class="text2">2 待使用</text>
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/memberMana`)">
        <view class="left">
          <image class="icon" src="/@/static/user/menu4.png"></image>
          成员管理
        </view>
        <view class="right flex">
          <text class="text2">2/10</text>
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          <image class="icon" src="/@/static/user/menu5.png"></image>
          我的订单
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/setUp`)">
        <view class="left">
          <image class="icon" src="/@/static/user/menu6.png"></image>
          设置
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad(() => {
})
// 参数
const state = reactive({
  status: 0, //  
})
</script>

<style lang="scss" scoped>
.content {
  .info {
    height: 440rpx;
    background-color: #F5F3EF;
    position: relative;
    .bg {
      width: 100%;
      height: 24rpx;
      position: absolute;
      left: 0;
      bottom: -5rpx;
    }
    .user {
      padding-top: 120rpx;
      justify-content: space-between;
      .left {
        .name {
          width: 440rpx;
          font-size: 48rpx;
          font-weight: 600;
          line-height: 64rpx;
          color: #232322;
        }
      }
      .right {
        .head {
          display: inline-block;
          width: 120rpx;
          height: 120rpx;
          border-radius: 120rpx;
        }
        .icon {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          vertical-align: top;
          margin-top: 35rpx;
        }
      }
    }
    .vip {
      margin-top: 38rpx;
      height: 160rpx;
      background-image: url('/@/static/user/vip1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      justify-content: space-between;
      .left {
        .grade {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 44rpx;
          color: #232322;
          .icon {
            display: inline-block;
            width: 40rpx;
            height: 40rpx;
            vertical-align: middle;
            margin-top: -3rpx;
          }
        }
        .date {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 28rpx;
          color: #898784;
        }
      }
      .right {
        width: 140rpx;
        height: 48rpx;
        line-height: 48rpx;
        border-radius: 6rpx;
        text-align: center;
        font-size: 24rpx;
        font-weight: 500;
        color: #232322;
        background-color: #fff;
      }
    }
  }
  .interests {
    justify-content: space-between;
    .title {
      .text {
        display: inline-block;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: #232322;
      }
      .fub {
        display: inline-block;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #898784;
      }
    }
    .record {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #898784;
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        margin-top: -3rpx;
      }
    }
  }
  .interestsList {
    .card {
      width: 150rpx;
      height: 200rpx;
      background-image: url('/@/static/user/interestsListBg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 26rpx;
      &:last-child {
        margin-right: 0 !important;
      }
      .num {
        text-align: center;
        font-size: 40rpx;
        font-weight: 700;
        line-height: 48rpx;

      }
      .text {
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;
        text-align: center;
        color: #232322;
      }
      .grade {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 28rpx;
        text-align: center;
        color: #232322;
      }
    }
  }
}
</style>
