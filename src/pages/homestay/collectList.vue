<template>
  <view
    class="content">
    <view class="position p0-35"
    >
      <view class="city  mt5" style="width: 100% !important;">
        <view
          class="cityName pl15 mt5"
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
          <view class="mt10">
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
    </view>
    <!--  -->
    <view class="list mt15">
      <view
        class="li p10 mb25"
        @click="detailsTo(item.id)"
        v-for="item in state.list" 
        :key="item.id">
        <image
          class="banner"
          :src="item.store.images[0]"></image>
        <view class="center">
          <view class="name"> {{ item.store.name }} </view>
          <view class="city m10-0">
            <image
              class="icon"
              src="../../static/address.png"></image>
            {{ item.store.address }}
          </view>
          <view class="evaluate">
            <image
              class="icon"
              src="../../static/community/nav2.png"></image>
            <text class="text">{{ item.store.intro }}</text>
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
      @change="calendarChange" :toolTip="t('Selectdate') " :start-text="t('start')" :end-text="t('end')" :confirmText="t('confirm')"></u-calendar>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  console.log(query);

  state.type = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  uni.setNavigationBarTitle({
    title: t('FavoriteList')
  });

  state.minDate = new Date(new Date()).toISOString().split('T')[0];
  state.startDate = query!.startDate;
  state.endDate = query!.endDate;
  state.province = query!.province;
  state.city = query!.city;

  state.keyword = query!.keyword;
  
});
onShow(() => {
  clearSearch()
})
// 参数
const state = reactive({
  type: '', // 语言
  keyword: '',
  province: '', // 浙江省
  city: '', // 金华市
  // 日期范围
  minDate: '',
  startDate: '',
  endDate: '',
  beds: 0, // 床数
  house: 0, // 房型
  nums: 0, // 人数
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
}) => {
  console.log(e);
  state.startDate = e.startDate;
  state.endDate = e.endDate;
  clearSearch()
};
const clearSearch = () => {
  state.pageSize = 1
  state.list = []
  getStoreList()
}
// 获取列表
const getStoreList = async() => {
  await homestayApi.getCollectList({
    type: 1,
    province: state.province,
    city: state.city,
    calendar: `${state.startDate}/${state.endDate}`,
    keyword: state.keyword,
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
  routerTo(`/pages/homestay/details?startDate=${state.startDate}&endDate=${state.endDate}&beds=${state.beds}&house=${state.house}&nums=${state.nums}&id=${id}&keyword=${state.keyword}&price=0-5000`, true)
}
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
  @import "/@/styles/homestay.scss";
</style>
