<template>
  <view class="content p0-35">
    <!--  -->
    <view class="form">
      <view class="item flex pb35">
        <view class="text">
          {{ t('oldpassword') }}
        </view>
        <input class="uni-input ml25" maxlength="18" v-model="form.oldPassword" :placeholder="t('EntermobilePass1')" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          {{ t('newpassword') }}
        </view>
        <input class="uni-input ml25" maxlength="18" v-model="form.newPassword" :placeholder="t('EntermobilePass2')" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          {{ t('newpassword') }}
        </view>
        <input class="uni-input ml25" maxlength="18" v-model="form.newPassword2" :placeholder="t('EntermobilePass2')" />
      </view>
    </view>
    <!--  -->
    <view class="btn" :class=" ( form.oldPassword.length >= 6 && form.newPassword.length >= 6 && form.newPassword2.length >= 6 ) ? '' : 'btnNull' " @click="submit()">
      {{ t('confirm') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { routerTo, showTips, burrentChooseImage } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
const loginApi = new Login();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: t('changePassword')
  });
});
// 参数
const form = reactive({
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
})
// 
const submit = async() => {
  if( form.oldPassword.length < 6 && form.newPassword.length < 6 && form.newPassword2.length < 6) {
    return;
  }
  if( form.newPassword != form.newPassword2 ) {
    showTips(t('EntermobilePass3'))
    return
  }
  loginApi.getResetPassword({
    oldPassword: form.oldPassword,
    newPassword: form.newPassword,
  }).then((res: any) => {
    // console.log(res);
    showTips(res.message)
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
      })
    }, 1000);
  })
}
</script>

<style >
page {
  background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.content {
  .form {
    margin-top: 80rpx;
    // height: 32rpx;
    .item {
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 125rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;

      }
      .uni-input {
        display: inline-block;
        width: calc( 100% - 190rpx );
        height: 36rpx;
        min-height: 36rpx;
        line-height: 36rpx;
      }
    }
  }
  
  .btn {
    margin-top: 70rpx;
    width: 100%;
    line-height: 88rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    background-color: #FFCF00;
  }
  .btnNull {
    opacity: 0.6;
  }
}
</style>
