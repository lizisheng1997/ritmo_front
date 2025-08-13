<template>
  <view class="content p0-15">
    <view class="hotelCard p25 mt25">
      <view class="hotel mb25">
        <image
          class="banner mr20"
          :src="state.info.images"></image>
        <view class="center">
          <view class="name mt10">{{ state.info.name }}</view>
          <view class="text">
            {{ state.info.area }}㎡ ·{{ state.info.floors }}{{ t('floor') }} ·
            {{ state.info.types }}{{ t('chamber') }} · {{ state.info.beds
            }}{{ t('beds') }} · {{ t('Checkin') }}{{ state.info.livenums
            }}{{ t('people') }}
          </view>
        </view>
      </view>
      <!--  -->
      <view class="line mb25"></view>
      <view class="count p25">
        <view
          class=""
          style="display: flex">
          <view class="date mr45">
            <view class="day">
              {{ strToFormatDate(state.startDate) }}
              <text class="week">{{ state.startWeek }}</text>
            </view>
            <view class="text"> 入住时间: 14:00以后 </view>
          </view>
          <view class="date">
            <view class="day">
              {{ strToFormatDate(state.endDate) }}
              <text class="week">{{ state.endWeek }}</text>
            </view>
            <view class="text"> 离店时间: 12:00以前 </view>
          </view>
        </view>
        <view class="num"> {{ t('total1') }}{{ state.day }}{{ t('evening') }} </view>
      </view>
      <!--  -->
      <view class="form">
        <view class="li p15-0">
          <view class="label">{{ t('Numberrooms') }} </view>
          <view class="text">
            {{ state.info.types }}{{ t('chamber') }}({{ t('Checkin')
            }}{{ state.info.livenums }}{{ t('people') }}）
          </view>
        </view>
        <view class="li p15-0">
          <view class="label">{{ t('Guestsstaying') }} <text class="icon">*</text></view>
          <view class="input">
            <input
              v-model="state.lodgersName"
              :placeholder="t('Guestinformation')"
              :disabled=" state.pageType == 1 ? state.orderInfo.status != 'created' ? true : false : false "
              style="" />
          </view>
        </view>
        <view class="li p15-0">
          <view class="label">{{ t('phonenumber') }} <text class="icon">*</text></view>
          <view class="input">
            <input
              class=""
              type="number"
              maxlength="11"
              v-model="state.lodgersPhone"
              :placeholder="t('Usedforcontacting')"
              :disabled=" state.pageType == 1 ? state.orderInfo.status != 'created' ? true : false : false " />
          </view>
        </view>
        <view class="li p15-0">
          <view class="label">{{ t('remarks') }} </view>
          <view class="input">
            <input
              class=""
              v-model="state.memo"
              :placeholder="`${t('Enter')}${t('remarks')}`"
              :disabled=" state.pageType == 1 ? state.orderInfo.status != 'created' ? true : false : false " />
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view
      class="priceCrad mt25 p25"
      v-if="state.pageType == 1">
      <view class="price">
        <view class="label">{{ t('OrderingInformation') }}</view>
      </view>
      <view class="li p15-0">
        <view class="label">{{ t('OrderNo') }} </view>
        <view class="text">
          {{ state.orderInfo.orderId }}
        </view>
      </view>
      <view class="li p15-0">
        <view class="label">{{ t('Ordertime') }} </view>
        <view class="text">
          {{ state.orderInfo.createtime }}
        </view>
      </view>
      <view class="li p15-0">
        <view class="label">{{ t('orderstatus') }} </view>
        <view class="text">
          {{ state.orderInfo.typeText }}
        </view>
      </view>
    </view>
    <!--  -->
    <view class="priceCrad mt25 p25">
      <view class="price">
        <view class="label">{{ t('Pricebreakdown') }}</view>
        <view
          class="text"
          style="color: #ff3434">
          {{ t('total') }}
          <text
            class=""
            style="font-size: 26rpx"
            >¥</text
          >
          {{ state.price }}
        </view>
      </view>
      <view
        class="li m25-0 pb25"
        v-for="item in state.houseList"
        :key="item.id">
        <view class="label"
          >{{ t('Checkindate') }}：{{ strToFormatDate(item.day_time_text) }}</view
        >
        <view
          class="text"
          style="color: #898784"
          >¥{{ item.price }}</view
        >
      </view>
    </view>
    <!--  -->
    <view class="footer flex">
      <view class="left">
        <view class="price">
          <text class="text"> {{ t('total') }} : </text>
          <text class="num">¥{{ state.price }}</text>
        </view>
      </view>
      <!--  -->
      <view
        class=""
        style="display: flex">
        <view
          class="right"
          @click="
            () => {
              operatePopupRef.openDialog(t('Doyouwanttocanceltheorder'), {
                id: state.orderId,
                type: 1
              });
            }
          "
          style="margin-right: 25rpx; background-color: #999999"
          v-if="state.pageType == 1 && state.orderInfo.status == 'created'">
          取消订单
        </view>
        <view
          class="right"
          @click="submit"
          v-if="
            state.pageType == 0 ||
            (state.pageType == 1 && state.orderInfo.status == 'created')
          ">
          去支付
        </view>
        <view
          class="right"
          @click="
            () => {
              operatePopupRef.openDialog(t('Doyouwanttoapplyforarefund'), {
                id: state.orderId,
                type: 2
              });
            }
          "
          style="background-color: #ff3434; color: #ffffff"
          v-if="state.pageType == 1 && state.orderInfo.status == 'paid'">
          {{ t('refund') }}
        </view>
      </view>
    </view>
    <!-- 支付 -->
    <payPopup
      ref="payPopupRef"
      :isType="1"
      @refresh="
        (show, type, id) => {
          if (show) {
            getHouseOrderPay(type, id);
          }
        }
      "></payPopup>
    <!--  -->
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="
        (show, obj) => {
          if (show) {
            if (obj.type == 0) {
              if (state.pageType == 1) {
                payPopupRef.openDialog(state.orderId);
              } else {
                getHouseOrderAdd();
              }
            } else if (obj.type == 1) {
              getOrderCancel()
            } else if (obj.type == 2) {
              getOrderCheckout()
            }
          }
        }
      "></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import operatePopup from '/@/components/operatePopup.vue';
import payPopup from '/@/components/payPopup.vue';
import {
  calculateDaysBetweenDates,
  getRequestPayment,
  getRequestWxLogin,
  routerBack,
  strToFormatDate,
  showTips,
  calculateDatesToWeek
} from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import { onLoad } from '@dcloudio/uni-app';
import Login from '/@/api/login';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const loginApi = new Login();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  console.log(query);
  state.type = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  state.pageType = Number(query!.type);
  // @ts-ignore
  state.terminalPay = getApp().globalData.terminalPay;
  if (state.pageType == 0) {
    state.id = query!.id;
    state.houseId = query!.houseId;
    state.startDate = query!.startDate;
    state.endDate = query!.endDate;

    state.beds = Number(query!.beds);
    state.house = Number(query!.house);
    state.nums = Number(query!.nums);
    state.day = calculateDaysBetweenDates(state.startDate, state.endDate);
    state.startWeek = calculateDatesToWeek(state.startDate)
    state.endWeek = calculateDatesToWeek(state.endDate)
  } else {
    state.orderId = query!.orderId;
  }
  getInfo();
});
// 参数
const operatePopupRef = ref();
const payPopupRef = ref();
const state = reactive({
  type: '', // 语言
  pageType: 0, // 0预约进入 1订单进入
  id: '', // 民宿id
  houseId: '', // 房间id
  terminalPay: '',
  //
  startDate: '',
  endDate: '',
  startWeek: '',
  endWeek: '',
  //
  day: 0,
  beds: 3, // 床数
  house: 0, // 房型
  nums: 2, // 人数
  info: {
    name: '',
    area: 0,
    floors: 0,
    types: 0,
    beds: 0,
    livenums: 0,
    images: ''
  },
  orderInfo: {
    orderId: '',
    typeText: '',
    createtime: '',
    status: ''
  },
  houseList: [] as any[], // 每一天价格数组
  price: 0,
  lodgersName: '', // 入住人
  lodgersPhone: '', // 手机号
  memo: '', // 备注
  orderId: '' //
});
// 详情
const getInfo = async () => {
  state.price = 0;
  state.houseList = [];
  if (state.pageType == 0) {
    await homestayApi
      .getHouseBooking({
        id: state.houseId,
        start_time: state.startDate,
        end_time: state.endDate
      })
      .then((res: any) => {
        console.log(res.data.detail);
        state.info.name =
          state.type == 'zh' ? res.data.detail.name : res.data.detail.name_en;
        state.info.area = res.data.detail.area;
        state.info.floors = res.data.detail.floors;
        state.info.types = res.data.detail.types;
        state.info.beds = res.data.detail.beds;
        state.info.livenums = res.data.detail.livenums;
        state.info.images = res.data.detail.images[0];
        if( !res.data.detail.calendar?.length ) {
          state.price =  res.data.detail.price;
        } else {
          calculatePrice(res.data.detail.calendar);
        }
      });
  } else {
    await homestayApi
      .getOrderDetails({
        id: state.orderId
      })
      .then((res: any) => {
        console.log(res.data);
        state.info.name =
          state.type == 'zh'
            ? res.data.source_data.name
            : res.data.source_data.name_en;
        state.info.area = res.data.source_data.area;
        state.info.floors = res.data.source_data.floors;
        state.info.types = res.data.source_data.types;
        state.info.beds = res.data.source_data.beds;
        state.info.livenums = res.data.source_data.livenums;
        state.info.images = res.data.source_data.images[0];

        state.orderInfo.orderId = res.data.orderid;
        state.orderInfo.typeText = res.data.status_text;
        state.orderInfo.createtime = res.data.createtime_text;
        state.orderInfo.status = res.data.status;

        state.lodgersName = res.data.lodgers_name;
        state.lodgersPhone = res.data.lodgers_phone;
        state.memo = res.data.memo;

        state.houseList = [];
        state.price = res.data.amount;

        state.id = res.data.source_data.store_id;
        state.houseId = res.data.source_data.id;
        state.startDate = res.data.checkin_time_text.substring(0, 10);
        state.endDate = res.data.leave_time_text.substring(0, 10);
        state.startWeek = calculateDatesToWeek(state.startDate)
        state.endWeek = calculateDatesToWeek(state.endDate)

        state.day = calculateDaysBetweenDates(state.startDate, state.endDate);
      });
  }
};
// 计算价格
const calculatePrice = (arr: any[]) => {
  let sIdx = arr.findIndex((item) => item.day_time_text == state.startDate);
  let eIdx = arr.findIndex((item) => item.day_time_text == state.endDate);
  // console.log(sIdx);
  // console.log(eIdx);

  arr.forEach((item, index) => {
    if (index >= sIdx && index < eIdx) {
      state.houseList.push(item);
      state.price += Number(item.price);
    }
  });
};
// 支付
const submit = () => {
  if (!state.lodgersName) {
    showTips(`${t('Enter')}${t('Guestsstaying')}`);
    return;
  }
  if (!state.lodgersPhone) {
    showTips(t('Entermobilenumber'));
    return;
  }
  operatePopupRef.value.openDialog(t('Doyouwanttocontinuepaying'), { id: -1, type: 0 });
};
const getHouseOrderAdd = async () => {
  await homestayApi
    .getHouseOrderAdd({
      id: state.houseId,
      platform: state.terminalPay == 'wechat' ? 'miniapp' : 'app',
      memo: state.memo,
      nums: state.nums,
      start_time: state.startDate,
      end_time: state.endDate,
      lodgers_name: state.lodgersName,
      lodgers_phone: state.lodgersPhone
    })
    .then((res: any) => {
      // console.log(res);
      payPopupRef.value.openDialog(res.data.id);
    });
};
//
const getHouseOrderPay = async (type: string, orderId: string) => {
  console.log(type, orderId);
  await homestayApi
    .getHouseOrderPay({
      id: orderId,
      paytype:
        type == 'wxpay' ? 'wechat' : type == 'alipay' ? 'alipay' : 'stripe',
      method: state.terminalPay == 'wechat' ? 'miniapp' : 'app'
    })
    .then((res: any) => {
      console.log(res);
      getRequestPayment(type, res.data)
        .then((res) => {
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/user/index'
            });
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      if (err.code == 509) {
        getRequestWxLogin().then((res) => {
          loginApi
            .getWxLogin({
              code: res,
              nickName: uni.getStorageSync('userInfos').nickname,
              avatarUrl: uni.getStorageSync('userInfos').avatar_url
            })
            .then((res: any) => {
              setTimeout(() => {
                getHouseOrderPay(type, orderId);
              }, 500);
            })
            .catch((res) => {});
        });
      }
    });
};
// 取消订单
const getOrderCancel = async () => {
  await homestayApi
    .getOrderCancel({
      id: state.orderId,
    })
    .then((res: any) => {
      // console.log(res);
      showTips(res.msg)
      setTimeout(() => {
        routerBack(1)
      }, 1500);
    });
};
// 申请退款
const getOrderCheckout = async () => {
  await homestayApi
    .getOrderCheckout({
      id: state.orderId,
    })
    .then((res: any) => {
      // console.log(res);
      showTips(res.msg)
      setTimeout(() => {
        routerBack(1)
      }, 1500);
    });
};
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>
.content {
  padding-bottom: 230rpx;
  .hotelCard {
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #ffffff;
    border-radius: 12rpx;
    .hotel {
      display: flex;
      .banner {
        display: inline-block;
        width: 130rpx;
        height: 100rpx;
        border-radius: 6rpx;
      }
      .center {
        width: calc(100% - 175rpx);
        .name {
          font-weight: 600;
          font-size: 28rpx;
          line-height: 44rpx;
          color: #232322;
        }
        .text {
          font-weight: 500;
          font-size: 24rpx;
          color: #232322;
        }
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background-color: #f5f3ef;
    }
    .count {
      background-color: #f5f3ef;
      border-radius: 10rpx;
      display: flex;
      justify-content: space-between;
      .date {
        .day {
          font-weight: 600;
          font-size: 36rpx;
          color: #232322;
          .week {
            font-weight: 500;
            font-size: 24rpx;
          }
        }
        .text {
          font-weight: 500;
          font-size: 20rpx;
          color: #898784;
        }
      }
      .num {
        line-height: 75rpx;
        font-weight: 500;
        font-size: 20rpx;
        color: #898784;
      }
    }
    .form {
      .li {
        display: flex;
        border-bottom: 1px solid #f5f3ef;
        line-height: 72rpx;
        &:last-child {
          border-bottom: none !important;
        }
        .label {
          width: 140rpx;
          font-weight: 500;
          font-size: 32rpx;
          color: #232322;
          .icon {
            color: #ff0000;
          }
        }
        .input {
          height: 70rpx;
          line-height: 70rpx;
          width: calc(100% - 160rpx);
          input {
            display: inline-block;
            width: 100%;
            height: 70rpx;
            line-height: 70rpx;
          }
        }
        .text {
          font-weight: 500;
          font-size: 32rpx;
          color: #232322;
        }
      }
    }
  }
  .priceCrad {
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #ffffff;
    border-radius: 12rpx;
    .price {
      display: flex;
      justify-content: space-between;
      .label {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 44rpx;
        color: #232322;
      }
      .text {
        font-weight: 600;
        font-size: 32rpx;
        line-height: 52rpx;
      }
    }
    .li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f1f1f1;
      &:last-child {
        border-bottom: none;
      }
      .label {
        font-weight: 500;
        font-size: 28rpx;
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
          color: #ff3434;
        }
      }
    }
    .right {
      width: 160rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #232322;
      background-color: #ffcf00;
    }
  }
}
</style>
