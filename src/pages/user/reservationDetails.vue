<template>
  <view class="content p35" v-if="state.info">
    <!-- <view class="step flex mt35">
      <text class="text textAct"></text>
      <image class="icon m0-28" src="http://47.116.190.37:8002/static/user/step.png"></image>
      <text class="text">进行中</text>
      <image class="icon m0-28" src="http://47.116.190.37:8002/static/user/step.png"></image>
      <text class="text">已完成</text>
    </view> -->
    <!--  -->
    <view class="card p35">
      <view class="order flex mb15">
        <view class="id">No：{{ state.info.id }}</view>
        <view class="text">
          {{ reservationsEnums[state.info.status] }}
        </view>
      </view>
      <view class="count flex p0-55">
        <text class="num">{{ state.info.start_time }}</text>
        <image class="icon mt25" src="http://47.116.190.37:8002/static/user/memberOrderCradD.png"></image>
        <text class="num">{{ state.info.end_time }}</text>
      </view>
      <view class="fub">{{ state.info.booking_date }}</view>
      <view class="title mt35">杭州· 华润万象空间</view>
      <view class="rows flex mt35">
        <view class="item">
          <view class="label mb15">所属区域</view>
          <view class="text">{{ spaceLevelEnums[state.spaceInfo.level] }}会员区</view>
        </view>
        <view class="item">
          <view class="label mb15">工位号</view>
          <view class="text">{{ state.spaceInfo.name }}</view>
        </view>
        <view class="item">
          <view class="label mb15">会议室类型</view>
          <view class="text">{{ spaceLevelEnums[state.spaceInfo.level] }}</view>
        </view>
      </view>
      <view class="info">
        <view class="li flex mt25">
          <text class="label">预约人：</text>
          <text class="text">{{ state.nickname }}</text>
        </view>
        <view class="li flex mt25">
          <text class="label">成员id：</text>
          <text class="text">{{ state.userId }}</text>
        </view>
      </view>
    </view>
    <!--  -->
    <!-- <view class="contacts p35 mt35 flex">
      <view class="item flex">
        <image class="icon mr15" src="http://47.116.190.37:8002/static/user/contacts1.png"></image>
        <text class="text">去导航</text>
      </view>
      <view class="item flex">
        <image class="icon mr15" src="http://47.116.190.37:8002/static/user/contacts2.png"></image>
        <text class="text">联系商家</text>
      </view>
      <view class="item flex">
        <image class="icon mr15" src="http://47.116.190.37:8002/static/user/contacts3.png"></image>
        <text class="text">空间分布图</text>
      </view>
    </view> -->
    <!--  -->
    <view class="careful mt35 p25">
      <view class="title mb10">注意事项：</view>
      1.预约最晚可以在开始前6个小时进行取消，晚于这个时间无法取消<br>
      2.取消成功后，相应的时长将直接退回权益中，请到我的页面-权益时长中查收
    </view>
    <!--  -->
    <!-- <view class="footer">
      <text class="">取消预约</text>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { dateToLocaleDateString } from '/@/utils/currentFun';
import { reservationsEnums, spaceLevelEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type == 'workspace' ? 0 : 1
  state.id = query!.id 
  state.userId = uni.getStorageSync('userInfos').id 
  state.nickname = uni.getStorageSync('userInfos').nickname
  getInfo()
});
// 参数
const state = reactive({
  id: '', // 手机号
  type: 0,
  info: {} as any, // 
  spaceInfo: {} as any, // 
  userId: '',
  nickname: '',
})
const getInfo = () => {
  if( state.type == 0 ) {
    spaceApi.getSpaceMeetingWorkspacesBook(state.id, {
      space_id: state.id
    }).then((res: any) => {
      console.log(res.data);
      state.info = res.data
      state.spaceInfo = res.data.workspace
    })
  } else if( state.type == 1 ) {
    spaceApi.getSpaceMeetingRoomsBook(state.id, {
      booking_id: state.id
    }).then((res: any) => {
      console.log(res.data);
      state.info = res.data
      state.spaceInfo = res.data.meeting_room
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
  .step {
    justify-content: center;
    line-height: 36rpx;
    .text {
      display: inline-block;
      font-size: 28rpx;
      font-weight: 500;
      color: #898784;
    }
    .textAct {
      color: #000000;
      font-size: 32rpx;
      font-weight: 600;
    }
    .icon {
      display: inline-block;
      width: 140rpx;
      height: 6rpx;
      margin-top: 15rpx;
    }
  }
  .card {
    height: 668rpx;
    background-image: url('http://47.116.190.37:8002/static/user/memberOrderCardBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // box-shadow: 0px 2px 10px 0px #0000001A;
    .order {
      justify-content: space-between;
      .id {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 36rpx;
        color: #898784;
      }
      .text {
        font-size: 24rpx;
        font-weight: 600;
        line-height: 36rpx;
        color: #232322;
      }
    }
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
      margin-top: 50rpx;
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
  .contacts {
    border-radius: 20rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px 0px #0000001A;
    .item {
      width: 33%;
      justify-content: center;
      border-right: 1PX solid #D7D4CF;
      &:last-child {
        border-right: none !important;
      }
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        margin-top: -5rpx;
      }
      .text {
        display: inline-block;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 30rpx;
        color: #000000;
      }
    }
  }
  .careful {
    border-radius: 20rpx;
    background-color: #F7ECBF;
    font-size: 24rpx;
    line-height: 30rpx;
    .title {
      font-weight: 500;
      color: #000000;
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 45rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 600;
    line-height: 44rpx;
    color: #232322;
  }
}
</style>
