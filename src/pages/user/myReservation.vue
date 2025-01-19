<template>
  <view class="content p0-35">
    <view class="list">
      <view class="card mt35">
        <view class="pname flex pb20">
          <text class="title">杭州· 华润万象空间</text>
          <text class="status status1">待使用</text>
        </view>
        <view class="myOrderList">
          <view class="item mt35 flex" @click="routerTo(`/pages/user/reservationDetails`)">
            <view class="left flex">
              <image class="banner mr25" src="/@/static/addHead.png"></image>
              <view class="info">
                <view class="title mb10">
                  <text class="text">工位</text>
                  <text class="grade ml15">初级</text>
                </view>
                <view class="hour">2024-02-13 11:00～12:30</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="card mt35">
        <view class="pname flex pb20">
          <text class="title">杭州· 华润万象空间</text>
          <text class="status status2">进行中</text>
        </view>
        <view class="myOrderList">
          <view class="item mt35 flex" @click="routerTo(`/pages/user/reservationDetails`)">
            <view class="left flex">
              <image class="banner mr25" src="/@/static/addHead.png"></image>
              <view class="info">
                <view class="title mb10">
                  <text class="text">工位</text>
                  <text class="grade ml15">初级</text>
                </view>
                <view class="num mb5" style="font-size: 24rpx;">6-8人</view>
                <view class="hour">2024-02-13 11:00～12:30</view>
                <view class="hour mt10">预约人：段誉</view>
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '我的预约' : '机构预约'
  });
  // state.id = query!.id
});
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style>
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
        .status1 {
          color: #FF3434;
        }
        .status2 {
          color: #232322;
        }
        .status3 {
          color: #898784;
        }
      }
    }
  }
}
</style>
