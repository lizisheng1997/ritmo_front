<template>
  <view
    class="content"
    :style="{
      paddingTop: state.navAllHeight + 'rpx'
    }">
    <view class="position p0-35">
      <image
        class="back"
        src="../../static/iconLeftBlack.png"
        @click="routerBack(1)"></image>
      <view class="city ml15">
        <view
          class="cityName pl15"
          @click="
            () => {
              state.regionShow = true;
            }
          "
          >{{ state.city }}</view
        >
        <view
          class="date ml25"
          @click="state.calendarShow = true">
          <view class="mt5">
            <text class="text">住</text>
            <text class="" style="color: #ffcf00;">{{ state.startDate.substring(5, 10) }}</text>
          </view>
          <view class="">
            <text class="text">离</text>
            <text class="" style="color: #ffcf00;">{{ state.endDate.substring(5, 10) }}</text>
          </view>
        </view>
        <view class="input">
          <u-input
            v-model="state.keyword"
            :border="false"
            :placeholder="t('enterkeywords')"
            :height="50"
            @confirm="() => {
              clearSearch()
            }" />
        </view>
      </view>

      <view class="myPlace mt8">
        <image
          class="myPlaceIcon"
          src="../../static/collect.png"></image>
        <view class="text">{{ t('collect') }}</view>
      </view>
    </view>
    <!--  -->
    <view class="search p0-20">
      <view class="item" @click="homestayHomeTagsRef.openDialog({
            tag: state.tagIds,
          })">
        {{ t('tags') }}
        <image class="icon" src="../../static/iconDownBlack.png"></image>
      </view>
      <view
        class="item"
        @click="
          homestayHomeFilterRef.openDialog({
            beds: state.beds,
            house: state.house,
            nums: state.nums,
            price: state.price
          })
        ">
        {{ t('peoplebedsbedrooms') }}
        <image
          class="icon"
          src="../../static/iconDownBlack.png"></image>
      </view>
      <view class="item" @click="state.sortshow = true">
        {{ t('sort') }}
        <image
          class="icon"
          src="../../static/iconDownBlack.png"></image>
      </view>
    </view>
    <!--  -->
    <view class="list mt25">
      <view
        class="li p10 mb25"
        @click="detailsTo(item.id)"
        v-for="item in state.list" 
        :key="item.id">
        <image
          class="banner"
          :src="item.image"></image>
        <view class="center">
          <view class="name"> {{ state.type == 'zh' ? item.name : item.name_en }} </view>
          <view class="city m10-0">
            <image
              class="icon"
              src="../../static/address.png"></image>
            {{ state.type == 'zh' ? item.address : item.address_en }}
          </view>
          <view class="evaluate">
            <image
              class="icon"
              src="../../static/community/nav2.png"></image>
            <text class="text">{{ state.type == 'zh' ? item.intro : item.intro_en }}</text>
          </view>
          <view class="tags mt10" v-if="item.tag_list">
            <view class="tag" v-for="i in item.tag_list" :key="i.id">{{ state.type == 'zh' ? i.name : i.name_en }}</view>
          </view>
          <view class="price">
            <text class="unit">￥</text>
            <text class="num">{{ item.house_price }}</text>
            <text class="text">{{ t('rise') }}</text>
          </view>
        </view>
      </view>
    </view>
    <u-empty
      :text="t('Nodata')"
      mode="favor"
      v-if="!state.list?.length"
      margin-top="120"
      icon-size="200"></u-empty>
    <!-- 选择城市 -->
    <u-picker
      mode="region"
      v-model="state.regionShow"
      :isArea="false"
      @confirm="cityConfirm"></u-picker>
    <!-- 日期范围 -->
    <u-calendar
      v-model="state.calendarShow"
      mode="range"
      :min-date="state.minDate"
      max-date="2030-12-31"
      @change="calendarChange"></u-calendar>
    <!-- 筛选项 -->
    <homestayHomeFilter
      ref="homestayHomeFilterRef"
      :isPrice="1"
      @refresh="filterChange" />
    <!-- 标签项 -->
    <homestayHomeTags
      ref="homestayHomeTagsRef"
      :type="state.type"
      @refresh="(ids) => {
        state.tagIds = ids
        clearSearch()
      }" />
    <!-- 排序 -->
     <u-select v-model="state.sortshow" :list="state.sortList" @confirm="sortconfirm" @cancel="() => {
      state.orderby = ''
      clearSearch()
     }" cancel-text="清空"></u-select>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import homestayHomeFilter from '/@/components/homestayHomeFilter.vue';
