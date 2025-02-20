<template>
  <view class="content p35">
    <!-- <view class="myOrderList">
      <view class="li flex">
        <view class="left flex">

          <view class="card mr25">会员</view>

          <image class="banner mr25" src="https://ritmohub.cn/static/addHead.png"></image>
          <view class="info">
            <view class="title mb10">
              <text class="text">工位</text>
              <text class="grade ml15">初级</text>
            </view>
            <view class="hour">1.5小时</view>

            <view class="hour">有效期至：2024-09-09</view>
            <view class="hour">扩容5人 ｜ 扩容10天</view>
            
          </view>
        </view>
      </view>
    </view> -->
    <!--  -->
    <!-- <view class="order mt35 p35">
      <view class="title mb35">
        订单明细
      </view>
      <view class="expansion mb10 flex">
        <view class="text">成员扩容</view>
        <view class="price">¥3000</view>
      </view>
      <view class="count">
        5人 × 238天
      </view>
      <view class="all">
        总计
        <text class="">¥{{ state.info.amount }}</text>
      </view>
    </view> -->
    <!--  -->
    <view class="order  p35">
      <view class="title mb35">
        订单信息
      </view>
      <view class="label mb20">订单号：{{ state.info.id }}</view>
      <view class="label mb20">
        订单类型：
        {{ state.info.order_source == 'vip' || state.info.order_source == 'org_vip'
                    ? '会员'
                    : state.info.order_source == 'org_expansion'
                    ? '扩容'
                    : state.info.order_source == 'workspace'
                    ? '工位'
                    : '会议室' }}
      </view>
      <view class="label mb20">订单金额：¥{{ state.info.amount }}</view>
      <view class="label mb20">订单状态：{{ state.info.order_status_text }}</view>
      <view class="label mb20">下单时间：{{ dateToLocaleDateString(state.info.create_time) }}</view>
      <view class="label mb20" v-if="state.info.pay_time">支付时间：{{ dateToLocaleDateString(state.info.pay_time) }}</view>
      <view class="label mb20">下单人：{{ state.nickname }}</view>
      <!-- <view class="label">支付方式：银联</view> -->
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerTo, dateToLocaleDateString } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  state.id = query!.id
  state.type = query!.type
  getInfo()
  state.nickname = uni.getStorageSync('userInfos').nickname
  // console.log(query);
});
// 参数
// workspace工位   meeting_room会议室  vip会员 org_vip 机构会员 org_expansion机构扩容
const state = reactive({
  id: '',
  type: '', // 手机号
  info: {} as any, // 
  nickname: '',
})
const getInfo = async() => {
  await userApi.getUserOrders().then((res: any) => {
    for( let i of res.data.orders ) {
      if( i.id == state.id ) {
        state.info = i
      }
    }
    console.log(state.info);
  });
}
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .order {
    border-radius: 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px 0px #0000001A;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      color: #232322;
    }
    .label {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #898784;
    }
    .expansion {
      justify-content: space-between;
      text {
        display: inline-block;
        line-height: 36rpx;
        font-size: 28rpx;
        color: #232322;
      }
      .text {
        font-weight: 400;
      }
      .price {
        font-weight: 600;
      }
    }
    .count {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #898784;
    }
    .all {
      margin-top: 45rpx;
      padding-top: 35rpx;
      border-top: 1PX dashed #D7D4CF;
      text-align: right;
      font-size: 28rpx;
      font-weight: 400;
      color: #232322;
      text {
        font-weight: 600;
      }
    }
  }
}
.myOrderList {
  .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    margin-top: -5rpx;
  }
}
</style>
