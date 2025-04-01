<template>
  <view class="content p35">
    <view class="title">{{ state.type ? t('oneLogin') : t('codeLogin') }}</view>
    <view class="fub mt20" v-if="state.type == 0">{{ t('verificationDevices') }}</view>
    <!--  -->
    <view class="form flex pb40" >
      <view class="sign" @click=" state.areaShow = true ">
        <u-icon class="icon" name="plus" color="#232322" size="16"></u-icon>
        {{ state.areaCode }}<u-icon class="icon ml10" name="arrow-down-fill" color="#232322" size="14"></u-icon>
      </view>
      <input class="uni-input ml25" type="number" maxlength="11" v-model="state.phone" :placeholder="t('Entermobilenumber')" />
    </view>
    <!--  -->
    <template v-if=" state.type == 1 ">
      <view class="form flex pb40">
        <view class="sign">
          {{ t('password') }}
        </view>
        <input class="uni-input ml25" password type="text" maxlength="18" v-model="state.password" :placeholder="t('EntermobilePass')" />
      </view>
    </template>
    <!--  -->
    <view class="btn" :class=" ( state.type == 0  && state.phone.length == 11 ) || ( state.type == 1 && state.phone.length == 11 && state.password.length >= 6 ) ? '' : 'btnNull' " @click="submit">{{ state.type ? t('oneLogin') : t('SendCode') }}</view>
    <!--  -->
    <view class="tips mt30 flex" v-if="state.type == 1" @click="() => {
      state.password = ''
      state.type = 0
    }" style="font-size: 28rpx;">
      没有账号？立即注册
    </view>
    <!--  -->
    <view class="tips mt50 flex">
      <image class="icon mr10" src="/@/static/loginSelect.png" v-if="!state.select" @click="state.select = true"></image>
      <image class="icon mr10" src="/@/static/selectIcon.png" @click="state.select = false" v-else></image>
      {{ t('Agree') }}RITMOHUB<text class="" @click="openPupup(0)">《{{ t('userAgreement') }}》</text>、<text class="" @click="openPupup(1)">《{{ t('privacyPolicy') }}》</text> 
    </view>
  </view>
  <textPopup ref="textPopupRef" @refresh="textPopupRefresh" :isType="0"/>
  <!-- 选择 -->
  <u-select v-model="state.areaShow" :list="selectList"  label-name="value" value-name="value" @confirm="confirm" :confirm-text="t('confirm')" :cancel-text="t('cancel')"></u-select>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import textPopup from '/@/components/textPopup.vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import { routerTo, showTips } from '/@/utils/currentFun'
import { selectList } from '/@/utils/universalArray'
import { onLoad } from '@dcloudio/uni-app'
import Login from '/@/api/login';
const loginApi = new Login();
const user = useUserStore();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type ? Number(query!.type) : 0;
});
// 参数
const state = reactive({
  type: 0, // 0验证码 1手机号密码
  phone: '', // 手机号
  intro: '', // 
  password: '', // 
  code: '',
  areaCode: '86', // 
  areaShow: false,
  select: false, // 
})
// 
const submit = () => {
  if( state.phone.length != 11 ) {
    return
  }
  if( !state.select ) {
    showTips('请同意协议')
    return
  }
  // #ifdef APP-PLUS
  getLogin()
  // #endif
  // #ifdef MP-WEIXIN
  uni.login({
    success: function (resLogin: any) {
      // 登录成功
      // console.log(resLogin);
      state.code = resLogin.code
      getLogin()
    },
    fail: function(result) {
      console.log('--------', result);
    },
  });
  // #endif
  // 
  
  // console.log(111);
  
}
const getLogin = () => {
  if( state.type ) {
    if( state.password.length < 6 ) {
      return
    }
    loginApi.getPasswordLogin({
      area_code: state.areaCode,
      phone: state.phone,
      password: state.password,
      wxcode: state.code
    }).then((res: any) => {
      // console.log(res.data.user);
      showTips(res.message)
      user.setUserInfo(res.data.user);
      
      uni.setStorageSync('accessToken', res.data.access_token);
      
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/home/index'
        });
      }, 1000);
    })
  } else {
    routerTo(`/pages/login/inputCode?phone=${state.phone}&areaCode=${state.areaCode}&wxCode=${state.code}`)
  }
}
const confirm = (e: { value: string }[]) => {
  // console.log(e);
  state.areaCode = e[0].value
}
// 打开弹窗
const textPopupRef = ref()
const openPupup = (type: number) => {
  textPopupRef.value.openDialog(type)
}
const textPopupRefresh = (show: boolean) => {
  state.select = show
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background-color: #ffffff;
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
    margin-top: 80rpx;
    // height: 32rpx;
    border-bottom: 1PX solid #D7D4CF;
    .sign {
      width: 100rpx;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 32rpx;
      border-right: 2rpx solid #D7D4CF;
      .icon {
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
    .uni-input {
      display: inline-block;
      height: 32rpx;
      min-height: 32rpx;
      line-height: 32rpx;
    }
  }
  .tips {
    font-weight: 400;
    width: 670rpx;
    font-size: 20rpx;
    line-height: 28rpx;
    color: #898784;
    text {
      color: #232322;
    }
    .icon {
      display: inline-block;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      margin-top: -6rpx;
    }
  }
}
</style>
