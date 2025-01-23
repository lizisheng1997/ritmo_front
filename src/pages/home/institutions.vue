<template>
  <view class="content p35">
    <view class="list">
      <view class="user mb25 flex p25">
        <view class="left flex">
          <image class="head mr30" src="http://47.116.190.37:8002/static/home/head.png"></image>
          <view class="center mr20">
            <view class="company flex">
              <text class="text oneEllipsis" style="max-width: 64%;">杭州大鱼网络科技有限公司</text>
              <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip1.png"></image>
            </view>
            <view class="name mt10">段誉</view>
          </view>
        </view>
        <view class="right">
          <image class="select" src="http://47.116.190.37:8002/static/selectIcon.png"></image>
        </view>
      </view>
      <!--  -->
      <view class="user mb25 flex p25">
        <view class="left flex">
          <view class="center mr20 centerW100">
            <view class="company flex">
              <text class="text oneEllipsis">杭州大鱼网络科技有限公司</text>
              <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip1.png"></image>
            </view>
            <view class="name mt10">段誉</view>
          </view>
        </view>
        <view class="right">
          <view class="status mb5">审核中</view>
          <view class="details">详情></view>
        </view>
      </view>
      <!--  -->
      <view class="user mb25 flex p25">
        <view class="left flex">
          <view class="center mr20 centerW100">
            <view class="company flex">
              <text class="text oneEllipsis">杭州大鱼网络科技有限公司</text>
              <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip1.png"></image>
            </view>
            <view class="name mt10">段誉</view>
          </view>
        </view>
        <view class="right">
          <view class="status statusRed mb5">已驳回</view>
          <view class="details">详情></view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="footerOne mt35" @click="routerTo(`/pages/home/addInstitutions`)">
      创建机构
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Home from '/@/api/home';
const hemoApi = new Home();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  
});
onShow(() => {
  getList()
})
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
// 获取列表
const getList = async() => {
  await hemoApi.getMyOrganizations({}).then((res: any) => {
    console.log(res);
    
  })
}
</script>

<style scoped>
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .list {
    .user {
      justify-content: space-between;
      height: 140rpx;
      background-color: #FFFFFF;
      box-shadow: 0px 4px 10px 0px #0000001A;
      border-radius: 20rpx;
      .left {
        width: calc( 100% - 126rpx );
        .head {
          display: inline-block;
          width: 80rpx;
          height: 80rpx;
          border-radius: 80rpx;
        }
        .center {
          width: calc( 100% - 160rpx );
          .not {
            line-height: 140rpx;
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
          }
          .company {
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
            .text {
              display: inline-block;
            }
            .icon {
              display: inline-block;
              width: 116rpx;
              height: 36rpx;
            }
          }
          .name {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 30rpx;
            color: #898784;
          }
        }
        .centerW100 {
          width: 100% !important;
        }
      }
      .right {
        // width: 100rpx;
        .select {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          margin-top: 20rpx;
        }
        .status {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 36rpx;
          color: #898784;
        }
        .statusRed {
          color: #FF3434 !important;
        }
        .details {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
  .textColorAsh {
    color: #898784 !important;
  }
}
</style>
