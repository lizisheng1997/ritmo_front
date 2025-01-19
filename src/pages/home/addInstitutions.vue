<template>
  <view class="content p35">
    <view class="title">机构信息</view>
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          机构名称
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入机构名称" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          统一信用代码
        </view>
        <input class="uni-input ml25" v-model="state.phone" placeholder="请输入统一信用代码" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          营业执照
        </view>
        <view class="yyzz ml30">
          <image class="icon imageW100" src="../../static/home/yyzz.png"></image>
          <image class="delete" src="../../static/home/delete.png"></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="title mt35">超管信息</view>
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          管理员
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入管理员" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          联系方式
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入联系方式" />
      </view>
    </view>
    <!--  -->
    <view class="btn" :class=" state.phone.length == 11 ? '' : 'btnNull' " @click="routerTo(`/pages/home/institutionsDetails`)">
      确认创建
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style lang="scss" scoped>
.content {
  .title {
    font-size: 36rpx;
    font-weight: 600;
    line-height: 48rpx;
    color: #232322;
  }
  .form {
    margin-top: 35rpx;
    // height: 32rpx;
    .item {
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 200rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;

      }
      .yyzz {
        width: 180rpx;
        height: 105rpx;
        position: relative;
        .delete {
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .uni-input {
        display: inline-block;
        width: calc( 100% - 260rpx );
        height: 36rpx;
        min-height: 36rpx;
        line-height: 36rpx;
      }
    }
  }
  .btn {
    margin-top: 70rpx;
    width: 100%;
    line-height: 88rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    background-color: #FFCF00;
  }
  .btnNull {
    opacity: 0.6;
  }
}
</style>
