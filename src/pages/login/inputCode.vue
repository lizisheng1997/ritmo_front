<template>
  <view class="content p35">
    <view class="title">{{ t('Entercode') }}: {{ state.oldcode }}</view>
    <view class="fub mt20">{{ t('Verificationcodesentto') }} {{ state.phone }}</view>
    <!--  -->
    <view class="form pb40">
      <u-message-input mode="box" maxlength="4" :value="state.code" width="120"  @change="codeChange"></u-message-input>
    </view>
    <view class="second" :style="{ color: state.counting == true ? '#898784' : '#232322' }" @click="() => {
      if( !state.counting ) sendMobileCode();
    }">
      {{ state.counting == true ? `${state.second}${t('resendinseconds')}` : t('Resend') }}
    </view>
    <!--  -->
    <view class="btn" :class=" state.code.length == 4 ? '' : 'btnNull' " @click="submit">{{ t('Registerandlogin') }}</view>
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
  state.intro = query!.intro ? query!.intro : '';
  sendMobileCode()
});
// 参数
const state = reactive({
  phone: '', // 手机号
  areaCode: '', // 
  oldcode: '',
  code: '', // 
  intro: '',
  second: 60, // 秒
  counting: false, // 是否正在倒计时
  select: false, // 
})
const codeChange = (e: string) => {
  // console.log('内容改变，当前值为：' + e);
  state.code = e
}
// 发送验证码
const timer = ref()
const sendMobileCode = async() => {
  // console.log(state);
  state.code = ''
  await loginApi
    .sendCoded({
      phone: state.phone,
      area_code: state.areaCode,
    })
    .then((res: any) => {
      // console.log(res);
      state.oldcode = res.data.test_code
      // showTips(res.message)
      state.counting = true
      timer.value = setInterval(() => {
        state.second--;
        if ( state.second <= 0 ) {
          clearInterval( timer.value);
          state.counting = false;
          state.second = 60; // 重置倒计时时长
        }
      }, 1000)
    });
  
}
// 
const submit = async() => {
  if( state.code.length != 4 ) {
    showTips(t('Entercode'))
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
      showTips(res.message)
      // user.setUserInfo(res.data);
      clearInterval( timer.value);
      state.counting = false;
      state.second = 60; // 重置倒计时时长
      if( res.data.is_new_user ) {
        routerTo(`/pages/login/information?intro=${state.intro}`)
      } else {
        // routerTo(`/pages/home/index`)
        user.setUserInfo(res.data);
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/home/index'
          });
        }, 1000);
      }
    });
}
</script>
<style >
page {
  background-color: #ffffff;
}
</style>
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
