<template>
  <view class="content">
    <view class="station pb25 pr35">
      <view class="list">
        <view
          class="li p20-0"
          v-if="state.info">
          <view class="room flex">
            <view
              class="left flex"
              @click="routerTo(`/pages/space/details?type=1`)">
              <view class="banner mr20">
                <image
                  class="imageW100"
                  :src="state.info.image_url"></image>
              </view>
              <view class="info">
                <view class="name mb10">{{ state.info.name }}</view>
                <view
                  class="text"
                  v-if="state.info.services">
                  {{ state.info.services[0].name }} ｜
                  {{ state.info.services[1].name }}...
                </view>
                <view
                  class="text mt5"
                  style="font-weight: bold">
                  ¥{{ state.info.price }}/{{ t('Startingfromminutes') }}
                  <text class="icon ml20">{{
                    ltype == 'zh'
                      ? spaceLevelEnums[state.info.level]
                      : espaceLevelEnums[state.info.level]
                  }}</text>
                </view>
              </view>
            </view>
            <view
              class="right"
              @click="
                routerTo(
                  `/pages/space/details?type=${state.type}&sid=${state.sid}&id=${state.id}`
                )
              ">
              <image
                class="icon"
                src="/@/static/rightBlack.png"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="selectDate mt35">
      <view class="nav flex">
        <text class="title">{{ t('Selectappointmentdate') }}</text>
      </view>
      <view
        class="card p15 mt25"
        @click="state.calendarShow = true">
        <image
          class="icon"
          src="/@/static/rightAsh.png"></image>
        <view class="title">{{ t('date') }}</view>
        <view class="date mt20">{{ state.date }}</view>
      </view>
    </view>
    <!--  -->
    <view class="date mt35">
      <view class="nav flex pr35">
        <text class="title">{{ t('Chooseanappointmenttime') }}</text>
        <text
          class="text"
          v-if="state.selectList.length"
          >{{ state.timeRange }} {{ state.hourCount }}{{ t('hour') }}</text
        >
      </view>
      <!--  -->
      <view class="times">
        <view
          class="axis mt25 flex"
          v-for="(titem, tidx) in spaceTimeArr"
          :key="tidx">
          <view
            class="axis-piece"
            v-for="(stitem, stidx) in titem"
            :key="stidx"
            style="flex: 1">
            <text
              class="pre"
              :class="
                state.alreadyList.includes(stitem.slot)
                  ? 'pre1'
                  : state.seleceStopList.includes(stitem.slot)
                  ? 'pre2'
                  : state.selectList.includes(stitem.slot)
                  ? 'pre3'
                  : ''
              "
              @click="addSelect(stitem.slot, stitem.time, tidx, stidx)"></text>
          
            <text class="time">{{ stidx % 2 == 0 ? stitem.time : '' }}</text>
          </view>
        </view>
      </view>
      <!--  -->
      <view class="describe mt35 flex">
        <view class="li">
          <text
            class="icon mr15"
            style="background-color: #d7d4cf"></text>
          <text class="text">{{ t('alreadybooked') }}</text>
        </view>
        <view class="li">
          <text
            class="icon mr15"
            style="background-color: #ff0000"></text>
          <text class="text">{{ t('notavailable') }}</text>
        </view>
        <view class="li">
          <text
            class="icon mr15"
            style="background-color: #ffcf00"></text>
          <text class="text">{{ t('appointmentselection') }}</text>
        </view>
      </view>
      <!--  -->
    </view>
    <view class="footer flex">
      <view class="left">
        <view class="price">
          <text class="text">{{ t('total') }}:</text>
          <text class="num">¥{{ state.price }}</text>
        </view>
        <!--  -->
        <view class="tips mt10">
          {{ t('total') }}
          <text
            class=""
            style="color: #ff3434"
            >{{ state.hourCount }}</text
          >
          {{ t('hour') }}
          <!-- 权益抵扣 <text class="" style="color: #FF3434;">2</text> 小时 -->
        </view>
      </view>
      <view
        class="right"
        @click="
          () => {
            if (state.hourCount == 0) {
              showTips(t('Pleaseselect'));
            } else {
              operatePopupRef.openDialog(t('submitanappointment'));
            }
          }
        ">
        {{ t('reservation') }}
      </view>
    </view>
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="submit"></operatePopup>
    <!-- 选择日期 -->
    <u-calendar
      v-model="state.calendarShow"
      mode="date"
      :change-year="false"
      min-year="2025"
      :min-date="state.oldDate"
      max-date="2025-12-31"
      @change="calendarChange"></u-calendar>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { spaceTimeArr } from '/@/utils/universalArray';
