<template>
  <view class="content p35">
    <view class="member flex">
      <view class="left">
        机构成员： 
        <text class="">5/6</text>
      </view>
      <view class="btn" @click="openMemberExpansion">
        <image class="icon" src="/@/static/user/addMember.png"></image>
        成员扩容
      </view>
    </view>
    <!--  -->
    <view class="list">
      <view class="li flex mt35 p35">
        <view class="left flex">
          <image class="head mr25" src="/@/static/home/head.png"></image>
          <view class="info">
            <view class="name mb10">段誉</view>
            <view class="phone">13299997777</view>
          </view>
        </view>
        <view class="right mt15">
          <view class="card">超管</view>
          <image class="icon" src="/@/static/user/delete.png"></image>
        </view>
      </view>
      <view class="li flex mt35 p35">
        <view class="left flex">
          <image class="head mr25" src="/@/static/home/head.png"></image>
          <view class="info">
            <view class="name mb10">段誉</view>
            <view class="phone">13299997777</view>
          </view>
        </view>
        <view class="right mt15">
          <image class="icon" src="/@/static/user/editMember.png"></image>
        </view>
      </view>
      <!--  -->
    </view>
    <!--  -->
    <view class="footerOne" @click="routerTo(`/pages/user/editMember?type=0`)">
      新增成员
    </view>
    <memberExpansion ref="memberExpansionRef" />
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 引入组件
const memberExpansion = defineAsyncComponent( 
  () => import('/@/components/memberExpansion.vue')
)
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
// 
const memberExpansionRef = ref()
const openMemberExpansion = () => {
  memberExpansionRef.value.openDialog(4)
}
</script>

<style scoped>
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .member {
    justify-content: space-between;
    .left {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 60rpx;
      text {
        display: inline-block;
        font-weight: 600;
        color: #232322;
      }
    }
    .btn {
      width: 180rpx;
      height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 60rpx;
      color: #232322;
      border-radius: 6rpx;
      background-color: #FFFFFF;
      .icon {
        display: inline-block;
        width: 36rpx;
        height: 36rpx;
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
  }
  .list {
    .li {
      justify-content: space-between;
      border-radius: 20rpx;
      background-color: #fff;
      .left {
        .head {
          display: inline-block;
          width: 90rpx;
          height: 90rpx;
          border-radius: 90rpx;
        }
        .info {
          .name {
            font-size: 32rpx;
            font-weight: 600;
            line-height: 44rpx;
            color: #232322;
          }
          .phone {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 30rpx;
            color: #757575;
          }
        }
      }
      .right {
        .card {
          display: inline-block;
          width: 66rpx;
          line-height: 36rpx;
          text-align: center;
          font-family: Helvetica;
          font-size: 20rpx;
          font-weight: 400;
          color: #F5F3EF;
          border-radius: 4rpx;
          background-color: #22D274;
        }
        .icon {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          vertical-align: middle;
        }
      }
    }
  }
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
