<template>
  <view class="content">
    <!--  -->
    <view class="card p35">
      <view class="count flex p0-55">
        <text class="num">09:00</text>
        <image class="icon mt25" src="http://47.116.190.37:8002/static/user/memberOrderCradD.png"></image>
        <text class="num">10:00</text>
      </view>
      <view class="fub">5月17日 周二</view>
      <view class="title mt35">杭州· 华润万象空间</view>
      <view class="rows flex mt35">
        <view class="item">
          <view class="label mb15">所属区域</view>
          <view class="text">初级会员区</view>
        </view>
        <view class="item">
          <view class="label mb15">工位号</view>
          <view class="text">A234</view>
        </view>
        <view class="item">
          <view class="label mb15">会议室类型</view>
          <view class="text">高级</view>
        </view>
      </view>
      <view class="info">
        <view class="li flex mt25">
          <text class="label">预约人：</text>
          <text class="text">段誉</text>
        </view>
        <view class="li flex mt25">
          <text class="label">成员id：</text>
          <text class="text">3332221212</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="order mt35 p35">
      <view class="title mb35">
        订单明细
      </view>
      <view class="expansion mb10 flex">
        <view class="text">工位预约</view>
        <view class="price">¥3000</view>
      </view>
      <view class="count">
        × 5.5h
      </view>
      <view class="expansion mb10 flex mt45">
        <view class="text">权益抵扣</view>
        <view class="price" style="color: #FF3434;">-¥75</view>
      </view>
      <view class="count">
        × 5.5h
      </view>
      <view class="all">
        总计
        <text class="">¥3000</text>
      </view>
    </view>
    <!--  -->
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
        确认预约
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
    title: query!.type == '0' ? '预定工位' : '预定会议室'
  });
  state.type = query!.type
});
// 参数
const state = reactive({
  type: 0, // 
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 35rpx 35rpx 200rpx;
  .card {
    height: 668rpx;
    background-image: url('http://47.116.190.37:8002/static/user/memberOrderCardBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
      text-align: center;
      color: #232322;
      font-size: 28rpx;
      font-weight: 600;
      border: 1px solid #FFCF00;
    }
    .rows {
      justify-content: space-between;
      .item {
        .label {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #898784;
        }
        .text {
          display: inline-block;
          font-size: 32rpx;
          font-weight: 600;
          line-height: 40rpx;
          color: #232322;
        }
      }
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