import { routerTo, showTips } from '/@/utils/currentFun';
import { spaceLevelEnums, espaceLevelEnums } from '/@/utils/enums';
import operatePopup from '/@/components/operatePopup.vue';
import { useI18n } from 'vue-i18n';
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? t('Spacereservation') : t('Roomreservation')
  });
  ltype.value = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  state.type = query!.type;
  state.sid = query!.sid;
  state.id = query!.id;
  // 获取时间限制范围
  state.date = query!.data;
  state.oldDate = new Date(new Date()).toISOString().split('T')[0];
  getSpaceMeetingRoomsTimes();
  getInfo();
});
// 参数
const ltype = ref('');
const state = reactive({
  type: 0, // 类型
  sid: '', // 空间id
  id: '', // 单id
  date: '',
  oldDate: '',
  timeRange: '', // 时间范围
  alreadyList: [] as any[], // 已预约
  seleceStopList: [] as any[], // 不可预约
  selectList: [] as any[], // 预约
  selectDateList: [] as any[], // 预约时间
  calendarShow: false,
  price: 0, // 价格
  hourCount: 0,
  info: {} as any
});
const getInfo = () => {
  if (state.type == 0) {
    spaceApi
      .getSpaceMeetingWorkspacesDetails(state.sid, state.id)
      .then((res: any) => {
        // console.log(res);
        state.info = res.data;
      });
  } else if (state.type == 1) {
    spaceApi
      .getSpaceMeetingRoomsDetails(state.id, {
        space_id: state.sid
      })
      .then((res: any) => {
        // console.log(res);
        state.info = res.data;
      });
  }
};
// 选择日期结束
const calendarChange = (e: any) => {
  console.log(e);
  state.date = e.result;
  state.selectList = [];
  state.selectDateList = [];
  state.timeRange = '';
  state.price = 0;
  state.hourCount = 0;
  getSpaceMeetingRoomsTimes();
};
// 选择时间段
const addSelect = (slot: number, time: string, idx: number, sidx: number) => {
  // 先判断是不是已预约、不可预约
  let already1 = state.seleceStopList.includes(slot);
  let already2 = state.alreadyList.includes(slot);
  let dateSlotArr = JSON.parse(JSON.stringify(state.selectList));
  let dateArr = JSON.parse(JSON.stringify(state.selectDateList));

  if (!already1 && !already2) {
    // 在判断是不是在预约数组里，在的话删除
    let idx = state.selectList.findIndex((item: number) => item == slot);
    if (idx == -1) {
      dateSlotArr.push(slot);
      dateArr.push(time);
    } else {
      dateSlotArr.splice(idx, 1);
      dateArr.splice(idx, 1);
    }
  }
  // 重新排序
  state.selectList = dateSlotArr.sort((a: number, b: number) => a - b);
  // console.log(state.selectList);
  state.selectDateList = dateArr.sort((a: string, b: string) => {
    let timeA = a.split(':').map(Number); // 将时间分割并转换为数字数组
    let timeB = b.split(':').map(Number);
    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    } else if (timeA[1] !== timeB[1]) {
      return timeA[1] - timeB[1];
    }
  });
  console.log(state.selectDateList);
  
  if( state.selectList?.length ) {
    // 获取时间范围
    state.hourCount =
      state.selectList.length <= 1 ? 0.5 : state.selectList.length / 2;
    // 

    state.timeRange = `${state.selectDateList[0]} ~ ${
          spaceTimeArr[idx][sidx+1].time
          }`;
    state.price = state.hourCount * state.info.price * 2;
  } else {
    state.hourCount = 0
    state.price = 0
  }
};
// 获取可预约的时间
const getSpaceMeetingRoomsTimes = () => {
  /***
   * available - 可预约的时间段
     booked - 已被其他用户预约
      my_booked - 已被当前用户预约
      past - 已过去的时间段
    */
  state.alreadyList = [];
  state.seleceStopList = [];
  if (state.type == 0) {
    spaceApi
      .getSpaceWorkspacesTimes(state.id, {
        date: state.date
      })
      .then((res: any) => {
        // console.log(res.data);
        for (let i of res.data.time_slots) {
          if (i.status == 'my_booked') {
            state.alreadyList.push(i.slot);
          } else if (i.status == 'past' || i.status == 'booked') {
            state.seleceStopList.push(i.slot);
          }
        }
      });
  } else {
    spaceApi
      .getSpaceMeetingRoomsTimes(state.id, {
        date: state.date
      })
      .then((res: any) => {
        // console.log(res.data);
        for (let i of res.data.time_slots) {
          if (i.status == 'my_booked') {
            state.alreadyList.push(i.slot);
          } else if (i.status == 'past' || i.status == 'booked') {
            state.seleceStopList.push(i.slot);
          }
        }
      });
  }
};
//
const operatePopupRef = ref();
const submit = (show: boolean) => {
  if (show) {
    if (state.type == 0) {
      spaceApi
        .getSpaceWorkspacesAdd({
          space_id: state.sid,
          workspace_id: state.id,
          booking_date: state.date,
          slots: state.selectList,
          use_rights: true
        })
        .then((res: any) => {
          routerTo(
            `/pages/space/reserveOrder?type=${state.type}&sid=${state.sid}&id=${res.data.id}`
          );
        });
    } else if (state.type == 1) {
      spaceApi
        .getSpaceWorkRoomAdd({
          space_id: state.sid,
          meeting_room_id: state.id,
          booking_date: state.date,
          slots: state.selectList,
          attendees: state.info.capacity,
          use_rights: true
        })
        .then((res: any) => {
          routerTo(
            `/pages/space/reserveOrder?type=${state.type}&sid=${state.sid}&id=${res.data.id}`
          );
        });
    }
  }
};
</script>