import homestayHomeTags from '/@/components/homestayHomeTags.vue';
import { routerTo, showTips, routerBack, calculateDatesToWeek } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  console.log(query);

  state.type = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  uni.setNavigationBarTitle({
    title: t('Settings')
  });
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;

  state.minDate = new Date(new Date()).toISOString().split('T')[0];
  state.startDate = query!.startDate;
  state.endDate = query!.endDate;
  state.startWeek = calculateDatesToWeek(query!.startDate);
  state.endWeek = calculateDatesToWeek(query!.startDate);
  state.province = query!.province;
  state.city = query!.city;

  state.keyword = query!.keyword;
  state.tagIds = query!.tagIdx;

  state.beds = Number(query!.beds);
  state.house = Number(query!.house);
  state.nums = Number(query!.nums);
  getCondition()
  clearSearch()
});
// 参数
const state = reactive({
  type: '', // 语言
  keyword: '',
  navAllHeight: 0,
  province: '', // 浙江省
  city: '', // 金华市
  // 日期范围
  minDate: '',
  startDate: '',
  endDate: '',
  startWeek: '',
  endWeek: '',
  beds: 0, // 床数
  house: 0, // 房型
  nums: 0, // 人数
  price: [0, 5000] as number[],
  tagIds: '',
  regionShow: false,
  calendarShow: false,
  sortshow: false,
  list: [] as any[], 
  sortList: [] as any[], 
  orderby: '',
  page: 20,
  pageSize: 1
});
const homestayHomeFilterRef = ref();
const homestayHomeTagsRef = ref()
// 城市回调
const cityConfirm = (e: any) => {
  console.log(e);
  state.province = e.province.name;
  state.city = e.city.name;
  clearSearch()
};
// 日期范围
const calendarChange = (e: {
  startDate: string;
  endDate: string;
  startWeek: string;
  endWeek: string;
}) => {
  console.log(e);
  state.startDate = e.startDate;
  state.endDate = e.endDate;
  state.startWeek = calculateDatesToWeek(e.startDate)
  state.endWeek = calculateDatesToWeek(e.endDate)
  clearSearch()
};
// 弹窗回调
const filterChange = (rows: { beds: number; house: number; nums: number; price: number[] }) => {
  console.log(rows);
  state.beds = rows.beds;
  state.house = rows.house;
  state.nums = rows.nums;
  state.price = rows.price;
  clearSearch()
};
// 排序
const sortconfirm = (e: any[]) => {
  console.log(e);
  state.orderby = e[0].value,
  clearSearch()
}
// 根据城市获取关键词
const getCondition = async() => {
  await homestayApi.getCondition({}).then((res: any) => {
    // console.log(res.data.orderList);
    state.sortList = [
      {
        value: 'comment',
        label: state.type == 'zh' ? res.data.orderList['comment'] : res.data.orderList_en['comment']
      },
      {
        value: 'distance',
        label: state.type == 'zh' ? res.data.orderList['distance'] : res.data.orderList_en['distance']
      },
      {
        value: 'high_price',
        label: state.type == 'zh' ? res.data.orderList['high_price'] : res.data.orderList_en['high_price']
      },
      {
        value: 'low_price',
        label: state.type == 'zh' ? res.data.orderList['low_price'] : res.data.orderList_en['low_price']
      },
      {
        value: 'views',
        label: state.type == 'zh' ? res.data.orderList['views'] : res.data.orderList_en['views']
      },
      {
        value: 'weigh',
        label: state.type == 'zh' ? res.data.orderList['weigh'] : res.data.orderList_en['weigh']
      },
    ]
  })
}
const clearSearch = () => {
  state.pageSize = 1
  state.list = []
  getStoreList()
}
// 获取列表
const getStoreList = async() => {
  await homestayApi.getStoreList({
    province: state.province,
    city: state.city,
    calendar: `${state.startDate}/${state.endDate}`,
    keyword: state.keyword,
    beds: state.beds,
    house: state.house,
    nums: state.nums,
    price: state.price?.length ? `${state.price[0]}-${state.price[1]}`  : '',
    tag: state.tagIds,
    orderby: state.orderby,
    limit: state.page,
    page: state.pageSize
  }).then((res: any) => {
    // console.log(res.data.data);
    state.list = state.list.concat(res.data.data ? res.data.data : []);
  })
}
onReachBottom(() => {
  state.pageSize+=1;
  getStoreList();
  console.log('到底了');
});

