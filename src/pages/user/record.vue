<template>
  <view class="content ">
    <!--  -->
    <view class="interestsList flex p35">
      <view class="card" v-for="item in userRecordList" :key="item.key" :class="state.idx == item.key ? 'cardAfter' : ''" @click="bindIdx(item.key) ">
        <view class="num mt30">{{ item.hours }}</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">{{ item.name }}</view>
      </view>
    </view>
    <!--  -->
    <scroll-view class="p0-35" scroll-y="true" style="height: 74vh; width: calc( 100% - 70rpx );">
      <view class="record ">
        <view class="li flex mt25 pb25">
          <view class="left">
            <view class="title mb15">工位预约</view>
            <view class="reservation mb8">相关预约：GW2382910382910</view>
            <view class="date">3月15日 11:37:32</view>
          </view>
          <view class="time">
            <view class="hour mb15">-10.5小时</view>
            <view class="remaining">剩余：443小时</view>
          </view>
        </view>
        <view class="li flex mt25 pb25">
          <view class="left">
            <view class="title mb15">工位预约</view>
            <view class="reservation mb8">相关预约：GW2382910382910</view>
            <view class="date">3月15日 11:37:32</view>
          </view>
          <view class="time">
            <view class="hour mb15">-10.5小时</view>
            <view class="remaining">剩余：443小时</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { userRecordList } from '/@/utils/universalArray'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  idx: 0, // 下标
  select: false, // 
  image: '',
})
// 底部
const bindIdx = ( idx: number ) => {
  state.idx = idx
}
</script>

<style lang="scss" scoped>
.content {
  .interestsList {
    .card {
      width: 150rpx;
      height: 200rpx;
      background-image: url('http://47.116.190.37:8002/static/user/interestsListBg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 26rpx;
      position: relative;
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
    .cardAsh {
      background-image: url('http://47.116.190.37:8002/static/user/interestsListBgAsh.png');
    }
    .cardAfter {
      &::after {
        content:"";
        width:0;
        height:0;
        position: absolute;
        bottom: -19rpx;
        left: 38%;
        border-top: solid 20rpx #FFCF00;
        border-right: solid 18rpx transparent;
        border-left: solid 18rpx transparent;
      }
    }
  }
  .record {
    .li {
      justify-content: space-between;
      border-bottom: 1PX solid #F5F3EF;
      .left {
        .title {
          font-size: 28rpx;
          font-weight: 600;
          line-height: 36rpx;
          color: #232322;
        }
        .reservation {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #232322;
        }
        .date {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #898784;
        }
      }
      .time {
        .hour {
          font-size: 28rpx;
          font-weight: 600;
          line-height: 36rpx;
          color: #232322;
        }
        .remaining {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #232322;
        }
      }
    }
  }
}
</style>
