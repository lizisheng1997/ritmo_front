<template>
  <view class="content p35">
    <view class="title">{{ t('Completeinformation') }}</view>
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          {{ t('Nickname') }}
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="form.nickname" :placeholder="t('Pleaseenternicknamename')" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          {{ t('Email') }}
        </view>
        <input class="uni-input ml25" v-model="form.email" :placeholder="t('Pleaseenteremail')" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          {{ t('Invitationcode') }}
        </view>
        <input class="uni-input ml25" maxlength="8" v-model="form.intro" :placeholder="t('Optional')" />
      </view>
    </view>
    <!--  -->
    <view class="addHead mb25">
      {{ t('Addface') }}
    </view>
    <view class="fub mb35">
      {{ t('FaceRecognitionaccesscontrol') }} <br>
      {{ t('Canlaterinaccount') }}
    </view>
    <view class="headImage">
      <image class="imageW100" :src=" form.avatarUrl ? form.avatarUrl : '../../static/addHead.png' " @click="uploadImage"></image>
    </view>
    <!--  -->
    <view class="btn" :class=" ( form.nickname && form.email && form.avatarUrl ) ? '' : 'btnNull' " @click="submit()">
      {{ t('Complete') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { routerTo, showTips, burrentChooseImage } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import User from '/@/api/user';
import Login from '/@/api/login';
import { onLoad } from '@dcloudio/uni-app';
const loginApi = new Login();
const userApi = new User();
const user = useUserStore();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  form.intro = query!.intro ? query!.intro : '';
});
// 参数
const form = reactive({
  nickname: '', // 昵称
  email: '', // 邮箱
  intro: '', // 邀请码
  avatarUrl: '',
})
// 上传人脸
const uploadImage = () => {
   burrentChooseImage(0, 1).then((res: any) => {
    // console.log(res);
    
    // form.avatarUrl = res[0]
    userApi.getUpdateUserFace({ filePath: res[0] }).then((res: any) => {
      // console.log(res);
      
      form.avatarUrl = res.face_url
    }).catch((err) => {
    })
  })
}
// 
const submit = async() => {
  if(!form.nickname && !form.email && !form.avatarUrl) {
    return;
  }
  let { nickname, email, intro, avatarUrl } = form
  await userApi.getUpdateUser({
    nickname,
    email,
    intro,
    avatar_url: avatarUrl
  }).then((res: any) => {
    console.log(res);
    showTips(res.message)
    getAuthUser()
  })
}
// 更新缓存
const getAuthUser = async() => {
  await loginApi
    .getAuthUser()
    .then((res: any) => {
      // console.log(res);
      showTips(res.message)
      user.setUserInfo(res.data);
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/home/index'
        });
      }, 1000);
    });
}
</script>

<style >
page {
  background-color: #FFFFFF;
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
  .addHead {
    margin-top: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44rpx;
    color: #232322;
  }
  .fub {
    font-size: 24rpx;
    font-weight: 500;
    line-height: 32rpx;
    color: #898784;
  }
  .headImage {
    width: 100%;
    height: 320rpx;
    border-radius: 20rpx;
    overflow: hidden;
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