<style>
page {
  background-color: #f1f1ef;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 35rpx 0 200rpx 35rpx;
  background-color: #ffffff;
  .station {
    .list {
      .li {
        border-bottom: 1px solid #f5f3ef;
        .room {
          justify-content: space-between;
          .left {
            width: calc(100% - 130rpx);
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
              background-color: #ffcf0033;
              border: 1px solid #ffcf00;
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
                  background-color: #22d274;
                  font-size: 16rpx;
                  font-weight: 500;
                  color: #ffffff;
                  vertical-align: middle;
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
      background-color: #f5f3ef;
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
        &:last-child {
          // display: none;
          .pre {
            display: none;
            // &::before {
            //   background-color: transparent !important;
            // }
          }
          .time {
            left: -100%;
          }
        }
      }
      .pre {
        display: inline-block;
        height: 80rpx;
        width: 100%;
        background-color: #f1f0ee;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 2rpx;
          height: 30rpx;
          background-color: #c3bcb4;
        }
      }
      .pre1 {
        &::before {
          content: '';
          position: absolute;
          bottom: 6rpx;
          width: 100%;
          height: 60rpx;
          background-color: #c3bcb4;
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
          background-color: #ffcf00;
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
        color: #ff3434;
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
    background-color: #ffcf00;
  }
}
</style>
