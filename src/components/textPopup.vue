<template>
  <u-popup v-model="state.isShow" mode="center" border-radius="20" width="630">
    <view class="popup pb35">
      <view class="title">
        {{ props.isType == 0 ? t('userAgreement') : '' }}
      </view>
      <view class="text ">
        文案内容：
        1:文案内容文案内容文案内容文案内容文案内容文案内容文案内容文案内容文案内容
        2:文案内容文案内容文案内容文案
        3:文案内容文案内容文案内容文案内容文案
        文案内容：
        1:文案内容文案内容文案内容文案
        2:文案内容文案内容文案内容文案内容文案
        3:文案内容文案内容文案内容文案
        文案内容：
        1:文案内容文案内容文案内容文案
        2:文案内容文案内容文案内容文案内容文案
        3:文案内容文案内容文案内容文案
        文案内容：
        1:文案内容文案内容文案内容文案
        2:文案内容文案内容文案内容文案内容文案
        3:文案内容文案内容文案内容文案
      </view>
      <view class="footerPopup p0-35" v-if="props.isType == 0">
        <view class="btn left" @click="sumbit(false)">不同意并退出</view>
        <view class="btn right" @click="sumbit(true)">同意</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  // 0用户协议
  isType: {
    type: Number,
    default: () => 0
  }
})
// 参数
const state = reactive({
  isShow: false, // 
})
// 打开弹窗
const openDialog = () => {
  // console.log(rows)
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = (show: boolean) => {
  state.isShow = false
  emit('refresh', show)
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 32rpx;
  line-height: 96rpx;
  text-align: center;
  color: #232322;
}
.text {
  padding: 0 35rpx 15rpx 35rpx;
}
.footerPopup {
  display: flex;
  justify-content: space-between;
  .btn {
    width: 260rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: 600;
    font-size: 28rpx;
    color: #232322;
    border-radius: 10rpx;
  }
  .left {
    background-color: #F5F3EF;
  }
  .right {
    background-color: #FFCF00;
  }
}
</style>
