<template>
  <view class="content">
    <view class="info" :style="{
            paddingTop: state.navAllHeight + 'rpx'
          }">
      <view class="user flex p0-35">
        <view class="left" @click="">
          <view class="name oneEllipsis" @click="loginTo">{{ state.nickname ? state.nickname : t('Pleaselogin') }}</view>
          <view class="id mt10" v-if="state.userId">ID：{{ state.userId }}</view>
        </view>
        <view class="right">
          <image class="head" :src=" state.avatarUrl ? state.avatarUrl : '../../static/home/head.png' "></image>
          <image class="icon" src="/@/static/rightBlack.png" @click="routerTo(`/pages/user/personalData`, true)" v-if="state.userId"></image>
        </view>
      </view>
      <view class="vip flex m0-35" :class=" state.isInstitution ? 'vip3' : state.level == 1 ? 'vip1' : state.level == 2 ? 'vip2' : '' ">
        <view class="left ml35">
          <view class="grade mt35">
            {{ state.isInstitution ? t('memberagency') : state.type == 'zh' ? userLevelEnums[state.level] : userLevelEnEnums[state.level] }}
            <image class="icon" src="/@/static/rightY.png" v-if="state.isInstitution" @click="routerTo(`/pages/user/openIntroduction`, true)"></image>
            <image class="icon" src="/@/static/rightBlack.png" v-if="state.level != 0 && !state.isInstitution" @click="routerTo(`/pages/user/openIntroduction`, true)"></image>
          </view>
          <view class="date mt15">
            {{ state.level ? `${t('Validuntil')} ${dateToLocaleDateString(state.expireTime)}` : t('10exclusivebenefits') }}
          </view>
        </view>
        <view class="right mt45 mr45" v-if="state.level == 0"  @click="routerTo(`/pages/user/openIntroduction`, true)">
          {{ t('Openmembership') }}
        </view>
      </view>
      <image class="bg" src="https://ritmohub.cn/static/user/userBotBg.png"></image>
    </view>
    <!--  -->
    <view class="interests mt55 flex p0-35">
      <view class="title">
        <text class="text">{{ t('Myrights') }}</text>
        <text class="fub ml15" v-if="state.level == 0">{{ t('Norights') }}</text>
      </view>
      <view class="record" v-if="state.level != 0" @click="routerTo(`/pages/user/record`, true)">
        {{ t('changerecord') }}
        <image class="icon" src="/@/static/rightAsh.png" ></image>
      </view>
    </view>
    <view class="interestsList p0-35 flex mt35" v-if="state.level != 0">
      <view class="card">
        <view class="num mt30">{{ state.basicHours }}</view>
        <view class="text mt15">{{ t('hour') }}</view>
        <view class="grade mt35">{{ t('primary') }}</view>
        <!-- {{ t('conference') }} -->
      </view>
      <view class="card">
        <view class="num mt30">{{ state.premiumHours }}</view>
        <view class="text mt15">{{ t('hour') }}</view>
        <view class="grade mt35">{{ t('senior') }}</view>
        <!-- {{ t('conference') }} -->
      </view>
    </view>
    <view class="menuForm mt35 p0-35">
      <!--  -->
      <view class="li flex"  @click="routerTo(`/pages/home/institutions`, true)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/home/switch.png"></image>
          {{ t('Switchidentity') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="li flex" @click="routerTo(`/pages/user/face`, true)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu2.png"></image>
           {{ t('imageupload') }}
        </view>
        <view class="right flex">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="li flex" @click="routerTo(`/pages/user/inviteFriends`, true)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu3.png"></image>
          {{ t('Invitefriends') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/myReservation?type=${ state.isInstitution ? 1 : 0 }`, true)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu4.png"></image>
          {{ t('Myreservations') }}
        </view>
        <view class="right flex">
          <!-- <text class="text2">0 待使用</text> -->
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/memberMana?id=${state.institutionId}`, true)" v-if="state.isInstitution">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu4.png"></image>
          {{ t('Membermanagement') }}
        </view>
        <view class="right flex">
          <text class="text2">{{ state.currentMemberCount }} / {{ state.totalMemberLimit }}</text>
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/myOrder?type=${ state.isInstitution ? 1 : 0 }`, true)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu5.png"></image>
          {{ t('Myorders') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/setUp`)">
        <view class="left">
          <image class="icon" src="https://ritmohub.cn/static/user/menu6.png"></image>
          {{ t('Settings') }}
        </view>
        <view class="right">
          <image class="icon" src="/@/static/rightAsh.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onHide, onLoad, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerTo, showTips, dateToLocaleDateString } from '/@/utils/currentFun';
import { userRecordList } from '/@/utils/universalArray'
import { userLevelEnums, userLevelEnEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import Home from '/@/api/home';
const homeApi = new Home();
const userApi = new User();
const { t } = useI18n()

onLoad(() => {
  // #ifdef APP
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight;
  // #endif
  
  // #ifdef MP-WEIXIN
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 70;
  // #endif
  state.type = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  // console.log(state.navAllHeight);
  
})
onShow(() => {
  if(uni.getStorageSync('accessToken') && uni.getStorageSync('userInfos')) {
    getUserInfo()
  }
})
// 参数
const state = reactive({
  type: '',
  nickname: '', // 名称
  avatarUrl: '', // 头像
  userId: '', // 
  level: 0, // 0：非会员, 1: 初级会员, 2: 高级会员, 3: 企业会员
  expireTime: '', // 到期时间
  basicHours: 0,
  premiumHours: 0,

  // 
  status: 0, //  
  navAllHeight: 0,
  // 
  isInstitution: false, // 是否是机构
  institutionId: '', // 机构id
  totalMemberLimit: 0, // 机构扩容人数
  currentMemberCount: 0, // 机构目前人数

})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res.data);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar_url? res.data.avatar_url : ''
    // console.log(state.avatarUrl);
    
    state.userId = res.data.id
    state.level = res.data.vip_level
    state.expireTime = res.data.vip_expire_time
    
    // state.rights = res.data.rights
    state.basicHours = res.data.benefits.meeting_room_basic_hours
    state.premiumHours = res.data.benefits.meeting_room_premium_hours
    // userRecordList[0].hours = res.data.rights.meeting_room.hours_formatted
    // userRecordList[2].hours = res.data.rights.workspace.hours_formatted
    state.isInstitution = res.data.current_org_id ? true : false
    state.institutionId = res.data.current_org_id
    if(state.isInstitution) getOrganInfo()
  })
}
// 机构会员调用机构详情
const getOrganInfo = () => {
  homeApi.getOrganizationsInfo(state.institutionId).then((res: any) => {
    // console.log(res.data);
    state.totalMemberLimit = res.data.total_member_limit
    state.currentMemberCount = res.data.current_member_count
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
  background-color: #ffffff;
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
      background-image: url('https://ritmohub.cn/static/user/vip0.png');
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
      background-image: url('https://ritmohub.cn/static/user/vip1.png') !important;
    }
    .vip2 {
      background-image: url('https://ritmohub.cn/static/user/vip3.png') !important;
    }
    .vip3 {
      background-image: url('https://ritmohub.cn/static/user/vip4.png') !important;
      .grade {
        color: #FFCF00 !important;
      }
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
      background-image: url('https://ritmohub.cn/static/user/interestsListBg.png');
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
