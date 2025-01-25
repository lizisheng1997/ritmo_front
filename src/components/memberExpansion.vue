<template>
  <!-- 成员扩容 -->
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup p35">
      <view class="title">
        成员扩容
      </view>
      <view class="form mt45">
        <view class="item flex pb35 mt35">
          <view class="text">
            扩容人数
          </view>
          <u-number-box class=" ml25" :min="state.oldDay" v-model="state.limit"></u-number-box>
        </view>
        <view class="item flex pb35 mt35">
          <view class="text">
            扩容天数
          </view>
          <u-number-box class=" ml25" :min="state.oldLlimit" v-model="state.day"></u-number-box>
        </view>
      </view>
      <view class="footerOne" @click="sumbit">
        去扩容
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
  day: 0, // 扩容天数
  limit: 0, // 扩容人数
  oldDay: 0, // 扩容前的天数
  oldLlimit: 0, // 扩容前的人数
  isShow: false, // 
})
// 打开弹窗
const openDialog = (day: number, limit: number) => {
  // console.log(rows)
  state.day = day
  state.limit = limit
  state.oldDay = day
  state.oldLlimit = limit
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
