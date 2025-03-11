<template>
  <view class="content" v-if=" state.id">
    <view class="introduce" :style="{ paddingTop: state.navAllHeight + 'rpx' }">
      <div class="p0-35">
        <view class="name mb10">
          {{ state.info.name }}
          <image class="icon" src="/@/static/rightBlack.png" @click="getSpaceList(0)"></image>
        </view>
        <!-- <view class="distance">
          距您200m
        </view> -->
        <swiper class="swiper mt15" circular indicator-dots autoplay >
          <swiper-item  v-for="(item, index) in state.info.images" :key="index">
            <image class="imageW100" :src="item"></image>
          </swiper-item>
        </swiper>
        <view class="distance m15-0">
          {{ state.info.address }}
          
          <image class="icon" src="/@/static/rightAsh.png" @click="routerToPar(`/pages/space/spaceDetails?id=${state.id}`)"></image>
        </view>
        <view class="distance">{{ state.info.businessHours }}</view>
        <view class="spaces mt15">
          <text class="text pr15 mr15">{{ state.info.workspaceCount }} {{ t('workstation') }}</text>
          <text class="text pr15 mr15">{{ state.info.meetingRoomCount }} {{ t('conference') }}</text>
          <text class="text pr15 mr15">{{ state.info.officeCount }} {{ t('office') }}</text>
          <text class="text pr15 mr15">{{ state.info.showcaseCount }} {{ t('cabinet') }} </text>
        </view>
        <view class="cards mt25">
          <template v-for=" (item, index) in state.info.services" :key="index">
            <view class="card mr15" v-if="index < 3">
              <image class="icon mr5" :src=" item.icon "></image>
              <text class="text">{{ item.name }}</text>
            </view>
          </template>
          <view class="card ">
            <text class="text">...</text>
          </view>
        </view>
      </div>
      <view class="tabs mt35">
        <view class="text" :class=" state.tabsIdx == item.key ? 'textAct' : '' " v-for="( item, index ) in tabsList" :key="index" @click="tabsChange(index) ">{{ item.name }}</view>
      </view>
    </view>
    <!--  -->
    <view class="p0-35" style="background-color: #ffffff;">
      <view class="filter flex pt35">
        <template v-if="state.tabsIdx <= 1">
          <view class="grade p0-25 mr15 " :class=" state.gradeIdx == 1 ? 'gradeAct' : '' " @click="() => {
            state.gradeIdx = 1
            getAllList()
          }">{{ t('primary1') }}</view>
          <view class="grade p0-25 mr15" :class=" state.gradeIdx == 2 ? 'gradeAct' : '' " @click="() => {
            state.gradeIdx = 2
            getAllList()
          }">{{ t('senior1') }}</view>
        </template>
        <!-- <view class="grade p0-25 mr15" style="color: #232322;" @click="routerTo('/pages/space/distributionMap')">
          查看分布图
          <image class="icon" src="https://ritmohub.cn/static/space/imgs.png"></image>
        </view>
        <view class="grade p0-25 mr15" style="color: #232322;">
          筛选
          <image class="down" src="/@/static/iconDownBlack.png"></image>
        </view> -->
      </view>
      <view class="filterDate flex mt30 " v-if="state.tabsIdx <= 1">
        <view class="li" v-for=" (item, index) in weekDayList " :key="index" :class=" item.day == state.day ? 'liAct' : '' " @click=" () => {
          state.day = item.day
          getAllList()
        } ">
          <view class="week mt20">{{ item.week }}</view>
          <view class="day">{{ item.day }}</view>
        </view>
      </view>
      <!-- 工位、会议室 -->
      <view class="station" v-if="state.tabsIdx == 0 || state.tabsIdx == 1">
        <view class="list" v-for="item in productList" :key="item.id">
          <view class="li mt20 p20-0">
            <view class="room flex">
              <view class="left flex" @click="routerToPar(`/pages/space/details?type=${state.tabsIdx}&sid=${state.id}&id=${item.id}`)">
                <view class="number mr20 oneEllipsis">{{ item.name }}</view>
                <view class="info">
                  <view class="text">
                    {{ item.description }}
                  </view>
                  <view class="text mt5" style="font-weight: bold;">
                    ¥{{ item.price }}/{{ t('Startingfromminutes') }}
                    <text class="icon ml20">{{ item.area_name }}</text>
                  </view>
                </view>
              </view>
              <view class="right" @click="routerToPar(`/pages/space/reserveRoom?type=${state.tabsIdx}&sid=${state.id}&id=${item.id}&data=${weekDayList.find((item) => item.day == state.day).date}`)">
                {{ t('reserve') }}
              </view>
            </view>
            <spaceTimes :seleceList="item.time_slots"/>
          </view>
          <!--  -->
        </view>
      </view>
      <!-- 办公室/展示柜/会议室 -->
      <view class="office pb25 mt25" v-else>
        <view class="list" v-for="item in productList" :key="item.id">
          <view class="li mt20 flex pt20" @click="routerToPar(`/pages/space/details?type=${state.tabsIdx}&sid=${state.id}&id=${item.id}`)">
            <!-- <view class="btn">预约</view> -->
            <view class="banner mr20">
              <image class="imageW100" :src="item.image_url"></image>
            </view>
            <view class="info">
              <view class="name">{{ item.name }}</view>
              <view class="text mt10" v-if=" item.status == 1 ">{{ state.tabsIdx == 3 ? item.size : `${item.capacity}人` }}  </view>
              <view class="text" v-if=" item.status == 1 ">{{ item.description }}</view>
              <view class="company mt15" v-if=" item.status == 0 ||  item.status == 2 ">
                <!-- <text class="oneEllipsis">大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司大鱼网络科技有限公司</text> -->
                <text class="status">{{ item.status == 2 ? '租用中' : '不可租' }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 展示柜 -->
      <!-- <view class="office pb25 mt25" v-else-if="state.tabsIdx == 3">
        <view class="list">
          <view class="li mt20 flex pt20" @click="routerToPar(`/pages/space/reserveOfficial?type=3`)">
            <view class="banner mr20">
              <image class="imageW100" src="https://ritmohub.cn/static/addHead.png"></image>
            </view>
            <view class="info" @click="routerToPar(`/pages/space/details?type=3`)">
              <view class="name">001展示柜</view>
              <view class="text mt10">¥300/按月起</view>
              <view class="gary mt10">
                <text class="status">不可租</text>
                租至2024年11月12日
              </view>
            </view>
            <view class="btn">预约</view>
          </view>
        </view>
      </view> -->
      <u-empty :text="t('Nodata')" mode="list" icon-size="200" src="https://ritmohub.cn/static/null.png"  v-if=" !productList?.length "></u-empty>
    </view>
    <!--  -->
    <selectSpace ref="selectSpaceRef" @refresh="(show, id) => {
      state.id = id
      getInfo(id)
    }"/>
  </view>
