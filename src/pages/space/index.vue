<template>
  <view class="content">
    <view class="introduce" :style="{ paddingTop: state.navAllHeight + 'rpx' }">
      <div class="p0-35">
        <view class="name mb10">
          杭州·顺丰中心节奏空间
          <image class="icon" src="/@/static/rightBlack.png"></image>
        </view>
        <view class="distance">
          距您200m
        </view>
        <swiper class="swiper mt15" circular indicator-dots autoplay >
          <swiper-item>
            <image class="imageW100" src="/@/static/loginBg.png"></image>
          </swiper-item>
          <swiper-item>
            <image class="imageW100" src="/@/static/loginBg.png"></image>
          </swiper-item>
          <swiper-item>
            <image class="imageW100" src="/@/static/loginBg.png"></image>
          </swiper-item>
        </swiper>
        <view class="distance m15-0">杭州市拱康路1号顺丰中心A座13楼1304室</view>
        <view class="distance">00:00～24:00</view>
        <view class="spaces mt15">
          <text class="text pr15 mr15">156 工位</text>
          <text class="text pr15 mr15">10 会议室</text>
          <text class="text pr15 mr15">20 办公室</text>
          <text class="text pr15 mr15">8 展示柜 </text>
        </view>
        <view class="cards mt25">
          <view class="card mr15">
            <image class="icon mr5" src="/@/static/space/icon (1).png"></image>
            <text class="text">WIFI</text>
          </view>
          <view class="card mr15">
            <image class="icon mr5" src="/@/static/space/icon (1).png"></image>
            <text class="text">WIFI</text>
          </view>
          <view class="card ">
            <text class="text">...</text>
          </view>
        </view>
      </div>
      <view class="tabs mt35">
        <view class="text" :class=" state.tabsIdx == item.key ? 'textAct' : '' " v-for="( item, index ) in tabsList" :key="index" @click=" state.tabsIdx = index ">{{ item.name }}</view>
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  let arr = getLastSevenDays()
  arr[0].day = '今天'
  console.log(arr);
  
})
// 参数
const tabsList = ref([ { name: '工位', key: 0 }, { name: '会议室', key: 1 }, { name: '办公室', key: 2 }, { name: '展示柜', key: 3 },  ])
const state = reactive({
  status: 0, // 
  navAllHeight: 0,
  tabsIdx: 0,
})
// 获取最近七天日期以及星期
const getLastSevenDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];

  for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
          date: date.toISOString().split('T')[0], // 获取日期（YYYY-MM-DD）
          day: dayNames[date.getDay()] // 获取星期名称（通过数组索引）
      });
  }

  return days;
}
</script>

<style lang="scss" scoped>
.content {
  .introduce {
    background-color: #F5F3EF;
    .name {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 48rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        vertical-align: middle;
      }
    }
    .distance {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 24rpx;
      color: #898784;
    }
    .spaces {
      .text {
        display: inline-block;
        font-family: MiSans;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 28rpx;
        border-right: 1PX solid #898784;
        color: #898784;
        &:last-child {
          border-right: none !important;
        }
      }
    }
    .cards {
      overflow: hidden;
      .card {
        float: left;
        padding: 0 15rpx;
        line-height: 48rpx;
        background-color: #FFFFFF;
        border-radius: 10rpx;
        .icon {
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
        }
        .text {
          display: inline-block;
          font-size: 24rpx;
          font-weight: 500;
          color: #232322;
        }
      }
    }
    .tabs {
      width: 100%;
      height: 80rpx;
      .text {
        display: inline-block;
        padding: 0 35rpx;
        text-align: center;
        line-height: 80rpx;
        color: #898784;
        font-size: 28rpx;
      }
      .textAct {
        font-size: 32rpx;
        background: #ffffff;
        border-radius: 20rpx 20rpx 0 0;
        font-weight: 600;
        color: #232322;
        opacity: 1;
      }
    }
    .swiper{
      height: 470rpx;
      .imageW100 {
        border-radius: 16rpx;
      }
      .uni-swiper-wrapper {
        .uni-swiper-slides {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
