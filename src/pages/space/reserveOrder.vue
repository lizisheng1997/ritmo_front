<template>
  <view class="content" v-if="state.info">
    <!--  -->
    <view class="card p35">
      <view class="count flex p0-5">
        <text class="num">{{ state.info.start_time }}</text>
        <image class="icon mt25" src="https://ritmohub.cn/static/user/memberOrderCradD.png"></image>
        <text class="num">{{ state.info.end_time }}</text>
      </view>
      <!-- <view class="fub">{{ state.info.booking_date }} </view> -->
      <view class="title mt55">{{ state.info.booking_date }}</view>
      <view class="rows flex mt45" v-if="state.spaceInfo">
        <view class="item">
          <view class="label mb15">{{ t('belong') }}</view>
          <view class="text">
            {{ ltype == 'zh' ? spaceLevelEnums[state.spaceInfo.level] : espaceLevelEnums[state.spaceInfo.level] }}
            {{ t('vip') }}
          </view>
        </view>
        <view class="item">
          <view class="label mb15">{{ t('workstation') }}</view>
          <view class="text">{{ state.spaceInfo.name }}</view>
        </view>
        <view class="item">
          <view class="label mb15">{{ t('Meetingroomtype') }}</view>
          <view class="text">{{ ltype == 'zh' ? spaceLevelEnums[state.spaceInfo.level] : espaceLevelEnums[state.spaceInfo.level] }}</view>
        </view>
      </view>
      <view class="info">
        <view class="li flex mt25">
          <text class="label">{{ t('appointedby') }} ：</text>
          <text class="text">{{ state.nickname }}</text>
        </view>
        <view class="li flex mt25">
          <text class="label">{{ t('memberid') }} ：</text>
          <text class="text">{{ state.userId }}</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="order mt35 p35">
      <view class="title mb35">
        {{ t('orderdetails') }}
      </view>
      <view class="expansion mb10 flex">
        <view class="text">{{ t('PayAmount') }}</view>
        <view class="price">¥{{ state.info.amount }}</view>
      </view>
      <!-- <view class="count">
        × {{ state.info.rights_hours }}h
      </view> -->
      <view class="expansion mb10 flex mt45">
        <view class="text">{{ t('Equitydeduction') }}</view>
        <view class="price" style="color: #FF3434;">{{ state.info.rights_hours }}h</view>
      </view>
      <!-- <view class="count">
        × 5.5h
      </view> -->
    </view>
    <!--  -->
    <view class="footer flex">
      <view class="left">
        <view class="price">
          <text class="text">
            {{ t('total') }} :
          </text>
          <text class="num">¥{{ state.info.amount }}</text>
          
        </view>
      </view>
      <view class="right" @click="payZero()">
        {{ t('Confirmappointment') }}
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
import { reactive, ref } from 'vue'
import { getRequestPayment, routerTo, showTips } from '/@/utils/currentFun';
import payPopup from '/@/components/payPopup.vue';
import { spaceLevelEnums, espaceLevelEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '/@/store/modules/user';
import Space from '/@/api/space';
const user = useUserStore();
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? t('Spacereservation') : t('Roomreservation')
  });
  ltype.value = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  state.type = query!.type
  state.sid = query!.sid
  state.id = query!.id 
  // console.log('-------------', );
  state.userId = uni.getStorageSync('userInfos').id 
  state.nickname = uni.getStorageSync('userInfos').nickname
  getInfo()
});
// 参数
const payPopupRef = ref();
const ltype = ref('')
const state = reactive({
  type: 0, // 
  sid: '', // 空间id
  id: '', // 单id
  info: {} as any, // 
  spaceInfo: {} as any,
  userId: '',
  nickname: '',
})
const getInfo = () => {
  if( state.type == 0 ) {
    spaceApi.getSpaceMeetingWorkspacesBook(state.id, {
      space_id: state.sid
    }).then((res: any) => {
      console.log(res.data);
      state.info = res.data
      state.spaceInfo = res.data.workspace
    })
  } else if( state.type == 1 ) {
    spaceApi.getSpaceMeetingRoomsBook(state.id, {
      space_id: state.sid
    }).then((res: any) => {
      console.log(res.data);
      state.info = res.data
      state.spaceInfo = res.data.meeting_room
    })
  }
}
// 支付订单
const getPay = (show: boolean, type: string, id: string) => {
  if (show) {
    // console.log(type);

    if (type == 'wxpay') {
      uni.login({
        success: function (resLogin) {
          if (resLogin.code) {
            // console.log(resLogin);
            payments(type, resLogin.code)
          } else {
            console.log('登录失败！' + resLogin.errMsg);
          }
        }
      });
    }
  }
};
const payZero = () => {
  if( state.info.amount == 0 || state.info.amount == '0.00' ) {
    payments('', 'benefits')
    
  } else {
    payPopupRef.value.openDialog()
  }
}
// 区分支付
const payments = (type: string, code: string) => {
  if( state.type == 0 ) {
    spaceApi.getSpaceWorkspacesOrder(state.id, code).then((res: any) => {
      // showTips(res.message)
      console.log(res.data);
      if( code == 'benefits' ) {
        showTips('支付成功')
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/user/index'
          });
        }, 1000);
      } else {
        getRequestPayment(type, res.data).then((res) => {
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/user/index'
            });
          }, 1000);
        })
      }
    })
  } else {
    spaceApi.getSpaceMeetingRoomsOrder(state.id, code).then((res: any) => {
      // showTips(res.message)
      console.log(res.data);
      if( code == 'benefits' ) {
        showTips('支付成功')
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/user/index'
          });
        }, 1000);
      } else {
        getRequestPayment(type, res.data).then((res) => {
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/user/index'
            });
          }, 1000);
        })
      }
    })
  }
}
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 35rpx 35rpx 200rpx;
  .card {
    height: 668rpx;
    background-image: url('https://ritmohub.cn/static/user/memberOrderCardBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .count {
      justify-content: space-between;
      .num {
        display: inline-block;
        font-size: 48rpx;
        font-weight: 700;
        line-height: 64rpx;
        color: #232322;
      }
      .icon {
        display: inline-block;
        width: 140rpx;
        height: 24rpx;
        vertical-align: middle;
      }
    }
    .fub {
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
      color: #232322;
      margin-top: -10rpx;
      vertical-align: top;
    }
    .title {
      line-height: 100rpx;
      border-radius: 10rpx;
      background: #FFCF001A;
      text-align: center;
      color: #232322;
      font-size: 28rpx;
      font-weight: 600;
      border: 1px solid #FFCF00;
    }
    .rows {
      justify-content: space-between;
      .item {
        .label {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #898784;
        }
        .text {
          display: inline-block;
          font-size: 32rpx;
          font-weight: 600;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
    .info {
      margin-top: 100rpx;
      padding-top: 15rpx;
      border-top: 1PX dashed #D7D4CF;
      .li {
        justify-content: space-between;
        .label {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #898784;
        }
        .text {
          display: inline-block;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
  .order {
    border-radius: 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px 0px #0000001A;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      color: #232322;
    }
    .label {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #898784;
    }
    .expansion {
      justify-content: space-between;
      text {
        display: inline-block;
        line-height: 36rpx;
        font-size: 28rpx;
        color: #232322;
      }
      .text {
        font-weight: 400;
      }
      .price {
        font-weight: 600;
      }
    }
    .count {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #898784;
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 25rpx 35rpx;
  height: 180rpx;
  background-color: #ffffff;
  justify-content: space-between;
  .left {
    .price {
      .text {
        display: inline-block;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 80rpx;
        color: #232322;
      }
      .num {
        font-size: 40rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #FF3434;
      }
    }
  }
  .right {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #232322;
    background-color: #FFCF00;
  }
}
</style>
