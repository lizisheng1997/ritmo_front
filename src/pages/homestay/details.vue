<template>
  <view class="content">
    <view
      class="homestayBanner"
      v-if="state.images?.length">
      <swiper
        circular
        indicator-dots
        autoplay
        style="height: 680rpx">
        <swiper-item
          v-for="(item, index) in state.images"
          :key="index">
          <image
            :src="item"
            style="width: 100%; height: 100%; display: inline-block"></image>
        </swiper-item>
        <view
          class="count"
          v-if="state.images.length >= 6"
          >+{{ state.images.length }}</view
        >
      </swiper>
      <view class="swiper p10">
        <image
          class="item"
          :src="item"
          v-for="(item, index) in state.images"
          :key="index"></image>
        <view
          class="count"
          v-if="state.images.length >= 6"
          >+{{ state.images.length }}</view
        >
      </view>
    </view>
    <!--  -->
    <view class="homestayCard p25">
      <view class="homestay">
        <view class="name">{{ state.name }}</view>
        <!-- <view class="details">
          详情
          <image class="icon" src="../../static/rightBlack.png"></image>
        </view> -->
      </view>
      <!--  -->
      <view class="evaluate mt25">
        <view class="div">
          <image
            class="icon"
            src="../../static/community/nav2.png"></image>
          <text class="text mt5">
            {{ state.intro }}
          </text>
        </view>
        <!-- <view class="details ">
          285人已评价
          <image class="icon" src="../../static/rightBlack.png"></image>
        </view> -->
      </view>
      <!--  -->
      <view class="address mt15">
        <view class="text mt10">
          {{ state.address }}
        </view>
        <view class="btns">
          <view class="btn">
            <u-icon
              name="phone-fill"
              color="#FFCF00"
              @click="makePhoneCall(state.phone)"></u-icon>
          </view>
          <view class="btn ml15">
            <u-icon name="star" color="#FFCF00" v-if="!state.isCollect" @click="getOptionCollect"></u-icon>
            <u-icon name="star-fill" color="#FFCF00" v-else-if="state.isCollect" @click="getOptionCollect"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="listCard">
      <view class="date p0-20">
        <view class="left">
          <text class="text">{{ strToFormatDate(state.startDate) }}</text>
          <text class="day">{{ state.startWeek }}</text>
          <text class="count m0-25"
            >{{ calculateDaysBetweenDates(state.startDate, state.endDate)
            }}{{ t('evening') }}</text
          >
          <text class="text">{{ strToFormatDate(state.endDate) }}</text>
          <text class="day">{{ state.endWeek }}</text>
        </view>
        <view class="hotel">
          <text class="" v-if="state.house">{{ state.house }}{{ t('rooms') }}</text>
          <text class="" v-if="state.house && state.nums">·</text>
          <text class="" v-if="state.nums">{{ state.nums }}{{ t('people') }}</text>
          
        </view>
      </view>
      <view class="div ">
        <view
          class="li  mt20"
          v-for="item in state.houseList"
          :key="item.id">
          <image
            class="banner"
            :src="item.images[0]"
            v-if="item.images?.length"></image>
          <view class="center">
            <view class="name">
              {{ state.type == 'zh' ? item.name : item.name_en }}
            </view>
            <view class="city m10-0">
              {{ item.area }}㎡ ·{{ item.floors }}{{ t('floor') }} ·
              {{ item.types }}{{ t('chamber') }} · {{ item.beds
              }}{{ t('beds') }} · {{ t('Checkin') }}{{ item.livenums
              }}{{ t('people') }}
            </view>
            <view
              class="tags mt10"
              v-if="item.tag_names?.length">
              <view
                class="tag"
                v-for="(s, i) in item.tag_names"
                :key="i"
                >{{ state.type == 'zh' ? s : item.tag_names_en[i] }}</view
              >
            </view>
            <view class="price">
              <text class="unit">￥</text>
              <text class="num">{{ item.house_price }}</text>
              <text class="text">{{ t('rise') }}</text>
              <text
                class="btn ml25"
                @click="
                  () => {
                    operatePopupRef.openDialog(t('submitanappointment'), {
                      id: item.id
                    });
                  }
                "
                >{{ t('reserve1') }}</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="tabs flex p20">
      <view
        class="text pb25"
        :class="index == state.current ? 'textAct' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="tabsClick(index)"
        >{{ item }}</view
      >
    </view>
    <view
      class="introduceCard pb35"
      v-if="state.current == 0 || state.current == 1">
      <view
        class="text"
        v-if="state.current == 0">
        <rich-text :nodes="state.content"></rich-text>
        <view class="title mt30">{{ t('Landlordinformation') }}</view>
        <view class="card mt20">
          <image class="head mr20" src="../../static/community/headimg.png"></image>
          <view class="cardInfo mt8">
            <view class="name">{{ state.owner }}</view>
            <view class="mt5" style="color: #999;">{{ state.city }}</view>
          </view>
          <view class="btn mt20"
              @click="makePhoneCall(state.ownerPhone)">{{ t('contactlandlord') }}</view>
        </view>
      </view>
      <view
        class="text"
        v-if="state.current == 1">
        <rich-text :nodes="state.fuwusheshi"></rich-text>
      </view>
    </view>
    <div class="" v-if="state.current == 2">
      <communityList :list="state.communityList" :isRouter="0"> </communityList>
      
      <u-empty
        :text="t('Nodata')"
        mode="favor"
        v-if="!state.communityList?.length"
        margin-top="80"
        icon-size="200"></u-empty>
    </div>
    <!--  -->
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="
        (show, obj) => {
          if (show) {
            orderTo(obj.id);
          }
        }
      "></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import operatePopup from '/@/components/operatePopup.vue';
