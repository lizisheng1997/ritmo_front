<template>
  <!-- 成员扩容 -->
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup p35">
      <view class="title">
        {{ t('Memberexpansion') }}
      </view>
      <view class="form mt45">
        <view class="item flex pb35 mt35">
          <view class="text">
            {{ t('Expandthenumber') }}
          </view>
          <u-number-box class=" ml25" :min="1"  v-model="state.limit"></u-number-box>
        </view>
        <view class="item flex pb35 mt35">
          <view class="text">
            {{ t('Expansionmonths') }}
          </view>
          <u-number-box class=" ml25" :min="1" v-model="state.day"></u-number-box>
        </view>
      </view>
      <view class="footerOne" @click="sumbit">
        {{ t('Goexpandthe') }}
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  day: 1, // 扩容天数
  limit: 0, // 扩容人数
  isShow: false, // 
})
// 打开弹窗
const openDialog = () => {
  // console.log(rows)
  state.limit = 1
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = () => {
  state.isShow = false
  emit('refresh', state.day, state.limit)

  
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
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
    }
  }
.footerOne {
  margin: 80rpx 0 40rpx 0;
}
</style>
