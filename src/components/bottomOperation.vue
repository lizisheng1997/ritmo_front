<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup p35">
      <view class="title">
        {{ state.isType == 0 ? t('Exitaccount') : t('Confirmdeleteaccount') }}
      </view>
      <view class="text mt35" v-if="state.isType == 0">
        {{ t('ofthecurrentaccount') }}？
      </view>
      <view class="textAsh mt35" v-else-if="state.isType == 1">
        {{ t('Afterconfirming') }}
      </view>
      <view class="textAsh mt35" v-else-if="state.isType == 2">
        {{ t('Afterconfirming2') }}
      </view>
      <view class="footerTwo flex" >
        <view class="btn btn1" @click="sumbit(0)">{{ t('Thinkagain') }}</view>
        <view class="btn btn2" @click="sumbit(1)"> {{ t('confirm') }}</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
import { showTips } from '../utils/currentFun';
const loginApi = new Login();
const { t } = useI18n()

// 参数
const state = reactive({
  isType: 0, // 0退出账号 1删除账户 2 删除账号保护期
  isShow: false, // 
})
// 打开弹窗
const openDialog = (isType: number) => {
  // console.log(rows)
  state.isType = isType
  state.isShow = true;
};
defineExpose({ openDialog });
const sumbit = async(type: number) => {
  // 
  if( type ) {
    if( state.isType == 0 ) {
      await loginApi.getLogout({}).then((res: any) => {
        showTips(res.message)
        uni.removeStorageSync('accessToken');
        uni.removeStorageSync('userInfos');
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/home/index'
          });
          state.isShow = false
        }, 1000);
      })
    } else if( state.isType == 1 ) {
      await loginApi.getDeactivate({
        reason: '用户提交注销请求后，7天后系统自动处理注销',
      }).then((res: any) => {
        showTips(res.message)
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/user/index'
          });
          state.isShow = false
        }, 1000);
      })

    } else if( state.isType == 2 ) {
      await loginApi.getDeactivateCancel({}).then((res: any) => {
        showTips(res.message)
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/user/index'
          });
          state.isShow = false
        }, 1000);
      })

    }
  }

}
</script>

<style lang="scss" scoped>
.title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
}
.text {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
}
.textAsh {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 44rpx;
  color: #898784;
}
.footerTwo {
  margin: 80rpx 0 40rpx 0;
}
</style>
