<template>
  <view class="content">
    <view class="info" :style="{
            paddingTop: state.navAllHeight + 'rpx'
          }">
      <view class="user flex p0-35">
        <view class="left" @click="">
          <view class="name oneEllipsis" @click="loginTo">{{ state.nickname ? state.nickname : '请登录' }}</view>
          <view class="id mt10" v-if="state.userId">ID：{{ state.userId }}</view>
        </view>
        <view class="right">
          <image class="head" :src=" state.avatarUrl ? state.avatarUrl : '../../static/home/head.png' "></image>
          <image class="icon" src="http://47.116.190.37:8002/static/rightBlack.png" @click="routerTo(`/pages/user/personalData`)" v-if="state.userId"></image>
        </view>
      </view>
      <view class="vip flex m0-35" :class=" state.level == 1 ? 'vip1' : state.level == 2 ? 'vip2' : state.level == 3 ? 'vip3' : '' ">
        <view class="left ml35">
          <view class="grade mt35">
            {{ userLevelEnums[state.level] }}
            <image class="icon" src="http://47.116.190.37:8002/static/rightBlack.png" v-if="state.level != 0" @click="routerTo(`/pages/user/openIntroduction`)"></image>
          </view>
          <view class="date mt15">
            {{ state.level ? `有效期至 ${state.expireTime}` : '开通会员最高享受10项专属权益' }}
          </view>
        </view>
        <view class="right mt45 mr45" v-if="state.level == 0"  @click="routerTo(`/pages/user/membersIntroduction`)">
          开通会员
        </view>
      </view>
      <image class="bg" src="http://47.116.190.37:8002/static/user/userBotBg.png"></image>
    </view>
    <!--  -->
    <view class="interests mt55 flex p0-35">
      <view class="title">
        <text class="text">我的权益</text>
        <text class="fub ml15" v-if="state.level == 0">暂无可用权益</text>
      </view>
      <view class="record" v-if="state.level != 0">
        变更记录
        <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png" @click="routerTo(`/pages/user/record`, true)"></image>
      </view>
    </view>
    <view class="interestsList p0-35 flex mt35" v-if="state.level != 0">
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
      <view class="card">
        <view class="num mt30">16</view>
        <view class="text mt15">小时</view>
        <view class="grade mt35">初级工位</view>
      </view>
    </view>
    <view class="menuForm mt35 p0-35">
      <!--  -->
      <view class="li flex" v-if="state.level != 2" @click="routerTo(`/pages/home/institutions`)">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/home/switch.png"></image>
          切换身份
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="li flex" v-if="state.level == 2">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu7.png"></image>
          我的人脸 
        </view>
        <view class="right flex">
          <text class="text1">暂无图片</text>
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="li flex" v-if="state.level != 2">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu2.png"></image>
          图片上传 
        </view>
        <view class="right flex">
          <text class="text1">暂无图片</text>
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="li flex">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu3.png"></image>
          邀请好友
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/myReservation`, true)">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu4.png"></image>
          我的预约
        </view>
        <view class="right flex">
          <text class="text2">2 待使用</text>
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/memberMana`, true)">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu4.png"></image>
          成员管理
        </view>
        <view class="right flex">
          <text class="text2">2/10</text>
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/myOrder`, true)">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu5.png"></image>
          我的订单
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/setUp`)">
        <view class="left">
          <image class="icon" src="http://47.116.190.37:8002/static/user/menu6.png"></image>
          设置
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { userLevelEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad(() => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;
  console.log(state.navAllHeight);
  
})
onShow(() => {
  if(uni.getStorageSync('accessToken') && uni.getStorageSync('userInfos')) {
    getUserInfo()
  }
})
// 参数
const state = reactive({
  nickname: '', // 名称
  avatarUrl: '', // 头像
  userId: '', // 
  level: 0, // 0：非会员, 1: 初级会员, 2: 高级会员, 3: 企业会员
  expireTime: '', // 到期时间
  // 
  status: 0, //  
  navAllHeight: 0,

})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    // console.log(res);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar ? res.data.avatar.url : ''
    // console.log(state.avatarUrl);
    
    state.userId = res.data.id
    state.level = res.data.vip.level
    state.expireTime = res.data.vip.expire_time
  })
}
// 去登录页
const loginTo = () => {
  // console.log(state.userId);
  
  if( state.userId ) {
    routerTo(`/pages/user/personalData`)
  } else {
    routerTo(`/pages/login/index`)
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  .info {
    background-color: #F5F3EF;
    position: relative;
    .bg {
      width: 100%;
      height: 24rpx;
      position: absolute;
      left: 0;
      bottom: -5rpx;
    }
    .user {
      justify-content: space-between;
      .left {
        .name {
          width: 440rpx;
          font-size: 48rpx;
          font-weight: 600;
          line-height: 64rpx;
          color: #232322;
        }
      }
      .right {
        .head {
          display: inline-block;
          width: 120rpx;
          height: 120rpx;
          border-radius: 120rpx;
        }
        .icon {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          vertical-align: top;
          margin-top: 35rpx;
        }
      }
    }
    .vip {
      margin-top: 38rpx;
      height: 160rpx;
      background-image: url('http://47.116.190.37:8002/static/user/vip0.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      justify-content: space-between;
      .left {
        .grade {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 44rpx;
          color: #232322;
          .icon {
            display: inline-block;
            width: 40rpx;
            height: 40rpx;
            vertical-align: middle;
            margin-top: -3rpx;
          }
        }
        .date {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 28rpx;
          color: #898784;
        }
      }
      .right {
        width: 140rpx;
        height: 48rpx;
        line-height: 48rpx;
        border-radius: 6rpx;
        text-align: center;
        font-size: 24rpx;
        font-weight: 500;
        color: #232322;
        background-color: #fff;
      }
    }
    .vip1 {
      background-image: url('http://47.116.190.37:8002/static/user/vip1.png') !important;
    }
    .vip2 {
      background-image: url('http://47.116.190.37:8002/static/user/vip3.png') !important;
    }
    .vip3 {
      background-image: url('http://47.116.190.37:8002/static/user/vip4.png') !important;
    }
  }
  .interests {
    justify-content: space-between;
    .title {
      .text {
        display: inline-block;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: #232322;
      }
      .fub {
        display: inline-block;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #898784;
      }
    }
    .record {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #898784;
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        margin-top: -3rpx;
      }
    }
  }
  .interestsList {
    .card {
      width: 150rpx;
      height: 200rpx;
      background-image: url('http://47.116.190.37:8002/static/user/interestsListBg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 26rpx;
      &:last-child {
        margin-right: 0 !important;
      }
      .num {
        text-align: center;
        font-size: 40rpx;
        font-weight: 700;
        line-height: 48rpx;

      }
      .text {
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;
        text-align: center;
        color: #232322;
      }
      .grade {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 28rpx;
        text-align: center;
        color: #232322;
      }
    }
  }
}
</style>