</template>

<script setup lang="ts">
import { onHide, onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import spaceTimes from '/@/components/spaceTimes.vue'
import selectSpace from '/@/components/selectSpace.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight;
  let arr = getLastSevenDays()
  arr[0].week = t('today')
  weekDayList.value = arr
  state.day = arr[0].day
  state.gradeIdx = 1
  // console.log(arr);
})
onShow(() => {
  const tabsIdx = uni.getStorageSync('spaceTabsIdx');
  state.tabsIdx = tabsIdx ? tabsIdx : 0
  // console.log(state.tabsIdx);
  getSpaceList(1)
  

})
onHide(() => {
  uni.setStorageSync('spaceTabsIdx', state.tabsIdx);
})
// 参数
const tabsList = ref([ { name: t('workstation'), key: 0 }, { name: t('conference'), key: 1 }, { name: t('office'), key: 2 }, { name: t('cabinet'), key: 3 }, { name: t('activity'), key: 4 }  ])
const weekDayList = ref([] as any[])
const spaceList = ref([] as any) // 空间列表
const productList = ref([] as any) // 
const state = reactive({
  id: '',
  info: {
    name: '',
    address: '',
    workspaceCount: 0,
    meetingRoomCount: 0,
    officeCount: 0,
    showcaseCount: 0,
    businessHours: '',
    services: [] as any[],
    images: [] as string[]
  },
  page: 1, // 页码
  pageSize: 99, // 页数

  status: 0, // 
  gradeIdx: 1, // 筛选
  navAllHeight: 0,
  tabsIdx: 0,
  day: '',
  sidxs: [ '00:00', '01:00', '03:00', '03:30', '04:00', '12:00', '15:30', '22:00', '22:30'],
})
const selectSpaceRef = ref()
// 获取最近七天日期以及星期
const getLastSevenDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = [ t('sun'), t('mon'), t('tues'), t('wed'), t('thur'), t('fri'), t('satur')];

  for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      let newDate = date.toISOString().split('T')[0];
      days.push({
          day: newDate.slice(-2), // 获取日期（YYYY-MM-DD）
          date: newDate,
          week: dayNames[date.getDay()] // 获取星期名称（通过数组索引）
      });
  }

  return days;
}
// 获取空间列表
const getSpaceList = (type: number) => {
  spaceApi.getSpaceList().then((res: any) => {
    // console.log(res.data);
    spaceList.value = res.data
    if( res.data?.length && type ) {
      state.id = res.data[0].id
      getInfo(state.id)
    }
    if( !type ) {
      selectSpaceRef.value.openDialog(state.id, res.data)
    }
  })
}
// 获取详情
const getInfo = (id: string) => {
  spaceApi.getSpaceInfo(id).then((res: any) => {
    // console.log(res.data);
    state.info.name = res.data.name
    state.info.address = res.data.address
    state.info.businessHours = res.data.business_hours
    state.info.workspaceCount = res.data.workspace_count
    state.info.meetingRoomCount = res.data.meeting_room_count
    state.info.officeCount = res.data.office_count
    state.info.showcaseCount = res.data.showcase_count
    state.info.services = res.data.services
    state.info.images = res.data.images
    getAllList()
  })
}
// 
const tabsChange = ( index: number ) => {
  state.day = weekDayList.value[0].day
  state.gradeIdx = 1
  state.tabsIdx = index
  state.page = 1
  state.pageSize = 20
  productList.value = []
  getAllList()
}
// 获取列表
const getAllList = () => {
  uni.showLoading({
    title: '加载中'
  });
  if( state.tabsIdx == 0 ) {
    spaceApi.getSpaceWorkspaces(state.id, {
      level: state.gradeIdx,
      area_name: '',
      date: weekDayList.value.find((item) => item.day == state.day).date,
      page: state.page,
      page_size: state.pageSize
    }).then((res: any) => {
      // console.log(res.data);
      productList.value = res.data
    }).finally(() => {
      setTimeout(() => {
        uni.hideLoading();
      }, 1500);
    })
  } else if( state.tabsIdx == 1 ) {
    spaceApi.getSpaceMeetingRooms({
      space_id: state.id,
      level: state.gradeIdx,
      area_name: '',
      date: weekDayList.value.find((item) => item.day == state.day).date,
      page: state.page,
      page_size: state.pageSize
    }).then((res: any) => {
      // console.log(res.data);
      productList.value = res.data.items
    }).finally(() => {
      uni.hideLoading();
    })
  } else if( state.tabsIdx == 2 ) {
    spaceApi.getSpaceOffices({
      space_id: state.id,
      status: '',
      page: state.page,
      page_size: state.pageSize
    }).then((res: any) => {
      console.log(res.data);
      productList.value = res.data.items
    }).finally(() => {
      uni.hideLoading();
    })
    
  } else if( state.tabsIdx == 3 ) {
    spaceApi.getSpaceShowcases({
      space_id: state.id,
      status: '',
      page: state.page,
      page_size: state.pageSize
    }).then((res: any) => {
      console.log(res.data);
      productList.value = res.data.items
    }).finally(() => {
      uni.hideLoading();
    })
    
  } else if( state.tabsIdx == 4 ) {
    spaceApi.getSpacEventRooms({
      space_id: state.id,
      status: '',
      page: state.page,
      page_size: state.pageSize
    }).then((res: any) => {
      console.log(res.data);
      productList.value = res.data.items
    }).finally(() => {
      uni.hideLoading();
    })
    
  }
}
// 
onReachBottom(() =>{
  console.log('到底了');
  
})
const routerToPar = (url: string) => {
  
  routerTo(url)
}
</script>

