<template>
  <view class="content p35">
    <view class="face">
      <image class="imageW100" :src="state.url" @click="avatarCropper()"></image>
    </view>
    <view class="footerOne" @click="submit">
      {{ t('Save') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import { burrentChooseImage, routerBack, showTips } from '/@/utils/currentFun';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: t('imageupload')
  });
  uni.$on('uAvatarCropper', path => {
    // console.log(path);
    state.url = path
    // uploadImage(path)
  })
  getInfo()
});
// 参数
const state = reactive({
  type: 0, // 
  url: '',
})
const getInfo = () => {
  userApi.getUserInfo({}).then((res: any) => {
    // console.log(res.data.face.url);
    state.url = res.data.face_url
  })
}
// 上传人脸
const uploadImage = () => {
   burrentChooseImage(0, 1).then((res: any) => {
    // console.log(res);
    
    state.url = res[0]
    
  })
}
const avatarCropper = () => {
  uni.navigateTo({
    url: `/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper?rectWidth=380&destWidth=380&fileType='png'`
  })
}
// 
const submit = () => {
  uni.showLoading({
    title: '上传中'
  });
  userApi.getUpdateUserFace({ filePath: state.url }).then((res: any) => {
    // console.log(res);
    showTips('上传成功')
    // setTimeout(() => {
    //   routerBack(1)
    // }, 1000);
  }).catch((err) => {
  }).finally(() => {
    uni.hideLoading();
  })
}
</script>

<style >
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  .face {
    display: inline-block;
    width: 100%;
    height: 40vh;
    background-color: #FFFFFF;
  }
  .footerOne {
    margin-top: 65rpx;
  }
}
</style>
