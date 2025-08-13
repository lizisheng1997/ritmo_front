<template>
  <view class="content">
    <view class="mask"></view>
    <!--  -->
    <view class="interface">
      <view
        class="logo"
        style="margin-bottom: 30%">
        <image
          class="imageW100"
          src="https://ritmohub.cn/static/logo.png"></image>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <button
        class="btn btnOne"
        form-type="submit"
        open-type="getPhoneNumber"
        @getphonenumber="getWxLogin">
        {{ t('weChatLogin') }}
      </button>
      <!-- #endif -->
      <!--  -->
      <!-- #ifdef APP-PLUS -->
      <!-- <view
        class="btn btnOne mt35"
        @click="getWxLogin"
        >{{ t('weChatLogin') }}</view
      > -->
      <view
        class="btn btnOne mt35"
        @click="codeLoginTo(0)"
        >{{ t('codeLogin') }}</view
      >
      <!-- #endif -->
      <view
        class="btn btnCode mt50"
        @click="codeLoginTo(1)"
        >{{ t('oneLogin') }}</view
      >
      <!-- #ifdef MP-WEIXIN -->
      <view
        class="notlogging mt35"
        @click="switchTab"
        >{{ t('logginginhome') }} 。</view
      >
      <!-- #endif -->
      <view class="tips mt30">
        <image
          class="icon mr10"
          src="/@/static/loginSelect.png"
          v-if="!state.select"
          @click="state.select = true"></image>
        <image
          class="icon mr10"
          src="/@/static/selectIcon.png"
          @click="state.select = false"
          v-else></image>
        {{ t('Agree') }} RITMOHUB<text
          class=""
          @click="openPupup(0)"
          >《{{ t('userAgreement') }}》</text
        >、<text
          class=""
          @click="openPupup(1)"
          >《{{ t('privacyPolicy') }}》</text
        >
      </view>
    </view>
    <textPopup
      ref="textPopupRef"
      @refresh="textPopupRefresh" />
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import textPopup from '/@/components/textPopup.vue';
import { routerTo, showTips } from '/@/utils/currentFun';
import { useUserStore } from '/@/store/modules/user';
import { useI18n } from 'vue-i18n';
import { onLoad } from '@dcloudio/uni-app';
import Login from '/@/api/login';
const loginApi = new Login();
const { t } = useI18n();
const user = useUserStore();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.intro = query!.intro ? query!.intro : '';
});
// 参数
const state = reactive({
  select: false, //
  intro: ''
});
// 打开弹窗
const textPopupRef = ref();
const openPupup = (type: number) => {
  textPopupRef.value.openDialog(type);
};
const textPopupRefresh = (show: boolean) => {
  state.select = show;
};
const codeLoginTo = (type: number) => {
  if (!state.select) {
    showTips(t('Pleasechecktheagreement'));
    return;
  }
  routerTo(`/pages/login/codeLogin?type=${type}`);
};
const switchTab = () => {
  uni.switchTab({
    url: '/pages/home/index'
  });
};
// 微信登录
const getWxLogin = (data?: {
  detail: { code: string; errMsg: string; encryptedData: string; iv: string };
}) => {
  state.select = true;
  uni.login({
    provider: 'weixin',
    onlyAuthorize: true,
    success: async function (loginRes: { code: string; errMsg: string }) {
      console.log(loginRes);
      if (loginRes.errMsg == 'login:ok') {
        // #ifdef MP-WEIXIN
        if (data) getPhoneNumber(data, loginRes.code);
        // #endif
        // #ifdef APP-PLUS
        // loginApi
        //     .getWxLogin({
        //       code: loginRes.code,
        //     })
        //     .then((res: any) => {
        //       console.log(res);

        //     })
        //     .catch((res) => {
        //       console.log(res);
        //     });
        // #endif
      } else {
        showTips(t('requestException'));
      }
    },
    fail(result) {
      console.log(result);
    }
  });
};
const getPhoneNumber = (
  data: {
    detail: { code: string; errMsg: string; encryptedData: string; iv: string };
  },
  code: string
) => {
  if (data.detail.errMsg == 'getPhoneNumber:fail user deny') {
    return;
  }
  loginApi
    .getWechatMobile({
      encryptedData: data.detail.encryptedData,
      iv: data.detail.iv,
      code: code
    })
    .then(async (res: any) => {
      uni.setStorageSync('accessToken', res.data.token);
      await getAuthUser();
    })
    .catch(async (res) => {});
};

// 获取用户信息
const getAuthUser = async () => {
  await loginApi.getAuthUser().then((res: any) => {
    console.log(res);
    if (res.data.is_new_user) {
      routerTo(`/pages/login/information?intro=${state.intro}`);
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
};

</script>

<style lang="scss" scoped>
.notlogging {
  width: 85%;
  text-align: left !important;
  color: #ffffff;
}
.content {
  height: 100vh;
  width: 100%;
  background: url('https://ritmohub.cn/static/loginBg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #000;
    opacity: 0.3;
  }
  .interface {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
      width: 308rpx;
      height: 308rpx;
      // margin-top: 30%;
    }
    .phone {
      font-size: 48rpx;
      line-height: 64rpx;
      font-weight: 600;
      color: #ffffff;
      margin-top: 280rpx;
    }
    .provider {
      font-weight: 400;
      font-size: 24rpx;
      color: #d7d4cf;
      line-height: 30rpx;
    }
    .btn {
      width: 670rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-weight: 600;
      color: #232322;
      font-size: 32rpx;
      border-radius: 20rpx;
    }
    .btnOne {
      background-color: #ffcf00;
    }
    .btnCode {
      background-color: #f5f3ef;
    }
    .tips {
      font-weight: 400;
      width: 670rpx;
      font-size: 20rpx;
      line-height: 28rpx;
      color: #f5f3ef;
      white-space: normal; /* 保留空白符序列，但是正常换行 */
      word-break: break-all; /* 允许在单词内换行 */
      text {
        color: #ffcf00;
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
}
</style>
