<template>
  <view class="content p35">
    <view class="title">输入验证码</view>
    <view class="fub mt20">已发送验证码至{{ state.phone }}</view>
    <!--  -->
    <view class="form pb40">
      <u-message-input mode="box" maxlength="6" :value="state.code" width="90"  @change="codeChange"></u-message-input>
    </view>
    <view class="second" :style="{ color: state.counting == true ? '#898784' : '#232322' }" @click="() => {
      if( !state.counting ) sendMobileCode();
    }">
      {{ state.counting == true ? `${state.second}秒后可重新获取` : '重新发送' }}
    </view>
    <!--  -->
    <view class="btn" :class=" state.code.length == 6 ? '' : 'btnNull' " @click="submit">注册并登录</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { defineAsyncComponent, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import { routerTo, showTips } from '/@/utils/currentFun';
import Login from '/@/api/login';
const loginApi = new Login();
const user = useUserStore();
const { t } = useI18n()


onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.phone = query!.phone;
  state.areaCode = query!.areaCode;
  sendMobileCode()
});
// 参数
const state = reactive({
  phone: '', // 手机号
  areaCode: '', // 
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
const sendMobileCode = async() => {
  await loginApi
    .sendCoded({
      phone: state.phone,
      area_code: state.areaCode,
    })
    .then((res: any) => {
      console.log(res);
      // showTips(res.message)
      state.counting = true
      const timer = setInterval(() => {
        state.second--;
        if ( state.second <= 0 ) {
          clearInterval(timer);
          state.counting = false;
          state.second = 60; // 重置倒计时时长
        }
      }, 1000)
    });
  
}
// 
const submit = async() => {
  if( state.code.length != 6 ) {
    showTips('请输入验证码')
    return
  }
  // 
  await loginApi
    .getLogin({
      phone: state.phone,
      area_code: state.areaCode,
      code: state.code
    })
    .then( async(res: any) => {
      // console.log(res);
      showTips(res.message)
      uni.setStorageSync('accessToken', res.data.access_token);
      await getAuthUser()
      // 
    });
  
  
}
// 获取用户信息
const getAuthUser = async() => {
  await loginApi
    .getAuthUser()
    .then((res: any) => {
      // console.log(res);
      showTips(res.message)
      user.setUserInfo(res.data);
      if( res.data.is_new_user ) {
        routerTo(`/pages/login/information`)
      } else {
        routerTo(`/pages/home/index`)
      }
    });
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
