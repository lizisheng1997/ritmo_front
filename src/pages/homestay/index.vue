<template>
  <view class="content">
    <view class="p0-35">
    <view class="position">
      <image class="back" src="../../static/iconLeftBlack.png"></image>
      <view class="city" @click="() => {
        state.regionShow = true
      }">
        {{ state.city }}
        <image class="cityIcon" src="../../static/iconDownBlack.png" @click="() => {
        state.regionShow = true
      }"></image>
      </view>
    </view>
    <view class="position">
      <view class="input">
        <u-input v-model="state.keyword" :border="false" :placeholder="t('Pleaseenterkeywords')" />
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <view class="myPlace" @click="getLocation">
        <image class="myPlaceIcon" src="../../static/myPlace.png"></image>
        <view class="text">{{ t('position') }}</view>
      </view>
      <!-- #endif -->
    </view>
    <!--  -->
    <view class="range p25-0" @click="state.calendarShow = true">
      <view class="date" :style="{
        color: state.startDate ? '#000000' : '#c0c4cc'
      }">
        {{ state.startDate ? strToFormatDate(state.startDate) : t('Selectdate') }}
        <view class="week" v-if="state.startWeek">{{ state.startWeek }}</view>
        <view class="icon">-</view>
        {{ state.endDate ? strToFormatDate(state.endDate) : t('Selectdate') }}
        <view class="week" v-if="state.endWeek">{{ state.endWeek }}</view>
      </view>
      <view class="day">
        {{ state.day }}{{ t('evening') }}
      </view>
    </view>
    <!--  -->
    <view class="count p25-0" @click="homestayHomeFilterRef.openDialog({
      beds: state.beds,
      house: state.house,
      nums: state.nums,
    })">
      <text class="">
        {{ state.beds || state.house || state.nums ? `${state.nums}人/${state.beds}张床/${state.house}间房` : t('peoplebedsbedrooms') }} 
      </text>
      <image class="icon ml5" src="../../static/iconDownBlack.png"></image>
    </view>
    <!--  -->
    <view class="tags">
      <view class="tag mr15 mb15" :class=" state.tagIdx.includes(item.id) ? 'tagAct' : '' " v-for="item in state.tagList" :key="item.id" @click=" tagClick(item.id) ">{{ state.type == 'zh' ? item.name : item.name_en }}</view>
    </view>
    <view class="btn mt35" @click="sumbit">
      {{ t('search') }}
    </view>
    <!--  -->
    <view class="hot mt25">
      {{ t('Recommendedhomestays') }}
      <!-- <image class="icon" src="../../static/rightBlack.png"></image> -->
    </view>
    </view>
      <communityList :list="state.communityList" :isRouter="0"> </communityList>
      <u-empty
        :text="t('Nodata')"
        mode="favor"
        v-if="!state.communityList?.length"
        margin-top="120"
        icon-size="200"></u-empty>
    <!-- 选择城市 -->
    <u-picker mode="region" v-model="state.regionShow" :isArea="false" @confirm="cityConfirm"></u-picker>
    <!-- 日期范围 -->
     <u-calendar v-model="state.calendarShow" mode="range" :min-date="state.minDate" max-date="2030-12-31" @change="calendarChange" :toolTip="t('Selectdate') " :start-text="t('start')" :end-text="t('end')" :confirmText="t('confirm')"></u-calendar>
    <!-- 筛选项 -->
    <homestayHomeFilter ref="homestayHomeFilterRef" :isPrice="0" @refresh="filterChange"/>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { calculateDatesToWeek, calculateDaysBetweenDates, routerTo, showTips } from '/@/utils/currentFun';