// 提交
const detailsTo = (id: string) => {
  routerTo(`/pages/homestay/details?startDate=${state.startDate}&endDate=${state.endDate}&beds=${state.beds}&house=${state.house}&nums=${state.nums}&id=${id}&keyword=${state.keyword}&price=${  `${state.price[0]}-${state.price[1]}` }`, true)
}
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.content {
  padding: 88rpx 0 0 0;
  .position {
    display: flex;
    padding-bottom: 25rpx;
    .back {
      display: inline-block;
      width: 54rpx;
      height: 54rpx;
      margin-top: 8rpx;
    }
    .city {
      width: calc(100% - 155rpx);
      height: 80rpx;
      border: 1px solid #ffcf00;
      border-radius: 40rpx;
      display: flex;
      .cityName {
        display: inline-block;
        line-height: 70rpx;
        font-weight: 600;
        font-size: 32rpx;
      }
      .date {
        font-weight: 600;
        font-size: 12px;
        color: #232322;
        .text {
          font-weight: 400 !important;
          color: #898784;
          margin-right: 4rpx;
        }
      }
      .input {
        border-left: 1px solid #f1f1f1;
        width: calc(100% - 265rpx);
        margin: 10rpx 0 10rpx 15rpx;
        padding-left: 10rpx;
      }
    }
    .myPlace {
      width: 80rpx;
      text-align: center;
      .myPlaceIcon {
        display: inline-block;
        width: 28rpx;
        height: 28rpx;
      }
      .text {
        font-weight: 500;
        font-size: 20rpx;
        letter-spacing: 0px;
        color: #898784;
      }
    }
  }
  .search {
    display: flex;
    .item {
      flex: 1;
      text-align: center;
      font-weight: 500;
      font-size: 24rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 24rpx;
        height: 28rpx;
        vertical-align: middle;
        margin-top: -3rpx;
      }
    }
  }
  .list {
    background: linear-gradient(360deg, #ffffff 16.1%, #ffd400 328.81%);
    padding: 25rpx 25rpx 0 25rpx;
    .li {
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px #c1c1c1;
      border-radius: 15rpx;
      display: flex;
      .banner {
        display: inline-block;
        width: 216rpx;
        height: 216rpx;
        border-radius: 8rpx;
        margin-right: 25rpx;
      }
      .center {
        width: calc(100% - 245rpx);
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
          .icon {
            display: inline-block;
            width: 20rpx;
            height: 22rpx;
          }
        }
        .evaluate {
          display: flex;
          .icon {
            display: inline-block;
            width: 22rpx;
            height: 22rpx;
            vertical-align: middle;
            margin: 3px 10rpx 0 0;
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
            font-size: 18rpx;
            line-height: 36rpx;
          }
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
        }
      }
    }
  }
}
</style>
