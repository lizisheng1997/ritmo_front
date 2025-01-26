<template>
  <view class="content p35">
    <view class="card p35">
      <view class="count flex p0-55">
        <text class="num">{{ state.oldLimit }}人</text>
        <image class="icon mt25" src="http://47.116.190.37:8002/static/user/memberOrderCradD.png"></image>
        <text class="num">{{ state.limit }}人</text>
      </view>
      <view class="fub">扩容</view>
      <view class="title mt35">{{ state.orgName }}</view>
      <view class="dateText mt35">扩容时间</view>
      <view class="day mt25">{{ state.memberDay }}天</view>
      <view class="info">
        <view class="li flex mt25">
          <text class="label">操作人：</text>
          <text class="text">{{ state.nickname }}</text>
        </view>
        <view class="li flex mt25">
          <text class="label">所属机构：</text>
          <text class="text">{{ state.orgName }}</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="order mt35 p35">
      <view class="title mb35">
        订单明细
      </view>
      <view class="expansion mb10 flex">
        <view class="text">成员扩容</view>
        <view class="price">¥{{ state.price }}</view>
      </view>
      <view class="count">
        {{ state.limit-state.oldLimit }}人 × {{ state.memberDay }}天
      </view>
      <view class="all">
        总计
        <text class="">¥{{ state.price }}</text>
      </view>
    </view>
    <!--  -->
    <view class="pay p35 flex">
      <view class="price">
        <text class="all">总计：</text>
        <text class="unit" style="font-size: 28rpx;">￥</text>
        <text class="unit">{{ state.price }}</text>
      </view>
      <view class="btn" @click="operatePopupRef.openDialog('是否支付该订单', state.id)">确认扩容</view>
    </view>
    <!-- (show) => {
      if(show)payPopupRef.openDialog();
    } -->
    <operatePopup ref="operatePopupRef" :isType="1" @refresh="submit"></operatePopup>
    <payPopup ref="payPopupRef" :isType="1" @refresh="submit"></payPopup>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import operatePopup from '/@/components/operatePopup.vue'
import payPopup from '/@/components/payPopup.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import Home from '/@/api/home';
import { routerBack, showTips } from '/@/utils/currentFun';
const homeApi = new Home();
const userApi = new User();
const { t } = useI18n()


onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id
  state.limit = query!.limit
  state.memberDay = query!.memberDay
  state.oldLimit = query!.oldLimit
  getUserInfo()
});
// 参数
const state = reactive({
  id: '', // 机构id
  limit: 0, // 扩容数量
  oldLimit: 0, // 扩容前数量
  memberDay: 0, // 扩容天数
  orgName: '', // 所属机构
  nickname: '', // 操作人
  price: 0,
})
const operatePopupRef = ref()
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    // console.log(res.data);
    state.orgName = res.data.current_org.name
    state.nickname = res.data.nickname
    // 计算价格
    let obj:any = res.data.vip.level == 2 ? res.data.vip.prices.premium : res.data.vip.prices.basic 
    let num = state.limit - state.oldLimit;
    if( state.memberDay <= 30 ) {
      state.price = obj.month * num
    } else if( state.memberDay > 30 && state.memberDay <= 90  ) {
      state.price = obj.quarter * num
    } else if( state.memberDay > 90  ) {
      state.price = obj.year * num
    }
  })
}
const payPopupRef = ref()
const submit = (show: boolean, type: number) => {
  if(show) {
    userApi.getOrganizationsMembersExpand(state.id, {
      new_limit: state.limit,
      new_memberDay: state.memberDay
    }).then((res: any) => {
      // console.log(res.data);
      getOrder(res.data.order_id)
    })
  }
}
// 支付扩容订单
const getOrder = (orderId: string) => {
    userApi.getOrganizationsMembersPay(state.id, orderId).then((res: any) => {
      // console.log(res.data);
      showTips(res.message)
      setTimeout(() => {
        routerBack(1)
      }, 1000);
    })
}
const requestPayment = (orderInfo: any) => {
  uni.requestPayment({
    "provider": "alipay",   //固定值为"alipay"
    "orderInfo": orderInfo, //此处为服务器返回的订单信息字符串
    success: function (res) {
        var rawdata = JSON.parse(res.rawdata);
        console.log("支付成功", rawdata);
    },
    fail: function (err) {
        console.log('支付失败:' + JSON.stringify(err));
    }
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
  .card {
    height: 668rpx;
    background-image: url('http://47.116.190.37:8002/static/user/memberOrderCardBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // box-shadow: 0px 2px 10px 0px #0000001A;
    .count {
      justify-content: space-between;
      .num {
        display: inline-block;
        font-size: 48rpx;
        font-weight: 700;
        line-height: 64rpx;
        color: #232322;
      }
      .icon {
        display: inline-block;
        width: 140rpx;
        height: 24rpx;
        vertical-align: middle;
      }
    }
    .fub {
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
      color: #232322;
      margin-top: -10rpx;
      vertical-align: top;
    }
    .title {
      line-height: 100rpx;
      border-radius: 10rpx;
      background: #FFCF001A;
      border: 1px solid #FFCF00;
      text-align: center;
      color: #232322;
      font-size: 28rpx;
      font-weight: 600;
    }
    .dateText {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      text-align: center;
      color: #898784;
    }
    .day {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      text-align: center;
      color: #232322;
    }
    .info {
      margin-top: 100rpx;
      padding-top: 15rpx;
      border-top: 1PX dashed #D7D4CF;
      .li {
        justify-content: space-between;
        .label {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #898784;
        }
        .text {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
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
  .pay {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 16px 0px #00000026;
    justify-content: space-between;
    .price {
      line-height: 80rpx;
      text {
        display: inline-block;
      }
      .all {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #232322;
      }
      .unit {
        font-size: 40rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #FF3434;
      }
    }
    .btn {
      width: 208rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 20rpx;
      background-color: #FFCF00;
      font-size: 32rpx;
      font-weight: 600;
      color: #232322;
    }
  }
}
</style>