import communityList from '/@/components/communityList.vue';
import homestayHomeFilter from '/@/components/homestayHomeFilter.vue';
import { strToFormatDate } from '/@/utils/currentFun'
import { useI18n } from 'vue-i18n'
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  state.type = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  state.minDate = new Date(new Date()).toISOString().split('T')[0]
  getCondition()
  getPostListByCity()
});
const state = reactive({
  type: '', // 语言
  keyword: '',
  navAllHeight: 0,
  regionShow: false,
  province: '浙江省', // 省
  city: '丽水市', // 市
  // 日期范围
  minDate: '',
  startDate: '',
  endDate: '',
  startWeek: '',
  endWeek: '',
  // 
  day: 0,
  beds: 0, // 床数
  house: 0, // 房型
  nums: 0, // 人数
  tagIdx: [] as number[],
  tagList: [] as any[],
  communityList: [] as any[],
  calendarShow: false,
})
const homestayHomeFilterRef = ref()
// 城市回调
const cityConfirm = (e: any) => {
  console.log(e);
  state.province = e.province.name
  state.city = e.city.name
  getPostListByCity()
}
// 获取当前城市
const getLocation = () => {
  uni.getLocation({
    type: 'wgs84', // 坐标系类型，可选wgs84/gcj02
    altitude: true, // 获取高度信息
    isHighAccuracy: true, // 高精度定位
    success: async(res) => {
      // console.log('经度：' + res.longitude);
      // console.log('纬度：' + res.latitude);
      await homestayApi.getStaticAmapRegeo({
        longitude: res.longitude,
        latitude: res.latitude,
      }).then((res: any) => {
        // console.log(res.data.addressComponent);
        state.province = res.data.addressComponent.province
        state.city = res.data.addressComponent.city
        getPostListByCity()
      })
    },
    fail: (err) => {
      console.error('获取位置失败：', err);
    }
  });
  
}
// 日期范围
const calendarChange = (e: { startDate: string, endDate: string, startWeek: string, endWeek: string,  }) => {
  console.log(e);
  state.startDate = e.startDate
  state.endDate = e.endDate
  state.startWeek = calculateDatesToWeek(e.startDate)
  state.endWeek = calculateDatesToWeek(e.endDate)
  state.day = calculateDaysBetweenDates(state.startDate, state.endDate)
} 
// 根据城市获取关键词
const getCondition = async() => {
  await homestayApi.getCondition({}).then((res: any) => {
    // console.log(res.data.filterList[1].value);
    let str = res.data.filterList[1].value
    state.tagList = str.filter((item: { id: number; }) => item.id != 0)
  })
}
// 根据城市获取帖子
const getPostListByCity = async() => {
  await homestayApi.getPostListByCity({
    city: state.city,
    page: 1,
    limit: 20,
    store_id: ''
  }).then((res: any) => {
    // console.log(res.data.posts);
    state.communityList = res.data.posts
  })
}
// 弹窗回调
const filterChange = (rows: { beds: number; house: number; nums: number; }) => {
  console.log(rows);
  state.beds = rows.beds
  state.house = rows.house
  state.nums = rows.nums
}
// tag标签多选
const tagClick = (id: number) => {
  
  let arrIdx = state.tagIdx.findIndex((item: number) => item == id)
  if( arrIdx == -1 ) {
    state.tagIdx.push(id)
  } else {
    state.tagIdx.splice(arrIdx, 1)
  }
}
// 提交
const sumbit = () => {
  // 
  if( !state.startDate ) {
    showTips(`${t('Selectdate')}`)
    return
  }
  routerTo(`/pages/homestay/list?startDate=${state.startDate}&endDate=${state.endDate}&beds=${state.beds}&house=${state.house}&nums=${state.nums}&tagIdx=${state.tagIdx ? state.tagIdx.toString() : ''}&keyword=${state.keyword}&province=${state.province}&city=${state.city}`, true)
}
</script>

<style >
page {
  background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.content {
  padding-top: 88rpx ;
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
      text-align: center;
      height: 38rpx;
      line-height: 38rpx;
      margin: 16rpx 20rpx 0 0;
      font-weight: 600;
      font-size: 36rpx;

      .cityIcon {
        display: inline-block;
        width: 24rpx;
        height: 28rpx;
      }
    }
    .input {
      width: calc( 100% - 100rpx );
    }
    .myPlace {
      width: 100rpx;
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
  .range {
    display: flex;
    width: 100%;
    border-top: 1PX solid #F5F3EF;
    border-bottom: 1PX solid #F5F3EF;
    .date {
      width: calc( 100% - 120rpx );
      font-weight: 600;
      font-size: 36rpx;
      view {
        display: inline-block;
      }
      .week {
        font-weight: 500 !important;
        font-size: 28rpx !important;
      }
      .icon {
        height: 1px;
        margin: 0 15rpx;
        font-weight: 200 !important;
        color: #898784;
      }
    }
    .day {
      text-align: right;
      width: 125rpx;
      line-height: 54rpx;
    }
  }
  .count {
    font-weight: 500;
    font-size: 16px;
    color: #232322;
    .icon {
      display: inline-block;
      width: 24rpx;
      height: 28rpx;
    }
  }
  .tags {
    overflow: hidden;
    .tag {
      float: left;
      padding: 0 20rpx;
      line-height: 50rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #898784;
      border-radius: 5rpx;
      background: #f1f1f1;
    }
    .tagAct {
      background: #FFC75B29;
      color: #FA9847;
    }
  }
  .btn {
    width: 100%;
    font-weight: 600;
    font-size: 36rpx;
    line-height: 88rpx;
    text-align: center;
    color: #232322;
    background-color: #FFCF00;
    border-radius: 20rpx;
  }
  .hot {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 32rpx;
    color: #232322;
    .icon {
      display: inline-block;
      width: 44rpx;
      height: 46rpx;
    }
  }
}
</style>
