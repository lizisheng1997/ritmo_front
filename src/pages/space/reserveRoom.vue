<template>
  <view class="content ">
    <view class="station pb25">
      <view class="list">
        <view class="li p20-0">
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
            <view class="right" @click="routerTo(`/pages/space/details?type=${state.type}`)">
              <image class="icon" src="http://47.116.190.37:8002/static/rightBlack.png"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="selectDate mt35">
      <view class="nav flex">
        <text class="title">选择预约日期</text>
      </view>
      <view class="card p15 mt25">
        <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png" @click="state.calendarShow = true"></image>
        <view class="title">日期</view>
        <view class="date mt20">{{ state.date }}</view>
      </view>
    </view>
    <!--  -->
    <view class="date mt35">
      <view class="nav flex">
        <text class="title">选择预约时间</text>
        <text class="text">16:00～18:00  2小时</text>
      </view>
      <!--  -->
      <view class="times">
        <view class="axis mt25 flex" v-for="( titem, tidx ) in spaceTimeArr" :key="tidx">
          <view class="axis-piece" v-for="( stitem, stidx ) in titem" :key="stidx" style="flex: 1;">
            <text class="pre" :class=" state.alreadyList.includes(stitem.time)  ? 'pre1' :  state.seleceStopList.includes(stitem.time)  ? 'pre2' : state.selectList.includes(stitem.time)  ? 'pre3' : ''  " @click="addSelect(stitem.time)"></text>
            <text class="time">{{  stidx %2 == 0  ? stitem.time : '' }}</text>
          </view>
        </view>
      </view>
      <!--  -->
      <view class="describe mt35 flex">
        <view class="li">
          <text class="icon mr15" style="background-color: #D7D4CF;"></text>
          <text class="text">已预约</text>
        </view>
        <view class="li">
          <text class="icon mr15" style="background-color: #ff0000;"></text>
          <text class="text">不可预约</text>
        </view>
        <view class="li">
          <text class="icon mr15" style="background-color: #FFCF00;"></text>
          <text class="text">预约选中</text>
        </view>
      </view>
      <!--  -->
    </view>
    <view class="footer flex">
      <view class="left">
        <view class="price">
          <text class="text">总计：</text>
          <text class="num">¥300</text>
          
        </view>
        <view class="tips mt10">
          总计 <text class="" style="color: #FF3434;">5.5</text> 小时 权益抵扣 <text class="" style="color: #FF3434;">2</text> 小时
        </view>
      </view>
      <view class="right" @click="routerTo(`/pages/space/reserveOrder?type=${state.type}`)">
        去预约
      </view>
    </view>
    <!-- 选择日期 -->
    <u-calendar v-model="state.calendarShow" mode="date" :change-year="false" min-year="2025" :min-date="state.oldDate"  max-date="2025-12-31" @change="calendarChange"></u-calendar>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { spaceTimeArr } from '/@/utils/universalArray';
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '预定工位' : '预定会议室'
  });
  state.type = query!.type
  getInfo()
  state.date = new Date(new Date()).toISOString().split('T')[0]
  state.oldDate = new Date(new Date()).toISOString().split('T')[0]
});
// 参数
const state = reactive({
  type: 0, // 
  date: '',
  oldDate: '',
  alreadyList: [ '00:00', '01:00', '03:00', '03:30', '04:00', '12:00', '15:30', '22:00', '22:30'], // 已预约
  seleceStopList: [ '02:00', '06:00', '06:30', '07:00', '10:00'], // 不可预约
  selectList: [] as string[], // 预约
  calendarShow: false,
})
const getInfo = () => {
  // if( state.type == 0 ) {
  //   userApi.getAgreementsTerms().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // } else if( state.type == 1 ) {
  //   userApi.getAgreementsPrivacy().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // }
}
// 选择日期结束
const calendarChange = (e: any) => {
  console.log(e);
  
}
// 选择时间段
const addSelect = (time: string) => {
  // 先判断是不是已预约、不可预约
  let already1 = state.seleceStopList.includes(time)
  let already2 = state.alreadyList.includes(time)
  if( !already1 && !already2 ) {
    console.log(time)
    // 在判断是不是在预约数组里，在的话删除
    let idx = state.selectList.findIndex((item: string) => item == time)
    console.log(idx);
    if( idx == -1 ) {
      state.selectList.push(time)
    } else {
      state.selectList.splice(idx, 1)
    }
    
  }
}
</script>

<style >
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 35rpx 35rpx 200rpx;
  background-color: #ffffff;
  .station {
    .list {
      .li {
        border-bottom: 1PX solid #F5F3EF;
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
            width: 48rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            .icon {
              display: inline-block;
              width: 48rpx;
              height: 48rpx;
            }
          }
        }
      } 
    }
  }
  .nav {
    justify-content: space-between;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 44rpx;
    color: #232322;
    .text {
      font-size: 24rpx;
    }
  }
  .selectDate {
    .card {
      position: relative;
      width: 240rpx;
      height: 120rpx;
      border-radius: 10rpx;
      background-color: #F5F3EF;
      .title {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #898784;
      }
      .date {
        font-size: 28rpx;
        font-weight: 600;
        line-height: 32rpx;
        color: #232322;
      }
      .icon {
        position: absolute;
        width: 32rpx;
        height: 32rpx;
        top: 15rpx;
        right: 25rpx;
      }
    }
  }

  
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
              height: 56rpx !important;
            }
          }
        }
      }
      .pre {
        display: inline-block;
        height: 80rpx;
        width: 100%;
        background-color: #F1F0EE;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 2rpx;
          height: 30rpx;
          background-color: #C3BCB4;
        }
      }
      .pre1 {
        &::before {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 100%;
          height: 60rpx;
          background-color: #C3BCB4;
          opacity: 0.5;
        }
      }
      .pre2 {
        &::before {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 100%;
          height: 60rpx;
          background-color: #ff0000;
          opacity: 0.5;
        }
      }
      .pre3 {
        &::before {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 100%;
          height: 60rpx;
          background-color: #FFCF00;
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
  .describe {
    .li {
      margin-right: 45rpx;
      .icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        border-radius: 5rpx;
        vertical-align: middle;
      }
      .text {
        display: inline-block;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #232322;
      }
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
        line-height: 40rpx;
        color: #232322;
      }
      .num {
        font-size: 40rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #FF3434;
      }
    }
    .tips {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 28rpx;
      color: #898784;
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
    background-color: #FFCF00;
  }
}
</style>
