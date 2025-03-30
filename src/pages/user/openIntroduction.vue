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
              <template v-if="state.level == 0">
                <image
                class="icon ml10"
                src="/@/static/home/vip0.png"
                v-if="state.type == 'zh'"
                style="width: 90rpx"></image>
                <image class="icon ml10" src="/@/static/home/evip0.png" v-else style="width: 90rpx;"></image>
              </template>
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
            >{{ t('Validuntil') }} {{ dateToLocaleDateString(state.expireTime) }}</view
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
            >{{ t('PrimarySpace') }}</view
          >
          <view
            class="text"
            :class="state.tabsIdx == 2 ? 'textAct' : ''"
            @click="state.tabsIdx = 2"
            >{{ t('AdvancedSpace') }}</view
          >
        </view>
      </view>
    </view>
    <!--  -->
    <view class="interests">
      <view class="title">{{ t('MEMBERBENEFITS') }}</view>
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
              src="https://ritmohub.cn/static/vip/1.png"></image>
            <view class="text oneEllipsis">静音舱</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/2.png"></image>
            <view class="text oneEllipsis">有限打印</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/3.png"></image>
            <view class="text oneEllipsis">免费茶饮</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/4.png"></image>
            <view class="text oneEllipsis">高速WiFi</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/5.png"></image>
            <view class="text oneEllipsis">8时工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/6.png"></image>
            <view class="text oneEllipsis">全天工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/7.png"></image>
            <view class="text oneEllipsis">5时办公</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/8.png"></image>
            <view class="text oneEllipsis">全天办公</view>
          </view>
        </template>
        <template v-else>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/9.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/10.png"></image>
            <view class="text">免费茶饮</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/11.png"></image>
            <view class="text">高速WiFi</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/12.png"></image>
            <view class="text">全天工区</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/13.png"></image>
            <view class="text">无限打印</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/14.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/15.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/16.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/17.png"></image>
            <view class="text">权益一</view>
          </view>
          <view class="item">
            <image
              class="icon"
              src="https://ritmohub.cn/static/vip/18.png"></image>
            <view class="text">静音舱</view>
          </view>
        </template>
      </scroll-view>
    </view>
    <!--  -->
    <view
      class="interests"
      v-if="!state.isInstitution">
      <view class="title">{{ t('Chooseapackage') }}</view>
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
            <view class="name mt35">{{ state.type == 'zh' ? item.name : item.ename }}</view>
            <view class="price mt20">
              <text style="font-size: 28rpx">￥</text>
              {{ item.price }}
            </view>
            <view class="fub mt20">{{ t('Daily') }}{{ item.day }}{{ t('RMB') }}</view>
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
            <view class="fub mt20">{{ t('Daily') }}{{ item.day }}{{ t('RMB') }}</view>
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
          {{ t('Confirmpurchase') }}
        </view>
      </view>
      <view class="tips mb50 ml35">
        <image
          class="icon mr10"
          src="/@/static/loginSelect.png"
          v-if="!state.select"
          @click="state.select = true"></image>
        <image
          class="icon mr10"
          src="/@/static/selectIcon.png"
          @click="state.select = false"
          v-else></image>
        <text
          class=""
          @click="routerTo(`/pages/user/agreement?type=2`)"
          >{{ t('havereadandagree') }}《{{ t('MembershipService') }}》</text
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
          state.isInstitution ? t('mechanism') : state.tabsIdx == 1 ? t('primary') : t('senior')
        }}  {{ t('MEMBERBENEFITS') }}-</view
      >
      <view class="news p0-35">
        <template v-if="state.tabsIdx == 1">
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/en1.jpg"
            v-if="state.languageType == 'en'"
            style="height: 900rpx"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/zh1.png"
            v-else
            style="height: 900rpx"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip1-1.png"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip1-2.jpg"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip1-3.jpg"></image>
        </template>
        <template v-else>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/en2.jpg"
            v-if="state.languageType == 'en'"
            style="height: 980rpx"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/zh2.jpg"
            v-else
            style="height: 980rpx"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip2-1.png"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip2-2.jpg"></image>
          <image
            class="icon"
            src="https://ritmohub.cn/static/vip/vip2-3.jpg"></image>
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
  copyText,
  getRequestPayment
} from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;
  state.type = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  // console.log(query);
  // state.id = query!.id
  getUserInfo();

  state.languageType = uni.getStorageSync('languageType');
});
// 参数
// 初级套餐
const basicList = ref([
  { key: 1, name: '月卡', ename: 'monthly card', price: 399, day: 13.3, fub: 'month' },
  { key: 6, name: '半年', ename: 'season card', price: 2154, day: 11.8, fub: 'season' },
  { key: 12, name: '年费', ename: 'annual fee', price: 3588, day: 9.8, fub: 'year' }
]);
const premiumList = ref([
  { key: 1, name: '月卡', ename: 'monthly card', price: 899, day: 29.9, fub: 'month' },
  { key: 6, name: '半年', ename: 'season card', price: 5154, day: 28.3, fub: 'season' },
  { key: 12, name: '年费', ename: 'annual fee', price: 9588, day: 26.2, fub: 'year' }
]);
const state = reactive({
  type: '',
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
      : 'https://ritmohub.cn/static/home/head.png';
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
      
      // @ts-ignore
      let terminalPay = getApp().globalData.terminalPay
      
      if (type == 'wxpay') {
        uni.login({
          "provider": 'weixin',
          onlyAuthorize: true,
          success: function (resLogin: any) {
            // 登录成功,获取openid
            console.log(resLogin);
            // resLogin.authResult.openid
            if (resLogin.code) {
              // device: terminalPay,
              getVipOrdersPay(resOne.data.id, type, `?device=${terminalPay}&code=${resLogin.code}&payment_type='wechat'`)
            } else {
              console.log('登录失败！' + resLogin.authResult.openid);
            }
          },
          fail: function(result) {
            console.log('--------', result);
          },
        });
      } else if( type == 'alipay' ) {
        // console.log(type);
        getVipOrdersPay(resOne.data.id, type, `?device=${terminalPay}&platform=android&payment_type=alipay`)

      }
      
    })
  }
};
const getVipOrdersPay = (id: string, type: string, obj: string) => {
  // console.log(obj);
  
  userApi.getVipOrdersPay(id, obj).then((res: any) => {
    // showTips(res.message)
    console.log(res.data);
    getRequestPayment(type, res.data.orderInfo).then((res) => {
      setTimeout(() => {
        getUserInfo()
      }, 1000);
    })
  }).catch((e) => {
    console.log(e);
    showTips(e.message)
    
  })
}
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
    background-image: url('https://ritmohub.cn/static/user/membersIntroductionBannerBg1.png');
  }
  .vip1 {
    background-image: url('https://ritmohub.cn/static/user/membersIntroductionBannerBg2.png');
  }
  .vip2 {
    background-image: url('https://ritmohub.cn/static/user/membersIntroductionBannerBg3.png');
  }
  .vip3 {
    background-image: url('https://ritmohub.cn/static/user/membersIntroductionBannerBg4.png');
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
