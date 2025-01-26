<template>
  <view class="content" :style="{
    paddingTop: state.navAllHeight + 'rpx'
  }">
    <view class="p0-35">
      <view class="nav flex">
        <image class="icon" src="/@/static/iconLeftBlack.png"></image>
        <image class="head mr25 mt10" src="/@/static/addHead.png"></image>
        <text class="name">Jane</text>
      </view>
      <!--  -->
      <view class="title flex">
        <u-input class="input " v-model="state.content" :border="false" :custom-style="{
          height: '88rpx',
          lineHeight: '88rpx',
        }" placeholder="请输入标题"  :maxlength="30"/>
        <view class="lent">{{ state.content.length }}/30</view>
      </view>
      <!--  -->
      <view class="news p35-0">
        <u-input v-model="state.content" type="textarea" :maxlength="1000" :auto-height="false" height="400"/>
      </view>
      <!--  -->
      <view class="">
        <u-upload :action="state.action" :file-list=" state.fileList" ></u-upload>
      </view>
      <!--  -->
      <view class="select flex">
        <view class="left">
          <image class="icon mr15" src="/@/static/community/local.png"></image>
          <text class="">请选择空间</text>
        </view>
        <image class="right mt20" src="/@/static/rightAsh.png"></image>
      </view>
      <!--  -->
      <view class="select flex">
        <view class="left">
          <image class="icon mr15" src="/@/static/community/tags.png"></image>
          <text class="">请选择标签</text>
        </view>
        <image class="right mt20" src="/@/static/rightAsh.png" @click="routerTo('/pages/community/selectTags')"></image>
      </view>
      <view class="footerOne" >
        确认发布
      </view>
    </view>
    <!-- 选择空间 -->
    <u-select v-model="state.show" :list="list" @confirm="confirm"></u-select>
    <!-- 选择标签 -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;
  getInfo()
});
// 参数
const list = [] as any
const state = reactive({
  type: 0, // 
  content: '',
  navAllHeight: 0,
  show: false,
  action: 'http://www.example.com/upload',
  fileList: [
  ]
})
const getInfo = () => {
}
const confirm = (e: any) => {
  console.log(e);
  
}
</script>

<style lang="scss" scoped>
.content {
  .nav {
    height: 88rpx;
    line-height: 88rpx;
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
  .title {
    border-bottom: 1PX solid #F5F3EF;
    .input {
      width: calc( 100% - 100rpx );
    }
    .lent {
      width: 80rpx;
      line-height: 88rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #898784;
    }
  }
  .select {
    justify-content: space-between;
    line-height: 88rpx;
    border-bottom: 1PX solid #F5F3EF;
    .left {
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
      }
    }
    .right {
      display: inline-block;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
    }
  }
  .footerOne {
    margin-top: 88rpx;
  }
}
</style>
