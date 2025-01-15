<template>
  <view class="content p35">
    <view class="title">完善资料</view>
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          昵称
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入昵称或姓名" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          邮箱
        </view>
        <input class="uni-input ml25" v-model="state.phone" placeholder="请输入邮箱" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          邀请码
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="非必填" />
      </view>
    </view>
    <!--  -->
    <view class="addHead mb25">
      添加人脸
    </view>
    <view class="fub mb35">
      用于门禁人脸识别开门 <br>
      若暂不设置，也可以后续到个人中心设置人脸
    </view>
    <view class="headImage">
      <image class="imageW100" :src=" state.image ? state.image : '../../static/addHead.png' "></image>
    </view>
    <!--  -->
    <view class="btn" :class=" state.phone.length == 11 ? '' : 'btnNull' ">
      完善并开始使用
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
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
    font-size: 48rpx;
    font-weight: 600;
    line-height: 62rpx;
    color: #232322;
  }
  .form {
    margin-top: 80rpx;
    // height: 32rpx;
    .item {
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 125rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;

      }
      .uni-input {
        display: inline-block;
        width: calc( 100% - 190rpx );
        height: 36rpx;
        min-height: 36rpx;
        line-height: 36rpx;
      }
    }
  }
  .addHead {
    margin-top: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44rpx;
    color: #232322;
  }
  .fub {
    font-size: 24rpx;
    font-weight: 500;
    line-height: 32rpx;
    color: #898784;
  }
  .headImage {
    width: 100%;
    height: 320rpx;
    border-radius: 20rpx;
    overflow: hidden;
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
