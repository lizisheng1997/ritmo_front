<template>
  <view class="content p35">
    <view class="form">
      <u-input class="input " v-model="state.value" :border="false" :custom-style="{
        height: '100rpx',
        lineHeight: '100rpx',
        padding: '0 35rpx'
      }" :placeholder="t('Enter')"  :maxlength=" state.type == 0 ? 5 : 30" v-if=" state.type != 1 "/>
      <!--  -->
      <view class="textareaDiv" v-else>
        <u-input class="textarea " v-model="state.value" type="textarea" :border="false" :auto-height="false" :maxlength="300" :custom-style="{
          height: '240rpx',
          lineHeight: '40rpx',
          padding: '35rpx 35rpx 80rpx'
        }" :placeholder="t('Enter')"/>
        <text class="num">{{ state.value.length }}/300</text>
      </view>
    </view>
    <view class="footerOne" @click="submit">
      {{ t('Save') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useUserStore } from '/@/store/modules/user';
import { useI18n } from 'vue-i18n'
import { routerBack } from '/@/utils/currentFun';
const user = useUserStore();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? t('Changenickname') : query!.type == '1' ? t('Modifypersonalprofile') : query!.type == '2' ? t('Modifythepermanentspace') : t('Changeemailaddress')
  });
  state.type = query!.type
  state.value = query!.value
});
// 参数
const state = reactive({
  type: 0,
  valueLeng: '',
  value: '',
})
// 
const submit = () => {
  if( !state.value ) {
    return
  }
  user.setFormInput({
    key: state.type,
    value: state.value
  })
  routerBack(1)
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background-color: #ffffff;
  .input {
    border-radius: 20rpx;
    background-color: #F5F3EF;
  }
  .textareaDiv {
    position: relative;
    .textarea {
      border-radius: 20rpx;
      background-color: #F5F3EF;
    }
    .num {
      display: inline-block;
      position: absolute;
      right: 35rpx;
      bottom: 25rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #898784;
    }
  }
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
