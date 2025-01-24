<template>
  <view class="content membersIntroduction">
    <view class="top">
      <image class="back" src="http://47.116.190.37:8002/static/icon_left_black@2x.png" @click="routerBack(1)"></image>
      <view class="user flex" :style="{
            paddingTop: state.navAllHeight + 'rpx'
          }">
        <image
          class="head"
          :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip0.png"
              v-if="state.level == 0"
              style="width: 91rpx"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip1.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip2.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip3.png"
              v-else-if="state.level == 0"></image>
          </view>
          <view
            class="name mt10"
            v-if="state.expireTime"
            >有效期至{{ state.expireTime }}</view
          >
        </view>
      </view>
      <view class="tabs">
        <view class="div flex">
          <view
            class="text"
            :class="state.tabsIdx == 1 ? 'textAct' : ''"
            @click="state.tabsIdx = 1"
            >初级空间</view
          >
          <view
            class="text"
            :class="state.tabsIdx == 2 ? 'textAct' : ''"
            @click="state.tabsIdx = 2"
            >高级空间</view
          >
        </view>
      </view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">会员权益</view>
      <scroll-view
        class="interests-roll  mt35"
        scroll-x="true"
        scroll-left="0"
        :enable-flex="true"
        style="">
        <template v-if=" state.tabsIdx == 1 ">
					<view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/1.png"></image>
            <view class="text oneEllipsis">静音舱</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/2.png"></image>
            <view class="text oneEllipsis">有限打印</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/3.png"></image>
            <view class="text oneEllipsis">免费茶饮</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/4.png"></image>
            <view class="text oneEllipsis">高速WiFi</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/5.png"></image>
            <view class="text oneEllipsis">8时工区</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/6.png"></image>
            <view class="text oneEllipsis">全天工区</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/7.png"></image>
            <view class="text oneEllipsis">5时办公</view>
          </view>
          <view class="item">
            <image class="icon" src="http://47.116.190.37:8002/static/vip/8.png"></image>
            <view class="text oneEllipsis">全天办公</view>
          </view>
        </template>
        <template v-else>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/9.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/10.png"></image>
            <view class="text">免费茶饮</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/11.png"></image>
            <view class="text">高速WiFi</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/12.png"></image>
            <view class="text">全天工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/13.png"></image>
            <view class="text">无限打印</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/14.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/15.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/16.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/17.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/18.png"></image>
            <view class="text">静音舱</view>
          </view>
        </template>
        
      </scroll-view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">选择套餐</view>
      <scroll-view
        class="interests-roll mt35"
        scroll-x="true"
        scroll-left="0"
        :enable-flex="true"
        style="height: 240rpx">
        <template v-if="state.tabsIdx == 1">
          <view class="card mr35 " :class=" state.selectVip == item.key ? 'cardAct' : '' " @click="state.selectVip = item.key" v-for="item in basicList" :key="item.key">
            <!-- <view class="hot">推荐</view> -->
            <view class="name mt35">{{ item.name }}</view>
            <view class="price mt20">
              <text style="font-size: 28rpx">￥</text>
              {{ item.price }}
            </view>
            <view class="fub mt20">日均仅{{ item.day }}元</view>
          </view>
        </template>
        <template v-else>
          <view class="card mr35 " :class=" state.selectVip == item.key ? 'cardAct' : '' " @click="state.selectVip = item.key" v-for="item in premiumList" :key="item.key">
            <!-- <view class="hot">推荐</view> -->
            <view class="name mt35">{{ item.name }}</view>
            <view class="price mt20">
              <text style="font-size: 28rpx">￥</text>
              {{ item.price }}
            </view>
            <view class="fub mt20">日均仅{{ item.day }}元</view>
          </view>
        </template>
        
      </scroll-view>
    </view>
    <!--  -->
    <view class="p35">
      <view class="footerOne" @click="submit"> 确认购买 </view>
    </view>
    <view class="tips mb50 ml35">
      <image
        class="icon mr10"
        src="http://47.116.190.37:8002/static/loginSelect.png"
        v-if="!state.select"
        @click="state.select = true"></image>
      <image
        class="icon mr10"
        src="http://47.116.190.37:8002/static/selectIcon.png"
        @click="state.select = false"
        v-else></image>
      我已阅读并同意<text class="">《会员服务协议》</text>
    </view>
    <!--  -->
    <view class="details">
      <view class="title"
        >-{{ state.tabsIdx == 0 ? '初级' : '高级' }}会员权益-</view
      >
      <view class="news p0-35">
        <template v-if=" state.tabsIdx == 0 ">
          <image class="icon" src="http://47.116.190.37:8002/static/vip/en1.jpg" v-if=" state.languageType == 'en' " style="height: 900rpx;"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/zh1.png" v-else style="height: 900rpx;"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-1.png"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-2.jpg"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip1-3.jpg"></image>
        </template>
        <template v-else>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/en2.jpg" v-if=" state.languageType == 'en' " style="height: 980rpx;"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/zh2.jpg" v-else style="height: 980rpx;"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip2-1.png"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip2-2.jpg"></image>
          <image class="icon" src="http://47.116.190.37:8002/static/vip/vip2-3.jpg"></image>
        </template>

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;
  // console.log(query);
  // state.id = query!.id
  getUserInfo();

  state.languageType = uni.getStorageSync('languageType');
});
// 参数
// 初级套餐
const basicList = ref([
  { key: 1, name: '月卡', price: 0, day: 0 },
  { key: 6, name: '季卡', price: 0, day: 0 },
  { key: 12, name: '年费', price: 0, day: 0 },
])
const premiumList = ref([
  { key: 1, name: '月卡', price: 0, day: 0 },
  { key: 6, name: '季卡', price: 0, day: 0 },
  { key: 12, name: '年费', price: 0, day: 0 },
])
const state = reactive({
  languageType: '', //
  selectVip: 1, //
  navAllHeight: 0, // 
  nickname: '', //
  avatarUrl: '', //
  userId: '', //
  level: 0, //
  tabsIdx: 1,
  expireTime: '',
  select: false
});
// 获取用户资料
const getUserInfo = async () => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname;
    state.avatarUrl = res.data.avatar ? res.data.avatar.url : '';
    state.userId = res.data.id;
    state.level = res.data.vip.level;
    state.expireTime = res.data.vip.expire_time;
    state.tabsIdx = res.data.vip.level ? res.data.vip.level : 1
    
    basicList.value[0].price = res.data.vip.prices.basic.month
    basicList.value[0].day = Math.floor(basicList.value[0].price / 30)
    basicList.value[1].price = res.data.vip.prices.basic.quarter * 6
    basicList.value[1].day = Math.floor(basicList.value[1].price / 90)
    basicList.value[2].price = res.data.vip.prices.basic.year * 12
    basicList.value[2].day = Math.floor(basicList.value[2].price / 365)
    // 
    premiumList.value[0].price = res.data.vip.prices.premium.month
    premiumList.value[0].day = Math.floor(res.data.vip.prices.premium.month / 30)
    premiumList.value[1].price = res.data.vip.prices.premium.quarter * 6
    premiumList.value[1].day = Math.floor(premiumList.value[1].price / 90)
    premiumList.value[2].price = res.data.vip.prices.premium.year * 12
    premiumList.value[2].day = Math.floor(premiumList.value[2].price / 365)
  });
};
// 提交
const submit = () => {
  if( !state.select ) {
    showTips('请先同意服务协议')
    return
  }
  let obj: any = {}
  if( state.tabsIdx == 1 ) {
    basicList.value.find((item: {key: number}) => item.key ==  state.selectVip)
  } else {
    premiumList.value.find((item: {key: number}) => item.key ==  state.selectVip)
  }

  userApi.getOrdersAdd({
    vip_level: state.tabsIdx,
    duration: state.selectVip,
    amount: obj.price,
  }).then((res: any) => {
    showTips(res.message)
    console.log(res.data);
    
  })
}
</script>

<style lang="scss" scoped>
.content {
  .top {
    height: 440rpx;
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg2.png');
    // background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .back {
      display: inline-block;
      width: 68rpx;
      height: 68rpx;
      position: absolute;
      left: 35rpx;
      top: 22%;
    }
    .tabs {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 20rpx 20rpx 0 0;
      .div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        justify-content: space-between;
      }
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
      border: 1px solid #d7d4cf;
      text-align: center;
      position: relative;
      .hot {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 40rpx;
        background-color: #ff3434;
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
      background: linear-gradient(180deg, #fff8f0 0%, #ffd6a6 90%);
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
  .news {
    .icon {
      display: inline-block;
      width: 100%;
      margin-top: 35rpx;
    }
  }
}
</style>