<style lang="scss" scoped>
.content {
  .introduce {
    background-color: #F5F3EF;
    .name {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 48rpx;
      color: #232322;
      .icon {
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        vertical-align: middle;
      }
    }
    .distance {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 24rpx;
      color: #898784;
      .icon {
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        vertical-align: middle;
      }
    }
    .spaces {
      .text {
        display: inline-block;
        font-family: MiSans;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 28rpx;
        border-right: 1PX solid #898784;
        color: #898784;
        &:last-child {
          border-right: none !important;
        }
      }
    }
    .cards {
      overflow: hidden;
      .card {
        float: left;
        padding: 0 15rpx;
        line-height: 48rpx;
        background-color: #FFFFFF;
        border-radius: 10rpx;
        .icon {
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
        }
        .text {
          display: inline-block;
          font-size: 24rpx;
          font-weight: 500;
          color: #232322;
        }
      }
    }
    .tabs {
      width: 100%;
      height: 80rpx;
      .text {
        display: inline-block;
        padding: 0 25rpx;
        text-align: center;
        line-height: 80rpx;
        color: #898784;
        font-size: 28rpx;
      }
      .textAct {
        font-size: 32rpx;
        background: #ffffff;
        border-radius: 20rpx 20rpx 0 0;
        font-weight: 600;
        color: #232322;
        opacity: 1;
      }
    }
    .swiper{
      height: 470rpx;
      .imageW100 {
        border-radius: 16rpx;
      }
      .uni-swiper-wrapper {
        .uni-swiper-slides {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .filter {
    .grade {
      font-size: 20rpx;
      font-weight: 400;
      line-height: 48rpx;
      color: #898784;
      border-radius: 10rpx;
      background-color: #F5F3EF;
      .icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
      }
      .down {
        display: inline-block;
        width: 20rpx;
        height: 20rpx;
        vertical-align: middle;
      }
    }
    .gradeAct {
      font-weight: 600;
      color: #232322;
      background-color: #FFCF00;
    }
  }
  .filterDate {
    .li {
      flex: 1;
      height: 100rpx;
      text-align: center;
      border-radius: 10rpx;
      color: #232322;
      .week {
        font-size: 20rpx;
        font-weight: 400;
        line-height: 24rpx;

      }
      .day {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 40rpx;

      }
    }
    .liAct {
      background-color: #F5F3EF;
    }
  }
  .station {
    .list {
      .li {
        border-top: 1PX solid #F5F3EF;
        .room {
          justify-content: space-between;
          .left {
            width: calc( 100% - 130rpx );
            .banner {
              width: 130rpx;
              height: 100rpx;
              border-radius: 6rpx;
            }
            .number {
              display: inline-block;
              width: 130rpx;
              height: 80rpx;
              line-height: 80rpx;
              font-size: 28rpx;
              font-weight: 600;
              color: #232322;
              background-color: #FFCF0033;
              border: 1PX solid #FFCF00;
              border-radius: 10rpx;
              text-align: center;

            }
            .info {
              width: calc( 100% - 160rpx );
              .name {
                font-size: 28rpx;
                font-weight: 600;
                line-height: 32rpx;
                color: #232322;
              }
              .text {
                font-size: 24rpx;
                font-weight: 400;
                line-height: 28rpx;
                color: #232322;
                word-break:break-all;
                .icon {
                  display: inline-block;
                  width: 46rpx;
                  height: 28rpx;
                  text-align: center;
                  border-radius: 4rpx;
                  background-color: #22D274;
                  font-size: 16rpx;
                  font-weight: 500;
                  color: #ffffff;
                  vertical-align: middle;
                }
                .icon1 {
                  background-color: #ED9E05;
                }
              }
            }
          }
          .right {
            width: 130rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            border-radius: 10rpx;
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
            background-color: #FFCF00;
          }
        }
      } 
    }
  }
  .office {
    .list {
      .li {
        border-top: 1PX solid #F5F3EF;
        position: relative;
        .btn {
          position: absolute;
          right: 0;
          top: 20rpx;
          width: 130rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 10rpx;
          font-size: 28rpx;
          font-weight: 600;
          color: #232322;
          background-color: #FFCF00;
        }
        .banner {
          width: 130rpx;
          height: 100rpx;
          border-radius: 6rpx;
        }
        .info {
          width: calc( 100% - 160rpx );
          .name {
            font-size: 28rpx;
            font-weight: 600;
            line-height: 32rpx;
            color: #232322;
          }
          .text {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 28rpx;
            color: #232322;
          }
          .gary {
            font-size: 20rpx;
            font-weight: 400;
            line-height: 28rpx;
            color: #898784;
            .status {
              display: inline-block;
              width: 80rpx;
              text-align: center;
              background-color: #D7D4CF;
              border-radius: 4rpx;
              font-size: 20rpx;
            }
          }
          .company {
            display: inline-block;
            height: 50rpx;
            line-height: 50rpx;
            background-color: #CCEFFF;
            border-radius: 10rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #232322;
            padding: 0 125rpx 0 25rpx;
            position: relative;
            .oneEllipsis {
              display: inline-block;
              max-width: 360rpx;
            }
            .status {
              display: inline-block;
              position: absolute;
              right: 0;
              top: 0;
              width: 100rpx;
              height: 50rpx;
              line-height: 50rpx;
              text-align: center;
              color: #ffffff;
              background-color: #00B0FF;
              border-radius: 0 10rpx 10rpx 0;
            }
          }
        }
      }
    }
  }
}
</style>
