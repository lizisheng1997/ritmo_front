<template>
  <view class="content" :style="{
    paddingTop: (state.navAllHeight + 88) + 'rpx'
  }">
    <view class="nav flex" :style=" { top: state.navAllHeight + 'rpx' } ">
      <image class="icon" src="/@/static/iconLeftBlack@2x.png"></image>
      <image class="head mr25 mt10" src="/@/static/addHead.png"></image>
      <text class="name">Jane</text>
    </view>
    <!--  -->
    <swiper class="swiper" circular indicator-dots autoplay >
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="imageW100" src="http://47.116.190.37:8002/static/loginBg.png"></image>
      </swiper-item>
      <u-icon class="delete" name="trash-fill" size="60"></u-icon>
    </swiper>
    <!--  -->
    <view class="p35">
      <view class="article pb35">
        <view class="title">今日活动</view>
        <view class="news mt20">
          今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容今日活动内容
        </view>
        <view class="date mt20">04-10 XXXX空间</view>
        <view class="date mt10">标签内容 ｜ 标签内超长换行</view>
        <view class="date mt10">超长换行标签 ｜ 标签内容</view>
      </view>
      <!--  -->
      <view class="comment">
        <view class="title mt25">评论</view>
        <view class="list">
          <view class="li m35-0">
            <view class="review flex">
              <image class="head mr15" src="/@/static/addHead.png"></image>
              <view class="info">
                <view class="name">Luxus</view>
                <view class="fub mt10">
                  楼下有咖啡店吗？
                  <text class="date" style="color: #898784;">2024-01-03 回复</text>
                </view>
                <view class="collect">
                  <image class="icon" src="/@/static/community/collect.png"></image>
                  <view class="count">80</view>
                </view>
              </view>
            </view>
            <view class="card p15 ml65 mt25">
              <view class="review flex mb35">
                <image class="head" src="/@/static/addHead.png"></image>
                <view class="info" style="width: calc( 100% - 88rpx );">
                  <view class="name" style="color: #898784;font-size: 24rpx;">Luxus</view>
                  <view class="fub mt10">
                    楼下有咖啡店吗？
                    <text class="date" style="color: #898784;">2024-01-03 回复</text>
                  </view>
                  <view class="collect">
                    <image class="icon" src="/@/static/community/collect.png"></image>
                    <view class="count">80</view>
                  </view>
                </view>
              </view>
              <view class="review flex">
                <image class="head" src="/@/static/addHead.png"></image>
                <view class="info" style="width: calc( 100% - 168rpx );">
                  <view class="name" style="color: #898784;font-size: 24rpx;">Luxus</view>
                  <view class="fub mt10">
                    楼下有咖啡店吗？
                    <text class="date" style="color: #898784;">2024-01-03 回复</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <!--  -->
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;
  getInfo()
});
// 参数
const state = reactive({
  type: 0, // 
  navAllHeight: 0,
  content: '',
})
const getInfo = () => {
  
}
</script>

<style lang="scss" scoped>
.content {
  .nav {
    position: fixed;
    left: 0;
    height: 88rpx;
    line-height: 88rpx;
    z-index: 999;
    background-color: #ffffff;
    width: 100%;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
      vertical-align: middle;
      margin: 20rpx 35rpx 0 0;
    }
    .head {
      display: inline-block;
      width: 64rpx;
      height: 64rpx;
      border-radius: 64rpx;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      font-size: 32rpx;
      font-weight: 600;
      color: #232322;
    }
  }
  .swiper{
    height: 740rpx;
    position: relative;
    .delete {
      position: absolute;
      right: 35rpx;
      top: 200rpx;
      z-index: 9999;
    }
    .uni-swiper-wrapper {
      .uni-swiper-slides {
        width: 100%;
        height: 100%;
      }
    }
  }
  .article {
    border-bottom: 1PX solid #F5F3EF;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      color: #232322;
    }
    .news {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .date {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #898784;
    }
  }
  .comment {
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      color: #232322;
    }
    .list {
      .li {
        .review {
          .head {
            display: inline-block;
            width: 64rpx;
            height: 64rpx;
            border-radius: 64rpx;
          }
          .info {
            width: calc( 100% - 88rpx );
            position: relative;
            .collect {
              text-align: center;
              position: absolute;
              right: 0;
              top: 0;
              .icon {
                display: inline-block;
                width: 40rpx;
                height: 40rpx;
              }
              .count {
                font-size: 20rpx;
                font-weight: 400;
                line-height: 1;
                color: #898784;
              }
            }
            .name {
              font-size: 32rpx;
              font-weight: 600;
              line-height: 40rpx;
              color: #232322;
            }
            .fub {
              font-size: 24rpx;
              font-weight: 400;
              line-height: 40rpx;
              color: #232322;
            }
          }
        }
        .card{
          border-radius: 10rpx;
          background-color: #F5F3EF;
          .review {
            &:last-child {
              margin-bottom: 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
