<template>
  <view class="content p35">
    <view class="head">
      <view class="picture">
        <image class="imageW100" :src="form.avatarUrl"></image>
        <image class="icon" src="/@/static/user/uploadImg.png" @click="avatarCropper()"></image>
      </view>
    </view>
    <!--  -->
    <view class="menuForm " style="margin-top: 80rpx;">
      <view class="li flex">
        <view class="left">
          {{ t('Nickname') }}
        </view>
        <view class="right flex">
          <text class="text2"> {{ form.nickname }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=0&value=${form.nickname}`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          {{ t('PersonalProfile') }}
        </view>
        <view class="right flex">
          <text class="text2 textTwoEllipsis twoEllipsis" style="text-align: right;">{{ form.intro }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=1&value=${form.intro}`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          {{ t('PermanentSpace') }}
        </view>
        <view class="right flex">
          <text class="text2">{{ state.defaultSpaceName ? state.defaultSpaceName : t('Pleaseselect') }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="state.availableShow = true"></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="hide flex">
      <text class="text">{{ t('Hidephonenumber') }}</text>
      <u-switch v-model="form.showPhone" active-color="#FF3434" inactive-color="#D7D4CF"></u-switch>
    </view>
    <!--  -->
    <view class="menuForm mt35" v-if="!form.showPhone">
      <view class="li flex">
        <view class="left">
          {{ t('phonenumber') }}
        </view>
        <view class="right flex">
          <text class="text2">+{{ form.areaCode }} {{ form.phone }}</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="hide flex">
      <text class="text">{{ t('Hideemail') }}</text>
      <u-switch v-model="form.showEmail" active-color="#FF3434" inactive-color="#D7D4CF"></u-switch>
    </view>
    <!--  -->
    <view class="menuForm mt35" v-if="!form.showEmail">
      <view class="li flex">
        <view class="left">
          {{ t('Email') }}
        </view>
        <view class="right flex">
          <text class="text2">{{ form.email }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=3&value=${form.email}`)"></image>
        </view>
      </view>
    </view>
    <view class="footerOne" @click="submit">
      {{ t('Save') }}
    </view>
    <!-- 选择空间 -->
    <u-select v-model="state.availableShow" :list="state.list" @confirm="availableConfirm" value-name="code" label-name="name" :title="t('SelectSpace')" :confirm-text="t('confirm')" :cancel-text="t('cancel')"></u-select>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app';
import { burrentChooseImage, routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()
const user = useUserStore();

onLoad(() => {
  getUserInfo()
  uni.setNavigationBarTitle({
    title: t('editorialmaterial')
  });
  uni.$on('uAvatarCropper', path => {
    // console.log(path);
    form.avatarUrl = path
    // uploadImage(path)
  })
})
onShow(() => {
  // console.log(user.formInput);
  
  if(user.formInput.key == 0) {
      if( user.formInput.value ) form.nickname = user.formInput.value
  } else if(user.formInput.key == 1) {
    form.intro = user.formInput.value
  } else if(user.formInput.key == 2) {
    // form.nickname = user.formInput.value
  } else if(user.formInput.key == 3) {
    form.email = user.formInput.value
  }
})
// 参数
const state = reactive({
  list: [],
  availableShow: false,
  defaultSpaceName: '', // 
})
const form = reactive({
  userId: '',
  nickname: '', // 名称
  avatarUrl: '', // 头像
  phone: '', // 手机号
  email: '', // 邮箱
  intro: '', // 个人介绍
  showPhone: true, // 隐藏手机号
  showEmail: true,  // 隐藏邮箱
  areaCode: '',
  defaultSpace: '', // 空间选择
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res.data    );
    form.userId = res.data.id
    form.nickname = res.data.nickname
    form.intro = res.data.intro
    form.avatarUrl = res.data.avatar_url? res.data.avatar_url : 'https://ritmohub.cn/static/home/head.png'
    form.phone = res.data.phone
    form.areaCode = res.data.area_code
    form.email = res.data.email
    form.showEmail = res.data.ui_flags.show_email
    form.showPhone = res.data.ui_flags.show_phone
    state.list = res.data.spaces.available
    form.defaultSpace = res.data.spaces.default_space.code
    state.defaultSpaceName = res.data.spaces.default_space.name
  })
}
// 选择空间
const availableConfirm = (e: any[]) => {
  console.log(e);
  state.defaultSpaceName = e[0].label
  form.defaultSpace = e[0].value
  
}
const avatarCropper = () => {
  uni.navigateTo({
    url: `/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper?rectWidth=300&fileType='png'`
  })
}
// 
const submit = async() => {
  if(!form.nickname && !form.email && !form.intro) {
    showTips(t('Enter'))
    return;
  }
  // 先上传头像
  if( form.avatarUrl.includes('/uploads/') ) {
    getUpdateUser(form.avatarUrl)
  } else {
    userApi.getUpdateUserAvatar({ filePath: form.avatarUrl }).then(async (res: any) => {
      // console.log(res);
      
      getUpdateUser(res.avatar_url)

    }).catch((err) => {
    })
  }
  
}
const getUpdateUser = async (url: string) => {

  let { nickname, email, intro, avatarUrl, showPhone, showEmail, defaultSpace } = form
  await userApi.getUpdateUser({
    nickname,
    email,
    intro,
    avatar_url: url,
    show_email: showPhone,
    show_phone: showEmail,
    default_space: defaultSpace
  }).then((res: any) => {
    console.log(res);
    showTips(res.message)
    getAuthUser()
  })
}
// 更新缓存
const getAuthUser = async() => {
  await userApi
    .getUserInfo({})
    .then((res: any) => {
      // console.log(res);
      // showTips(res.message)
      user.setUserInfo(res.data);
      setTimeout(() => {
        routerBack(1)
      }, 1000);
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
  .head {
    display: flex;
    justify-content: center;
    .picture {
      width: 160rpx;
      height: 160rpx;
      position: relative;
      .imageW100 {
        border-radius: 160rpx;
      }
      .icon {
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .hide {
    justify-content: space-between;
    margin-top: 65rpx;
    .text {
      display: inline-block;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 54rpx;
      color: #898784;
    }
  }
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
