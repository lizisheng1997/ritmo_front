<template>
  <!-- 成员扩容 -->
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup p35">
      <view class="title">
        成员扩容
      </view>
      <view class="memberManaTabs mt45 p0-45">
        <u-tabs :list="state.list" :is-scroll="true" v-model="state.current" :show-bar="false" active-color="#333333" inactive-color="#9B9B9B" height="200rpx" :item-width="80" :active-item-style="{
          background: '#EFEBEB',
          fontSize: '48rpx',
        }"></u-tabs>
      </view>
      <view class="footerOne" @click="routerTo(`/pages/user/memberOrder`)">
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
  current: 0, 
  list: [ { name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 }],
  isShow: false, // 
})
// 打开弹窗
const openDialog = (current: number) => {
  // console.log(rows)
  state.current = current
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
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
}
.text {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
}
.textAsh {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 44rpx;
  color: #898784;
}
.footerOne {
  margin: 80rpx 0 40rpx 0;
}
</style>
