<template>
  <view class="content membersIntroduction">
    <view class="top">
      <view class="user flex">
        <image class="head" :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image class="icon ml10" src="/@/static/home/vip0.png" v-if="state.level == 0" style="width: 91rpx;"></image>
            <image class="icon ml10" src="/@/static/home/vip1.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="/@/static/home/vip2.png" v-else-if="state.level == 0"></image>
            <image class="icon ml10" src="/@/static/home/vip3.png" v-else-if="state.level == 0"></image>
          </view>
          <view class="name mt10">有效期至 2024-05-25</view>
        </view>
      </view>
      <view class="tabs flex">
        <view class="text" :class=" state.tabsIdx == 0 ? 'textAct' : '' " @click=" state.tabsIdx = 0 ">初级空间</view>
        <view class="text " :class=" state.tabsIdx == 1 ? 'textAct' : '' " @click=" state.tabsIdx = 1 ">高级控件</view>
      </view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">会员权益</view>
      <scroll-view class="interests-roll mt10" scroll-x="true"  scroll-left="120" :enable-flex="true" style="">
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text oneEllipsis">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/iconShield.png"></image>
          <view class="text">权益一</view>
        </view>
      </scroll-view>
        
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">选择套餐</view>
      <scroll-view class="interests-roll mt35" scroll-x="true"  scroll-left="120" :enable-flex="true" style="height: 240rpx;">
        <view class="card mr35 cardAct">
          <view class="hot">推荐</view>
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
        <view class="card mr35">
          <view class="name mt35">季卡</view>
          <view class="price mt20">
            <text style="font-size: 28rpx;">￥</text>300
          </view>
          <view class="fub mt20">日均仅3元</view>
        </view>
       

      </scroll-view>
    </view>
    <!--  -->
    <view class="p35">
      <view class="footerOne" >
        确认购买
      </view>
    </view>
    <view class="tips mb50 ml35">
      <image class="icon mr10" src="/@/static/loginSelect.png" v-if="!state.select" @click="state.select = true"></image>
      <image class="icon mr10" src="/@/static/selectIcon.png" @click="state.select = false" v-else></image>
      我已阅读并同意<text class="">《会员服务协议》</text>
    </view>
    <!--  -->
    <view class="details">
      <view class="title">-{{ state.tabsIdx == 0 ? '初级' : '高级' }}会员权益-</view>
      <view class="news">

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  getUserInfo()
});
// 参数
const state = reactive({
  nickname: '', // 
  avatarUrl: '', // 
  userId: '', // 
  level: 0, // 
  tabsIdx: 0,
  select: false, // 
  image: '',
})
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar? res.data.avatar.url : ''
    state.userId = res.data.id
    state.level = res.data.vip.level
  })
}
</script>

<style lang="scss" scoped>
.content {
  .top {
    height: 440rpx;
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .tabs {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      justify-content: space-between;
      background: #000000;
      opacity: 0.7;
      border-radius: 20rpx 20rpx 0 0;
      .text {
        width: 50%;
        text-align: center;
        line-height: 80rpx;
        color: #ffffff;
        font-size: 28rpx;
      }
      .textAct {
        font-size: 36rpx;
        background: #ffffff;
        border-radius: 20rpx 20rpx 0 0;
        font-weight: 600;
        color: #232322;
        opacity: 1;
      }
    }
  }
  .interests {
    .card {
      display: inline-block;
      width: 210rpx;
      height: 240rpx;
      border-radius: 10rpx;
      border: 1PX solid #D7D4CF;
      text-align: center;
      position: relative;
      .hot {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 40rpx;
        background-color: #FF3434;
        padding: 0 15rpx;
        font-size: 22rpx;
        color: #ffffff;
        border-radius: 10rpx 0 20rpx 0;
      }
      .name {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 32rpx;
        color: #232322;
      }
      .price {
        font-size: 48rpx;
        font-weight: 700;
        line-height: 60rpx;
        color: #232322;
      }
      .fub {
        font-size: 24rpx;  
        font-weight: 400;
        line-height: 28rpx;
        color: #898784;
      }
    }
    .cardAct {
      background: linear-gradient(180deg, #FFF8F0 0%, #FFD6A6 90%);

    }
  }
  
  .tips {
    font-weight: 400;
    width: 670rpx;
    font-size: 20rpx;
    line-height: 28rpx;
    color: #898784;
    white-space: normal; /* 保留空白符序列，但是正常换行 */
    word-break: break-all; /* 允许在单词内换行 */
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
