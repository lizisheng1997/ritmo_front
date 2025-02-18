<template>
  <view class="content p0-35">
    <view class="list">
      <view class="card mt35" v-for="item in list" :key="item.id">
        <view class="pname flex pb20">
          <text class="title">杭州· 华润万象空间</text>
          <text class="status " :style="{ color: reservationsColorEnums[item.status] }">{{ item.status_text }}</text>
        </view>
        <view class="myOrderList">
          <view class="item mt35 flex" @click="routerTo(`/pages/user/reservationDetails?id=${item.id}&type=${item.reservation_type }`)">
            <view class="left flex">
              <image class="banner mr25" src="https://images.unsplash.com/photo-1497366216548-37526070297c"></image>
              <view class="info">
                <view class="title mb10">
                  <text class="text">{{ item.reservation_type == 'workspace' ? '工位' : '会议室' }}</text>
                  <!-- <text class="grade ml15">初级</text> -->
                </view>
                <!-- <view class="hour">6-8人</view> -->
                <view class="hour">{{ item.booking_date }} {{ item.start_time }}～{{ item.end_time }}</view>
                <!-- <view class="hour mt5">预约人：段誉</view> -->
              </view>
            </view>
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
import { routerTo, showTips } from '/@/utils/currentFun';
import { reservationsColorEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '我的预约' : '机构预约'
  });
  getList()
  // state.id = query!.id
});
// 参数
const list = ref([] as any[])
// 
const getList = async() => {
  await userApi.getUserReservations().then((res: any) => {
    console.log(res.data);
    list.value = res.data.reservations
  })
}
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .list {
    .card {
      padding: 15rpx 25rpx 35rpx;
      border-radius: 20rpx;
      box-shadow: 0px 2px 10px 0px #0000001A;
      background-color: #fff;
      .pname {
        justify-content: space-between;
        border-bottom: 1PX dashed #D7D4CF;
        .title {
          font-size: 28rpx;
          font-weight: 600;
          line-height: 36rpx;
        }
        .status {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;

        }
      }
    }
  }
}
</style>
