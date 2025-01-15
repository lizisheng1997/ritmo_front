<template>
  <view class="content p35">
    <view class="title">输入验证码</view>
    <view class="fub mt20">已发送验证码至{{ state.phone }}</view>
    <!--  -->
    <view class="form pb40">
      <u-message-input mode="box" maxlength="4" :value="state.code" width="120"  @change="codeChange"></u-message-input>
    </view>
    <view class="second" :style="{ color: state.counting == true ? '#898784' : '#232322' }">
      {{ state.counting == true ? `${state.second}秒后可重新获取` : '重新发送' }}
    </view>
    <!--  -->
    <view class="btn" :class=" state.code.length == 4 ? '' : 'btnNull' " @click="submit">注册并登录</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { defineAsyncComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { routerTo } from '/@/utils/currentFun';
const { t } = useI18n()


onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.phone = query!.phone;
  sendMobileCode()
});
// 参数
const state = reactive({
  phone: '', // 手机号
  code: '', // 
  second: 60, // 秒
  counting: false, // 是否正在倒计时
  select: false, // 
})
const codeChange = (e: string) => {
  // console.log('内容改变，当前值为：' + e);
  state.code = e
}
// 发送验证码
const sendMobileCode = () => {
  state.counting = true
  const timer = setInterval(() => {
    state.second--;
    if ( state.second <= 0 ) {
      clearInterval(timer);
      state.counting = false;
      state.second = 60; // 重置倒计时时长
    }
  }, 1000)
}
// 
const submit = () => {
  if( state.phone.length != 11 ) {
    return
  }
  routerTo(`/pages/user/information`)
  
}
</script>

<style lang="scss" scoped>
.content {
  .title {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 62rpx;
    color: #232322;
  }
  .fub {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #898784;
  }
  .btn {
    width: 100%;
    line-height: 88rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    background-color: #FFCF00;
    margin-top: 80rpx;
  }
  .btnNull {
    opacity: 0.6;
  }
  .form {
    margin-top: 40rpx;
  }
  .second {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 36rpx;

  }
}
</style>
