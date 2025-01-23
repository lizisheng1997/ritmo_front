<template>
  <view class="content p0-35">
    <view class="myOrderList">
      <view class="li mt35 flex" @click="routerTo(`/pages/user/orderDetails`)">
        <view class="left flex">
          <image class="banner mr25" src="http://47.116.190.37:8002/static/addHead.png"></image>
          <view class="info">
            <view class="title mb10">
              <text class="text">工位</text>
              <text class="grade ml15">初级</text>
            </view>
            <view class="hour">1.5小时</view>
          </view>
        </view>
        <view class="pay flex" style="margin-top: 35rpx;">
          <view class="price">￥1200</view>
        </view>
      </view>
      <view class="li mt35 flex">
        <view class="left flex">
          <view class="card mr25">会员</view>
          <view class="info">
            <view class="title mb10">
              <text class="text">工位</text>
            </view>
            <view class="hour">1.5小时</view>
          </view>
        </view>
        <view class="pay flex" style="margin-top: 25rpx;">
          <view class="name mr15">段誉</view>
          <view class="price">￥1200</view>
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

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '我的订单' : '机构订单'
  });
  state.type = query!.type
});
// 参数
const state = reactive({
  type: 0,
  valueLeng: '',
  value: '',
})
</script>

<style scoped>
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
</style>
