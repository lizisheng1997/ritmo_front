<template>
  <!-- 空间首页下面预约时间-不可点击  -->
  <view class="times">
    <view class="axis mt25 flex" v-for="( titem, tidx ) in spaceTimeArr" :key="tidx" >
      <view class="axis-piece" v-for="( stitem, stidx ) in titem" :key="stidx" style="flex: 1;">
        <text class="pre" :class=" props.seleceList.includes(stitem.slot)  ? 'pre1' : '' "></text>
        <text class="time">{{  stidx %2 == 0  ? stitem.time : '' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { spaceTimeArr } from '/@/utils/universalArray';

// 参数
const props = defineProps({
  seleceList: {
    type: Array as any,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>

.times {
  .axis {
    .axis-piece {
      position: relative;
      padding-bottom: 25rpx;
      &:first-child {
        .time {
          left: 0 !important;
        }
      }
      
      &:nth-child(odd) {
        .pre {
          &::after {
            height: 16rpx !important;
          }
        }
      }
    }
    .pre {
      display: inline-block;
      height: 32rpx;
      width: 100%;
      background-color: #F1F0EE;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 6rpx;
        width: 2rpx;
        height: 10rpx;
        background-color: #C3BCB4;
      }
    }
    .pre1 {
      &::before {
        content: '';
        position: absolute;
        bottom: 6rpx;
        width: 100%;
        height: 20rpx;
        background-color: #C3BCB4;
        opacity: 0.5;
      }
    }
    .time {
      position: absolute;
      bottom: 0;
      left: -45%;
      display: inline-block;
      font-size: 20rpx;
      font-weight: 400;
      line-height: 24rpx;
      color: #898784;
    }
  }
}
</style>