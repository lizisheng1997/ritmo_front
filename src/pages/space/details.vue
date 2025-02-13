<template>
  <view class="content">
    <view class="back" @click="routerBack(1)">
      <image class="icon" src="/@/static/iconLeftBlack.png"></image>
    </view>
    <view class="banner" >
      <image class="imageW100" :src="state.banner"></image>
    </view>
    <!--  -->
    <view class="name">{{ state.name }}</view>
    <view class="center p0-35">
      <view class="grade mt15" v-if="state.type <= 1">{{ spaceLevelEnums[state.level] }}</view>
      <view class="fub mt25">
        {{ state.description }}
      </view>
      <view class="brief mt25">
        <text class="label">所属区域：</text>
        {{ state.area }}会员区域
      </view>
      <view class="brief mt25" v-if="state.type == 1 || state.type == 2">
        <text class="label">容纳人数：</text>
        {{ state.capacity }}人
      </view>

      <view class="brief mt25" v-if="state.type != 2">
        <text class="label">租赁价格：</text>
        ¥{{ state.price }}元/30分钟起租
      </view>
      <view class="line m35-0"></view>
      <!--  -->
      <view class="cards">
        <view class="card m10" v-for="(item, index) in state.services" :key="index">
          <image class="icon mt15" :src="item.icon"></image>
          <view class="text">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { spaceLevelEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type
  state.id = query!.id
  state.sid = query!.sid
  getInfo()
});
// 参数
const state = reactive({
  type: 0, // 0工位1会议室2办公室3展示柜
  id: '',
  sid: '',
  banner: '',
  services: [] as any[],
  name: '',
  area: '',
  description: '',
  price: 0,
  level: 1,
  capacity: 1,
})
const getInfo = () => {
  if( state.type == 0 ) {
    spaceApi.getSpaceMeetingWorkspacesDetails(state.sid, state.id).then((res: any) => {
      // console.log(res.data.image_url);
      details(res.data)
    })
  } else if( state.type == 1 ) {
    spaceApi.getSpaceMeetingRoomsDetails( state.id, {
      space_id: state.sid
    }).then((res: any) => {
      // console.log(res.data);
      details(res.data)
      state.capacity = res.data.capacity
    })
  }
}
const details = (obj: any) => {
  state.banner = obj.image_url
  state.services = obj.services
  state.name = obj.name
  state.description = obj.description
  state.area = obj.area_name
  state.price = obj.price
  state.level = obj.level
}
</script>

<style >
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  position: relative;
  .back {
    position: absolute;
    left: 35rpx;
    top: 88rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: #FFFFFFB2;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5rpx;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .banner{
    height: 480rpx;
  }
  .name {
    margin-top: -88rpx;
    padding: 0 35rpx 0 ;
    font-size: 36rpx;
    font-weight: 600;
    line-height: 88rpx;
    color: #232322;
    background-color: #F1F1EF;
    border-radius: 25rpx 25rpx 0 0;
    z-index: 9999;
    position: relative;
    opacity: 0.8;
  }
  .center {
    
    .grade {
      display: inline-block;
      width: 46rpx;
      height: 28rpx;
      line-height: 28rpx;
      text-align: center;
      border-radius: 4rpx;
      background-color: #22D274;
      font-size: 16rpx;
      font-weight: 500;
      color: #ffffff;
      vertical-align: middle;
    }
    .grade1 {
      background-color: #ED9E05;
    }
    .fub {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .brief {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
      .label {
        color: #898784;
      }
    }
    .line {
      width: 100%;
      height: 1PX;
      background-color: #D7D4CF;
    }
    .cards {
      overflow: hidden;
      .card {
        float: left;
        width: 110rpx;
        height: 110rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        text-align: center;
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
        }
        .text {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 28rpx;
          color: #232322;
        }
      }
    }
  }
}
</style>
