<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup pb35">
      <view class="title">
        {{ t('Choosepaymentmethod') }}
      </view>
      <view class="form mb35">
        <template v-for="item in list" :key="item.key">
          <view class="li flex mb25 pb25" v-if=" state.provider.includes(item.key) ">
            <view class="left flex">
              <image class="icon mr25" :src="item.image"></image>
              <text class="text">{{ item.value }}</text>
              <!--  -->
            </view>
            <image class="select" src="/@/static/selectIcon.png" v-if=" state.type == item.key "></image>
            <image class="select" src="/@/static/select.png" v-else @click="state.type = item.key"></image>
          </view>
        </template>
      </view>
      <view class="footerPopup p0-35">
        <view class="btn left" @click="sumbit(false)">{{ t('cancel') }}</view>
        <view class="btn right" @click="sumbit(true)">{{ t('confirm') }}</view>
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
const list = ref([
  {
    key: 'wxpay',
    value: '微信',
    image: 'https://ritmohub.cn/static/space/wechat.png'
  },
  {
    key: 'alipay',
    value: '支付宝',
    image: 'https://ritmohub.cn/static/space/alipay.png'
  },
  {
    key: 'stripe',
    value: 'Stripe',
    image: 'https://ritmohub.cn/static/space/stripe.png'
  },
])
const state = reactive({
  isShow: false, // 
  type: 'wxpay', // wxpay微信支付  alipay支付宝支付 stripe Stripe
  id: '', // 弹窗携带的id
  provider: [] as string[], // 支付环境
})
// 打开弹窗
const openDialog = (id?:string) => {
  // console.log(rows)
  state.id = id ? id : ''
  getProvider()
  state.isShow = true;
};
// 获取支付环境
const getProvider = () => {
  uni.getProvider({
    service: 'payment',
    success: function (res) {
      // console.log(res.provider)
      if( !res.provider?.length ) {
        showTips('暂无支持的支付方式')
        setTimeout(() => {
          state.isShow = false
        }, 1000);
        return
      }
      state.provider = res.provider
      state.type = res.provider[0]
    }
  });
}
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = (show: boolean) => {
  console.log( state.type);
  console.log( state.provider);
  
  if( show && state.type != 'stripe' ) {
    // 
    // #ifdef APP-PLUS
    if( state.type == 'wxpay') {
      showTips('暂不支持微信支付')
      return
    }
    // #endif
    // #ifdef MP-WEIXIN
    
    if( state.type == 'stripe') {
      showTips('暂不支持stripe支付')
      return
    }
    if( state.type == 'wxpay' && !state.provider.includes('wxpay') ) {
      showTips('暂不支持微信支付')
      return
    }
    // #endif
    //  
    if( state.type == 'alipay' && !state.provider.includes('alipay') ) {
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
