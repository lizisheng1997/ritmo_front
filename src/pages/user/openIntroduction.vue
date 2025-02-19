<template>
  <view class="content membersIntroduction">
    <view
      class="top"
      :class="
        state.isInstitution
          ? 'vip3'
          : state.level == 0
          ? 'vip0'
          : state.level == 1
          ? 'vip1'
          : state.level == 2
          ? 'vip2'
          : ''
      "
      :style="{
        height: state.isInstitution ? '360rpx' : '440rpx'
      }">
      <image
        class="back"
        src="/@/static/iconLeftW.png"
        @click="routerBack(1)"
        v-if="state.isInstitution"></image>
      <image
        class="back"
        src="/@/static/iconLeftBlack.png"
        @click="routerBack(1)"
        v-else></image>
      <!-- iconLeftW.png -->
      <view class="user flex">
        <image
          class="head"
          :src="state.avatarUrl"></image>
        <view class="center">
          <view
            class="company flex mt30"
            :style="{ color: state.isInstitution ? '#ffffff' : '#232322' }">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <template v-if="state.isInstitution">
              <image
                class="icon ml10"
                src="/@/static/home/vip3.png"></image>
            </template>
            <template v-else>
              <image
                class="icon ml10"
                src="/@/static/home/vip0.png"
                v-if="state.level == 0"
                style="width: 91rpx"></image>
              <image
                class="icon ml10"
                src="/@/static/home/vip1.png"
                v-else-if="state.level == 1"></image>
              <image
                class="icon ml10"
                src="/@/static/home/vip2.png"
                v-else-if="state.level == 2"></image>
            </template>
          </view>
          <view
            class="name mt10"
            v-if="state.expireTime"
            >有效期至{{ dateToLocaleDateString(state.expireTime) }}</view
          >
        </view>
      </view>
      <view
        class="tabs"
        v-if="!state.isInstitution">
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
        class="interests-roll mt35"
        scroll-x="true"
        scroll-left="0"
        :enable-flex="true"
        style="">
        <template v-if="state.tabsIdx == 1">
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/1.png"></image>
            <view class="text oneEllipsis">静音舱</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/2.png"></image>
            <view class="text oneEllipsis">有限打印</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/3.png"></image>
            <view class="text oneEllipsis">免费茶饮</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/4.png"></image>
            <view class="text oneEllipsis">高速WiFi</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/5.png"></image>
            <view class="text oneEllipsis">8时工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/6.png"></image>
            <view class="text oneEllipsis">全天工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/7.png"></image>
            <view class="text oneEllipsis">5时办公</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="http://47.116.190.37:8002/static/vip/8.png"></image>
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
    <view
      class="interests"
      v-if="!state.isInstitution">
      <view class="title">选择套餐</view>
      <scroll-view
        class="interests-roll mt35"
        scroll-x="true"
        scroll-left="0"
        :enable-flex="true"
        style="height: 240rpx">
        <template v-if="state.tabsIdx == 1">
          <view
            class="card mr35"
            :class="state.selectVip == item.key ? 'cardAct' : ''"
            @click="state.selectVip = item.key"
            v-for="item in basicList"
            :key="item.key">
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
          <view
            class="card mr35"
            :class="state.selectVip == item.key ? 'cardAct' : ''"
            @click="state.selectVip = item.key"
            v-for="item in premiumList"
            :key="item.key">
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
    <template v-if="!state.isInstitution">
      <view class="p35">
        <view
          class="footerOne"
          @click="submit">
          确认购买
        </view>
      </view>
      <view class="tips mb50 ml35">
        <image
          class="icon mr10"
          src="http://47.116.190.37:8002/static/loginSelect.png"
          v-if="!state.select"
          @click="state.select = true"></image>
        <image
          class="icon mr10"
          src="/@/static/selectIcon.png"
          @click="state.select = false"
          v-else></image>
        我已阅读并同意<text
          class=""
          @click="routerTo(`/pages/user/agreement?type=2`)"
          >《会员服务协议》</text
        >
      </view>
    </template>
    <template v-else>
      <view class="interests">
        <view class="title">旗下办公室</view>
        <scroll-view
          class="interests-roll mt35"
          scroll-x="true"
          scroll-left="0"
          :enable-flex="true"
          style="height: 240rpx">
          <view class="room mr25">
            <image
              class="banner"
              src="/@/static/addHead.png"></image>
            <view class="text">XXXX办公室</view>
          </view>
          <view class="room mr25">
            <image
              class="banner"
              src="/@/static/addHead.png"></image>
            <view class="text">XXXX办公室</view>
          </view>
          <view class="room mr25">
            <image
              class="banner"
              src="/@/static/addHead.png"></image>
            <view class="text">XXXX办公室</view>
          </view>
          <view class="room mr25">
            <image
              class="banner"
              src="/@/static/addHead.png"></image>
            <view class="text">XXXX办公室</view>
          </view>
          <view class="room mr25">
            <image
              class="banner"
              src="/@/static/addHead.png"></image>
            <view class="text">XXXX办公室</view>
          </view>
        </scroll-view>
      </view>
    </template>
    <!--  -->
    <view class="details">
      <view class="title"
        >-{{
          state.isInstitution ? '机构' : state.tabsIdx == 1 ? '初级' : '高级'
        }}会员权益-</view
      >
      <view class="news p0-35">
        <template v-if="state.tabsIdx == 1">
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/en1.jpg"
            v-if="state.languageType == 'en'"
            style="height: 900rpx"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/zh1.png"
            v-else
            style="height: 900rpx"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip1-1.png"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip1-2.jpg"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip1-3.jpg"></image>
        </template>
        <template v-else>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/en2.jpg"
            v-if="state.languageType == 'en'"
            style="height: 980rpx"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/zh2.jpg"
            v-else
            style="height: 980rpx"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip2-1.png"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip2-2.jpg"></image>
          <image
            class="icon"
            src="http://47.116.190.37:8002/static/vip/vip2-3.jpg"></image>
        </template>
      </view>
    </view>
    <payPopup
      ref="payPopupRef"
      :isType="1"
      @refresh="getPay"></payPopup>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import payPopup from '/@/components/payPopup.vue';
