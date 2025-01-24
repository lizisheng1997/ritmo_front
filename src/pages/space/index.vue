<template>
  <view class="content">
    <view class="introduce" :style="{ paddingTop: state.navAllHeight + 'rpx' }">
      <div class="p0-35">
        <view class="name mb10">
          杭州·顺丰中心节奏空间
          <image class="icon" src="http://47.116.190.37:8002/static/rightBlack.png" @click="routerTo('/pages/space/spaceDetails')"></image>
        </view>
        <view class="distance">
          距您200m
        </view>
        <swiper class="swiper mt15" circular indicator-dots autoplay >
          <swiper-item>
            <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
          </swiper-item>
          <swiper-item>
            <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
          </swiper-item>
          <swiper-item>
            <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
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
            <image class="icon mr5" src="http://47.116.190.37:8002/static/space/icon (1).png"></image>
            <text class="text">WIFI</text>
          </view>
          <view class="card mr15">
            <image class="icon mr5" src="http://47.116.190.37:8002/static/space/icon (1).png"></image>
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
    <view class="p0-35">
      <view class="filter flex pt35">
        <template v-if="state.tabsIdx <= 1">
          <view class="grade p0-25 mr15 " :class=" state.gradeIdx == 0 ? 'gradeAct' : '' " @click="state.gradeIdx = 0">只看初级区</view>
          <view class="grade p0-25 mr15" :class=" state.gradeIdx == 1 ? 'gradeAct' : '' " @click="state.gradeIdx = 1">只看高级区</view>
        </template>
        <view class="grade p0-25 mr15" style="color: #232322;" @click="routerTo('/pages/space/distributionMap')">
          查看分布图
          <image class="icon" src="http://47.116.190.37:8002/static/space/imgs.png"></image>
        </view>
        <view class="grade p0-25 mr15" style="color: #232322;">
          筛选
          <image class="down" src="http://47.116.190.37:8002/static/icon_down_black@2x.png"></image>
        </view>
      </view>
      <view class="filterDate flex mt30 " v-if="state.tabsIdx <= 1">
        <view class="li" v-for=" (item, index) in weekDayList " :key="index" :class=" item.day == state.day ? 'liAct' : '' " @click=" state.day = item.day ">
          <view class="week mt20">{{ item.week }}</view>
          <view class="day">{{ item.day }}</view>
        </view>
      </view>
      <!-- 工位 -->
      <view class="station" v-if="state.tabsIdx == 0">
        <view class="list">
          <view class="li mt20 p20-0">
            <view class="room flex">
              <view class="left flex" @click="routerTo(`/pages/space/details?type=0`)">
                <view class="number mr20">A001</view>
                <view class="info">
                  <view class="text">
                    wifi ｜ 显示器
                  </view>
                  <view class="text mt5">
                    ¥15.5/30分钟起
                    <text class="icon ml20">初级</text>
                  </view>
                </view>
              </view>
              <view class="right" @click="routerTo(`/pages/space/reserveRoom?type=0`)">
                预定
              </view>
            </view>
            <spaceTimes :seleceList="state.sidxs"/>
          </view>
          <view class="li mt20 p20-0">
            <view class="room flex">
              <view class="left flex">
                <view class="number mr20">A001</view>
                <view class="info">
                  <view class="text">
                    wifi ｜ 显示器
                  </view>
                  <view class="text mt5">
                    ¥15.5/30分钟起
                    <text class="icon ml20">初级</text>
                  </view>
                </view>
              </view>
              <view class="right">
                预定
              </view>
            </view>
            <spaceTimes :seleceList="state.sidxs"/>
          </view>
          <!--  -->
        </view>
      </view>
      <!-- 会议室 -->
      <view class="station pb25" v-else-if="state.tabsIdx == 1">
        <view class="list">
          <view class="li mt20 p20-0">
            <view class="room flex">
              <view class="left flex" @click="routerTo(`/pages/space/details?type=1`)">
                <view class="banner mr20">
                  <image class="imageW100" src="http://47.116.190.37:8002/static/addHead.png"></image>
                </view>
                <view class="info">
                  <view class="name mb10">001会议室</view>
                  <view class="text">
                    wifi ｜ 显示器
                  </view>
                  <view class="text mt5">
                    ¥15.5/30分钟起
                    <text class="icon ml20 icon1">高级</text>
                  </view>
                </view>
              </view>
              <view class="right" @click="routerTo(`/pages/space/reserveRoom?type=1`)">
                预定
              </view>
            </view>
            <spaceTimes :seleceList="state.sidxs"/>
          </view>
          <!--  -->
        </view>
      </view>
      <!-- 办公室 -->
      <view class="office pb25 mt25" v-else-if="state.tabsIdx == 2">
        <view class="list">
          <view class="li mt20 flex pt20" @click="routerTo(`/pages/space/reserveOfficial?type=2`)">
            <view class="btn">预约</view>
            <view class="banner mr20">
              <image class="imageW100" src="http://47.116.190.37:8002/static/addHead.png"></image>
            </view>
            <view class="info" @click="routerTo(`/pages/space/details?type=2`)">
              <view class="name">001办公室</view>
              <view class="text mt10">6-7人</view>
              <view class="text">wifi ｜ 显示器 ｜ wifi ｜ 显示器 ｜ 显示器...</view>
            </view>
          </view>
          <view class="li mt20 flex pt20">
            <view class="banner mr20">
              <image class="imageW100" src="http://47.116.190.37:8002/static/addHead.png"></image>
            </view>
            <view class="info">
              <view class="name">001办公室</view>
              <view class="company mt15">
                <text class="oneEllipsis">大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司</text>
                <text class="status">租用中</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 展示柜 -->
      <view class="office pb25 mt25" v-else-if="state.tabsIdx == 3">
        <view class="list">
          <view class="li mt20 flex pt20" @click="routerTo(`/pages/space/reserveOfficial?type=3`)">
            <view class="banner mr20">
              <image class="imageW100" src="http://47.116.190.37:8002/static/addHead.png"></image>
            </view>
            <view class="info" @click="routerTo(`/pages/space/details?type=3`)">
              <view class="name">001展示柜</view>
              <view class="text mt10">¥300/按月起</view>
              <view class="gary mt10">
                <text class="status">不可租</text>
                租至2024年11月12日
              </view>
            </view>
            <view class="btn">预约</view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import spaceTimes from '/@/components/spaceTimes.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  let arr = getLastSevenDays()
  arr[0].week = '今天'
  weekDayList.value = arr
  state.day = arr[0].day
  console.log(arr);
  
})
// 参数
const tabsList = ref([ { name: '工位', key: 0 }, { name: '会议室', key: 1 }, { name: '办公室', key: 2 }, { name: '展示柜', key: 3 },  ])
const weekDayList = ref([] as any[])
const state = reactive({
  status: 0, // 
  gradeIdx: 0, // 筛选
  navAllHeight: 0,
  tabsIdx: 3,
  day: '',
  sidxs: [ '00:00', '01:00', '03:00', '03:30', '04:00', '12:00', '15:30', '22:00', '22:30'],
})
// 获取最近七天日期以及星期
const getLastSevenDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];

  for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      let newDate = date.toISOString().split('T')[0];
      days.push({
          day: newDate.slice(-2), // 获取日期（YYYY-MM-DD）
          week: dayNames[date.getDay()] // 获取星期名称（通过数组索引）
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
  .filter {
    .grade {
      font-size: 20rpx;
      font-weight: 400;
      line-height: 48rpx;
      color: #898784;
      border-radius: 10rpx;
      background-color: #F5F3EF;
      .icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
      }
      .down {
        display: inline-block;
        width: 20rpx;
        height: 20rpx;
        vertical-align: middle;
      }
    }
    .gradeAct {
      font-weight: 600;
      color: #232322;
      background-color: #FFCF00;
    }
  }
  .filterDate {
    .li {
      flex: 1;
      height: 100rpx;
      text-align: center;
      border-radius: 10rpx;
      color: #232322;
      .week {
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;

      }
      .day {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 40rpx;

      }
    }
    .liAct {
      background-color: #F5F3EF;
    }
  }
  .station {
    .list {
      .li {
        border-top: 1PX solid #F5F3EF;
        .room {
          justify-content: space-between;
          .left {
            width: calc( 100% - 130rpx );
            .banner {
              width: 130rpx;
              height: 100rpx;
              border-radius: 6rpx;
            }
            .number {
              display: inline-block;
              width: 130rpx;
              height: 80rpx;
              line-height: 80rpx;
              font-size: 28rpx;
              font-weight: 600;
              color: #232322;
              background-color: #FFCF0033;
              border: 1PX solid #FFCF00;
              border-radius: 10rpx;
              text-align: center;
            }
            .info {
              .name {
                font-size: 28rpx;
                font-weight: 600;
                line-height: 32rpx;
                color: #232322;

              }
              .text {
                font-size: 24rpx;
                font-weight: 400;
                line-height: 28rpx;
                color: #232322;
                .icon {
                  display: inline-block;
                  width: 46rpx;
                  height: 28rpx;
                  text-align: center;
                  border-radius: 4rpx;
                  background-color: #22D274;
                  font-size: 16rpx;
                  font-weight: 500;
                  color: #ffffff;
                  vertical-align: middle;
                }
                .icon1 {
                  background-color: #ED9E05;
                }
              }
            }
          }
          .right {
            width: 130rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            border-radius: 10rpx;
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
            background-color: #FFCF00;
          }
        }
      } 
    }
  }
  .office {
    .list {
      .li {
        border-top: 1PX solid #F5F3EF;
        position: relative;
        .btn {
          position: absolute;
          right: 0;
          top: 20rpx;
          width: 130rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 10rpx;
          font-size: 28rpx;
          font-weight: 600;
          color: #232322;
          background-color: #FFCF00;
        }
        .banner {
          width: 130rpx;
          height: 100rpx;
          border-radius: 6rpx;
        }
        .info {
          width: calc( 100% - 160rpx );
          .name {
            font-size: 28rpx;
            font-weight: 600;
            line-height: 32rpx;
            color: #232322;
          }
          .text {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 28rpx;
            color: #232322;
          }
          .gary {
            font-size: 20rpx;
            font-weight: 400;
            line-height: 28rpx;
            color: #898784;
            .status {
              display: inline-block;
              width: 80rpx;
              text-align: center;
              background-color: #D7D4CF;
              border-radius: 4rpx;
              font-size: 20rpx;
            }
          }
          .company {
            display: inline-block;
            height: 50rpx;
            line-height: 50rpx;
            background-color: #CCEFFF;
            border-radius: 10rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #232322;
            padding: 0 125rpx 0 25rpx;
            position: relative;
            .oneEllipsis {
              display: inline-block;
              max-width: 360rpx;
            }
            .status {
              display: inline-block;
              position: absolute;
              right: 0;
              top: 0;
              width: 100rpx;
              height: 50rpx;
              line-height: 50rpx;
              text-align: center;
              color: #ffffff;
              background-color: #00B0FF;
              border-radius: 0 10rpx 10rpx 0;
            }
          }
        }
      }
    }
  }
}
</style>
