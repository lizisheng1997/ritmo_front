<template>
  <view class="content p35">
    <view class="head">
      <view class="picture">
        <image class="imageW100" :src="form.avatarUrl"></image>
        <image class="icon" src="/@/static/user/uploadImg.png" @click="uploadImage()"></image>
      </view>
    </view>
    <!--  -->
    <view class="menuForm " style="margin-top: 80rpx;">
      <view class="li flex">
        <view class="left">
          昵称
        </view>
        <view class="right flex">
          <text class="text2"> {{ form.nickname }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=0&value=${form.nickname}`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          个人简介
        </view>
        <view class="right flex">
          <text class="text2 textTwoEllipsis twoEllipsis" style="text-align: right;">{{ form.intro }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=1&value=${form.intro}`)"></image>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          常驻空间
        </view>
        <view class="right flex">
          <text class="text2">杭州·顺丰中心节奏空间</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=2&value=${form.email}`)"></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="hide flex">
      <text class="text">隐藏手机号和邮箱</text>
      <u-switch v-model="state.checked" active-color="#FF3434" inactive-color="#D7D4CF"></u-switch>
    </view>
    <!--  -->
    <view class="menuForm mt35" v-if="!state.checked">
      <view class="li flex">
        <view class="left">
          手机号
        </view>
        <view class="right flex">
          <text class="text2">+{{ form.areaCode }} {{ form.phone }}</text>
        </view>
      </view>
      <view class="li flex">
        <view class="left">
          邮箱
        </view>
        <view class="right flex">
          <text class="text2">{{ form.email }}</text>
          <image class="icon" src="/@/static/rightAsh.png"  @click="routerTo(`/pages/user/editData?type=3&value=${form.email}`)"></image>
        </view>
      </view>
    </view>
    <view class="footerOne" @click="submit">
      确认修改
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app';
import { burrentChooseImage, routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import User from '/@/api/user';
import Login from '/@/api/login';
const loginApi = new Login();
const userApi = new User();
const { t } = useI18n()
const user = useUserStore();

onLoad(() => {
  getUserInfo()
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
  checked: false,
  select: false, // 
  image: '',
})
const form = reactive({
  userId: '',
  nickname: '', // 名称
  avatarUrl: '', // 头像
  phone: '', // 手机号
  email: '', // 邮箱
  intro: '', // 个人介绍
  // intro: '', // 个人介绍
  areaCode: ''
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res.data);
    form.userId = res.data.id
    form.nickname = res.data.nickname
    form.intro = res.data.intro
    form.avatarUrl = res.data.avatar? res.data.avatar.url : ''
    form.phone = res.data.phone
    form.areaCode = res.data.area_code
    form.email = res.data.email
  })
}
// 上传图片
const uploadImage = () => {
   burrentChooseImage(0, 1).then((res: any) => {
    // console.log(res);
    
    // form.avatarUrl = res[0]
    userApi.getUpdateUserAvatar({ filePath: res[0] }).then((res: any) => {
      console.log(res);
      
      // form.avatarUrl = res
    }).catch((err) => {
    })
  })
}
// 
const submit = async() => {
  if(!form.nickname && !form.email && !form.intro) {
    showTips('请填写资料')
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
  await userApi
    .getUserInfo({})
    .then((res: any) => {
      // console.log(res);
      showTips(res.message)
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