import {
  routerBack,
  routerTo,
  showTips,
  dateToLocaleDateString,
  copyText
} from '/@/utils/currentFun';
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
  { key: 1, name: '月卡', price: 399, day: 13.3, fub: 'month' },
  { key: 6, name: '季卡', price: 897, day: 9.9, fub: 'season' },
  { key: 12, name: '年费', price: 3108, day: 8.5, fub: 'year' }
]);
const premiumList = ref([
  { key: 1, name: '月卡', price: 899, day: 29.9, fub: 'month' },
  { key: 6, name: '季卡', price: 2397, day: 26.6, fub: 'season' },
  { key: 12, name: '年费', price: 9108, day: 25.1, fub: 'year' }
]);
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
  select: false,
  //
  isInstitution: false // 是否是机构
});
// 获取用户资料
const getUserInfo = async () => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname;
    state.avatarUrl = res.data.avatar_url
      ? res.data.avatar_url
      : 'http://47.116.190.37:8002/static/home/head.png';
    state.userId = res.data.id;
    state.level = res.data.vip_level;
    state.expireTime = res.data.vip_expire_time;
    state.tabsIdx = res.data.vip_level ? res.data.vip_level : 1;

    //
    state.isInstitution = res.data.current_org_id ? true : false;
  });
};
// 提交
const payPopupRef = ref();
const submit = () => {
  if (!state.select) {
    showTips('请先同意服务协议');
    return;
  }
  payPopupRef.value.openDialog();

  
};
// 支付订单
const getPay = (show: boolean, type: string, id: string) => {
  if (show) {
    // console.log(type);
    let obj: any = {}
    if( state.tabsIdx == 1 ) {
      obj = basicList.value.find((item: {key: number}) => item.key ==  state.selectVip)
    } else {
      obj = premiumList.value.find((item: {key: number}) => item.key ==  state.selectVip)
    }

    userApi.getOrdersAdd({
      vip_level: state.tabsIdx,
      duration_type: obj.fub,
      amount: obj.price,
    }).then((resOne: any) => {
      // showTips(resOne.message)
      // console.log(resOne.data.id);
      if (type == 'wxpay') {
        uni.login({
          success: function (resLogin) {
            if (resLogin.code) {
              console.log(resLogin);
              userApi.getVipOrdersPay(resOne.data.id, resLogin.code).then((res: any) => {
                // showTips(res.message)
                console.log(res.data);
                getRequestPayment(type, res.data.orderInfo)
              })
            } else {
              console.log('登录失败！' + resLogin.errMsg);
            }
          }
        });
      }
      
    })
  }
};
const getRequestPayment = (provider: any, obj: any) => {
  // console.log(obj);
  
  uni.requestPayment({
    provider, 
    // orderInfo: obj,
    // @ts-ignore
    appid: obj.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
    timeStamp: obj.timeStamp, // 时间戳（单位：秒）
    package: 'prepay_id=' + obj.package, // 固定值
    paySign: obj.paySign, //签名
    signType: obj.signType, // 签名算法，这里用的 MD5/RSA 签名
    nonceStr: obj.nonceStr, 
    success: function (res) {
      // var rawdata = JSON.parse(res.rawdata);
      // console.log('支付成功');
      showTips('支付成功');
      getUserInfo()
    },
    fail: function (err) {
      console.log('支付失败:' + JSON.stringify(err));
    }
  });
};
</script>

<style lang="scss" scoped>
.content {
  .top {
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
  .vip0 {
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg1.png');
  }
  .vip1 {
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg2.png');
  }
  .vip2 {
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg3.png');
  }
  .vip3 {
    background-image: url('http://47.116.190.37:8002/static/user/membersIntroductionBannerBg4.png');
  }
  .interests {
    .room {
      display: inline-block;
      .banner {
        display: inline-block;
        width: 240rpx;
        height: 160rpx;
        border-radius: 4rpx;
      }
      .text {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 28rpx;
        color: #232322;
      }
    }
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