import { strToFormatDate, calculateDaysBetweenDates, calculateDatesToWeek } from '/@/utils/currentFun'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  console.log(query);
  state.type = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  state.id = query!.id;
  state.startDate = query!.startDate;
  state.endDate = query!.endDate;
  state.startWeek = calculateDatesToWeek(query!.startDate);
  state.endWeek = calculateDatesToWeek(query!.endDate);

  state.keyword = query!.keyword;
  state.price = query!.price;
  state.beds = Number(query!.beds);
  state.house = Number(query!.house);
  state.nums = Number(query!.nums);
});
onShow(() => {
  getInfo();
});
// 参数
let list = [t('HouseOverview'), t('FacilitiesServices'), t('RelatedPosts')];
const operatePopupRef = ref();
const state = reactive({
  type: '', // 语言
  id: '',
  navAllHeight: 0,
  // 日期范围
  startDate: '',
  endDate: '',
  startWeek: '',
  endWeek: '',
  //
  keyword: '',
  price: '',
  day: 0,
  beds: 0, // 床数
  house: 0, // 房型
  nums: 0, // 人数
  // 详情
  images: [] as string[],
  name: '',
  city: '',
  address: '',
  phone: '',
  intro: '',
  content: '',
  fuwusheshi: '',
  owner: '',
  ownerPhone: '',
  isCollect: false,
  current: 0,
  houseList: [] as any[],
  communityList: [] as any[],
});
// 详情
const getInfo = async () => {
  await homestayApi
    .getStoreDetail({
      id: state.id
    })
    .then((res: any) => {
      console.log(res.data);
      state.images = res.data.images;
      state.name = state.type == 'zh' ? res.data.name : res.data.name_en;
      state.city = res.data.city;
      state.address =
        state.type == 'zh' ? res.data.address : res.data.address_en;
      state.intro = state.type == 'zh' ? res.data.intro : res.data.intro_en;
      state.content =
        state.type == 'zh' ? res.data.content : res.data.content_en;
      state.phone = res.data.phone;
      state.fuwusheshi = res.data.fuwusheshi;
      state.isCollect = res.data.isCollect
      state.owner = res.data.owner
      state.ownerPhone = res.data.owner_phone
      getHouseList();
    });
};
// 获取房间列表
const getHouseList = async () => {
  await homestayApi
    .getHouseList({
      store_id: state.id,
      calendar: `${state.startDate}/${state.endDate}`,
      beds: state.beds,
      keyword: state.keyword,
      price: state.price,
      house: state.house,
      nums: state.nums,
      limit: 20,
      page: 1
    })
    .then((res: any) => {
      console.log(res.data.data);
      state.houseList = res.data.data;
    });
};
const makePhoneCall = (phone: string) => {
  uni.makePhoneCall({
    phoneNumber: phone
  });
};
// 提交
const orderTo = async(id: string) => {
  routerTo(
    `/pages/homestay/order?startDate=${state.startDate}&endDate=${state.endDate}&beds=${state.beds}&house=${state.house}&nums=${state.nums}&id=${state.id}&houseId=${id}&type=0`,
    true
  );
};
// tabs
const tabsClick = (idx: number) => {
  state.current = idx
  if( state.current == 2) {
    getPostListByCity()
  }
}
// 根据城市获取帖子
const getPostListByCity = async() => {
  await homestayApi.getPostListByCity({
    city: state.city,
    page: 1,
    limit: 20,
  }).then((res: any) => {
    // console.log(res.data.posts);
    state.communityList = res.data.posts
  })
}
// 收藏
const getOptionCollect = async() => {
  await homestayApi.getOptionCollect({
    type: 1,
    source_id: state.id,
  }).then((res: any) => {
    // console.log(res);
    showTips(res.msg)
    getInfo()
  })
}
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>
.content {
  padding-bottom: 80rpx;
  .homestayBanner {
    width: 100%;
    height: 680rpx;
    position: relative;
    .image {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .swiper {
      position: absolute;
      left: 37rpx;
      top: 420rpx;
      display: flex;
      justify-content: space-between;
      width: 670rpx;
      background-color: #ffffff;
      border-radius: 16rpx;
      .item {
        display: inline-block;
        width: 116rpx;
        height: 116rpx;
        border-radius: 8rpx;
      }
      .count {
        width: 116rpx;
        line-height: 116rpx;
        border-radius: 8rpx;
        position: absolute;
        right: 10rpx;
        top: 10rpx;
        background-color: #363232;
        opacity: 0.8;
        font-weight: 500;
        font-size: 28rpx;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .homestayCard {
    background-color: #ffffff;
    border-radius: 48rpx 0 48rpx 48rpx;
    margin-top: -60rpx;
    position: relative;
    .homestay {
      display: flex;
      justify-content: space-between;
      .name {
        font-weight: 600;
        font-size: 40rpx;
        line-height: 44rpx;
        color: #232322;
        width: 520rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .details {
        font-weight: 500;
        font-size: 28rpx;
        color: #232322;
        .icon {
          display: inline-block;
          width: 34rpx;
          height: 36rpx;
          vertical-align: middle;
        }
      }
    }
    .evaluate {
      display: flex;
      justify-content: space-between;
      .div {
        display: flex;
        .icon {
          display: inline-block;
          width: 36rpx;
          height: 36rpx;
          vertical-align: middle;
          margin: 1px 10rpx 0 0;
        }
        .num {
          font-weight: 500;
          font-size: 24rpx;
          color: #ffcf00;
        }
        .text {
          display: inline-block;
          width: 360rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28rpx;
          line-height: 36rpx;
        }
      }
      .details {
        font-weight: 500;
        font-size: 28rpx;
        color: #232322;
        .icon {
          display: inline-block;
          width: 34rpx;
          height: 36rpx;
          vertical-align: middle;
        }
      }
    }
    .address {
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 28rpx;
        line-height: 36rpx;
        color: #232322;
        width: 500rpx;
      }
      .btns {
        display: flex;
        .btn {
          background-color: #a08708;
          width: 64rpx;
          height: 64rpx;
          border-radius: 32rpx;
          display: flex;
          justify-content: center;
          text-align: center;
        }
      }
    }
  }
  .listCard {
    margin: 35rpx 10rpx 10rpx;
    border-radius: 12rpx;
    box-shadow: 0px 4px 10px 0px #c4c1c1;
    background-color: #ffffff;
    padding: 30rpx 10rpx;
    .date {
      display: flex;
      justify-content: space-between;
      .left {
        text {
          display: inline-block;
        }
        .text {
          font-weight: 600;
          font-size: 36rpx;
          color: #232322;
        }
        .day {
          font-weight: 500;
          font-size: 28rpx;
          color: #232322;
        }
        .count {
          font-weight: 500;
          font-size: 18rpx;
          color: #232322;
          width: 40rpx;
          line-height: 18rpx;
          text-align: center;
          border-radius: 18rpx;
          border: 1px solid #232322;
          vertical-align: middle;
          margin-top: -10rpx;
        }
      }
      .hotel {
        line-height: 54rpx;
      }
    }
    .div {
      .li {
        display: flex;
        border-top: 1PX solid #F5F3EF;
        padding: 20rpx 10rpx 0;
        .banner {
          display: inline-block;
          width: 180rpx;
          height: 200rpx;
          border-radius: 8rpx;
          margin-right: 25rpx;
        }
        .center {
          width: calc(100% - 210rpx);
          .name {
            font-weight: 600;
            font-size: 28rpx;
            line-height: 44rpx;
            color: #232322;
          }
          .city {
            font-weight: 500;
            font-size: 20rpx;
            color: #232322;
          }
          .tags {
            display: flex;
            .tag {
              display: inline-block;
              padding: 10rpx 8rpx;
              border-radius: 5rpx;
              background-color: #f5f3ef;
              color: #898784;
              font-weight: 400;
              font-size: 16rpx;
              line-height: 1;
              margin-right: 15rpx;
            }
          }
          .price {
            text-align: right;
            .unit {
              font-weight: 500;
              font-size: 20rpx;
              color: #e93516;
            }
            .num {
              font-weight: 500;
              font-size: 36rpx;
              color: #e93516;
            }
            .text {
              font-weight: 500;
              font-size: 20rpx;
              color: #898784;
            }
            .btn {
              display: inline-block;
              width: 70rpx;
              line-height: 60rpx;
              text-align: center;
              background-color: #ffcf00;
              border-radius: 16rpx;
              font-weight: 600;
              font-size: 28rpx;
              color: #232322;
            }
          }
        }
      }
    }
  }
  .introduceCard {
    margin: 0 10rpx 0;
    .title {
      font-weight: 600;
      font-size: 32rpx;
      line-height: 44rpx;
      color: #232322;
    }
    .card {
      overflow: hidden;
      .head {
        float: left;
        width: 100rpx;
        height: 100rpx;
        border-radius: 70rpx;
      }
      .cardInfo {
        float: left;
        .name {
          font-size: 28rpx;
        }
      }
      .btn {
        float: right;
        width: 160rpx;
        line-height: 56rpx;
        text-align: center;
        border-radius: 16rpx;
        background: #FFCF00;
        color: #232322;
      }
    }
    .text {
      padding: 20rpx 20rpx 30rpx;
      font-weight: 500;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #232322;
      border-radius: 12rpx;
      box-shadow: 0px 4px 10px 0px #c4c1c1;
      background-color: #ffffff;
    }
  }
}

.tabs {
  border-bottom: 1px solid #f5f3ef;
  .text {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #898784;
    position: relative;
    margin-right: 60rpx;
  }
  .textAct {
    color: #232322;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40rpx;
      height: 8rpx;
      background-color: #ffcf00;
    }
  }
}
</style>
