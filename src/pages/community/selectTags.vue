<template>
  <view class="content ">
    <view class="list">
      <view class="li flex pb25 mb25">
        <view class="name">啦啦啦啦</view>
        <image class="icon" src="/@/static/selectIcon.png"></image>
      </view>
      <view class="li flex pb25 mb25">
        <view class="name">啦啦啦啦</view>
        <image class="icon" src="/@/static/select.png"></image>
      </view>
      <view class="li flex pb25 mb25">
        <view class="name">啦啦啦啦</view>
        <image class="icon" src="/@/static/select.png"></image>
      </view>
    </view>
    <view class="footer p35">
      <view class="footerOne" >
        确认发布
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
  // console.log(query);
  state.type = query!.type
  getInfo()
});
// 参数
const state = reactive({
  type: 0, // 
  content: '',
})
const getInfo = () => {
}
</script>

<style lang="scss" scoped>
.content {
  padding: 35rpx 35rpx 180rpx 35rpx;
  .list {
    .li {
      justify-content: space-between;
      border-bottom: 1PX solid #F5F3EF;
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
      }
      .name {
        font-size: 28rpx;
        font-weight: 500;
        color: #232322;
      }
    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    box-shadow: 0px 0px 16px 0px #00000026;
    background-color: #FFFFFF;
  }
}
</style>
