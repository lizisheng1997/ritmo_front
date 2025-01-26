<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup pb35">
      <view class="title">
        选择支付方式
      </view>
      <view class="form mb35">
        <view class="li flex mb25 pb25">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/space/wechat.png"></image>
            <text class="text">微信</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.type == 'wxpay' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.type = 'wxpay'"></image>
        </view>
        <!-- #ifdef APP-PLUS || H5 -->
        <view class="li flex mb25 pb25">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/space/alipay.png"></image>
            <text class="text">支付宝</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.type == 'alipay' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.type = 'alipay'"></image>
        </view>
        <view class="li flex">
          <view class="left flex">
            <image class="icon mr25" src="/@/static/space/stripe.png"></image>
            <text class="text">Stripe</text>
          </view>
          <image class="select" src="/@/static/selectIcon.png" v-if=" state.type == 'stripe' "></image>
          <image class="select" src="/@/static/select.png" v-else @click="state.type = 'stripe'"></image>
        </view>
        <!-- #endif -->
      </view>
      <view class="footerPopup p0-35">
        <view class="btn left" @click="sumbit(false)">取消</view>
        <view class="btn right" @click="sumbit(true)">确认支付</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showTips } from '../utils/currentFun';
const { t } = useI18n()

// 参数
const state = reactive({
  isShow: false, // 
  type: 'wxpay', // wxpay微信支付  alipay支付宝支付 stripe-Stripe
  id: '', // 弹窗携带的id
  provider: '', // 支付环境
})
// 打开弹窗
const openDialog = (id?:string) => {
  // console.log(rows)
  state.type = 'wxpay'
  state.id = id ? id : ''
  getProvider()
  state.isShow = true;
};
// 获取支付环境
const getProvider = () => {
  uni.getProvider({
    service: 'payment',
    success: function (res) {
        console.log(res.provider)
        
    }
});
}
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = (show: boolean) => {
  if( show && state.type != 'stripe' ) {
    if( state.type == 'wxpay' && !state.provider.indexOf('wxpay') ) {
      showTips('暂不支持微信支付')
      return
    }
    if( state.type == 'alipay' && !state.provider.indexOf('alipay') ) {
      showTips('暂不支持支付宝支付')
      return
    }
  }
  state.isShow = false
  emit('refresh', show, state.type, state.id)
  
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 32rpx;
  line-height: 96rpx;
  text-align: center;
  color: #232322;
}
.form {
  padding: 35rpx;
  .li {
    justify-content: space-between;
    border-bottom: 1PX solid #F5F3EF;
    &:last-child {
      border-bottom: none !important;
    }
    .left {
      .icon {
        display: inline-block;
        width: 60rpx;
        height: 60rpx;
      }
      .text {
        display: inline-block;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 60rpx;
        color: #232322;
      }
    }
    .select {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
  }
}
.footerPopup {
  display: flex;
  justify-content: space-between;
  .btn {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: 600;
    font-size: 28rpx;
    color: #232322;
    border-radius: 10rpx;
  }
  .left {
    width: 200rpx;
    background-color: #F5F3EF;
  }
  .right {
    width: 360rpx;
    background-color: #FFCF00;
  }
}
</style>
