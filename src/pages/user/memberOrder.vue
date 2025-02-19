<template>
  <view class="content p35">
    <view class="card p35">
      <view class="count flex p0-55">
        <text class="num">{{ state.oldLimit }}人</text>
        <image class="icon mt25" src="http://47.116.190.37:8002/static/user/memberOrderCradD.png"></image>
        <text class="num">{{ Number(state.limit) + Number(state.oldLimit) }}人</text>
      </view>
      <view class="fub">扩容</view>
      <view class="title mt35">{{ state.orgName }}</view>
      <view class="dateText mt35">扩容时间</view>
      <view class="day mt25">{{ state.duration }}个月</view>
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
        {{ state.limit }}人 × {{ state.duration }}个月
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
  state.id = query!.id
  state.limit = query!.limit
  state.duration = query!.duration
  state.oldLimit = query!.oldLimit
  state.orgName = query!.orgName
  getUserInfo()
});
// 参数
const state = reactive({
  id: '', // 机构id
  limit: 0, // 扩容数量
  oldLimit: 0, // 扩容前总数量
  duration: 0, // 扩容月数
  orgName: '', // 所属机构
  nickname: '', // 操作人
  price: 0,
})
const operatePopupRef = ref()
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    // console.log(res.data);
    state.nickname = res.data.nickname
    // 计算价格
    state.price = 899 * state.limit * state.duration
  })
}
const payPopupRef = ref()
const submit = (show: boolean, type: number) => {
  if(show) {
    userApi.getOrganizationsMembersExpand(state.id, {
      extra_members: state.limit,
      duration: state.duration
    }).then((res: any) => {
      // console.log(res.data);
      getOrder(type, res.data.id)
    })
  }
}
// 支付扩容订单
const getOrder = (type: number, orderId: string) => {
    userApi.getOrganizationsMembersPay(state.id, orderId).then((res: any) => {
      // console.log(res.data);
      // showTips(res.message)
      getRequestPayment(type, res.data.orderInfo)
    })
}
const getRequestPayment = (provider: any, obj: any) => {
  // console.log(obj);
  
  uni.requestPayment({
    provider, 
    // orderInfo: obj,
    // @ts-ignore
    appid: obj.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
    timeStamp: obj.timeStamp, // 时间戳（单位：秒）
    package: 'prepay_id=' + obj.package, // 固定值
    paySign: obj.paySign, //签名
    signType: obj.signType, // 签名算法，这里用的 MD5/RSA 签名
    nonceStr: obj.nonceStr, 
    success: function (res) {
      // var rawdata = JSON.parse(res.rawdata);
      // console.log('支付成功');
      showTips('支付成功');
      setTimeout(() => {
        routerBack(1)
      }, 1000);
    },
    fail: function (err) {
      console.log('支付失败:' + JSON.stringify(err));
    }
  });
};
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
