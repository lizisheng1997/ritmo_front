<template>
  <view class="content p35">
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>成员名称
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入成员名称" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>手机号
        </view>
        <input class="uni-input ml25" v-model="state.phone" placeholder="请输入手机号" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>邮箱
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入邮箱" />
      </view>
    </view>
    <!-- v-if="state.id" -->
    <view class="footerTwo flex" >
      <view class="btn btn1">新增完成</view>
      <view class="btn btn2">完成并继续新增 </view>
    </view>
    <!-- <view class="footerOne" v-else>
      保存
    </view> -->
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '1' ? '编辑成员' : '新增成员'
  });
  state.id = query!.id
});
// 参数
const state = reactive({
  id: '',
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style lang="scss" scoped>
.content {
  .form {
    margin-top: 40rpx;
    // height: 32rpx;
    .item {
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 125rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;
        text {
          color: #FF3434;
        }
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
  .footerOne, .footerTwo {
    margin-top: 80rpx;
  }
}
</style>
