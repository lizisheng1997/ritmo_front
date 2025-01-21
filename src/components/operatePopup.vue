<template>
  <u-popup v-model="state.isShow" mode="center" border-radius="20" width="630">
    <view class="popup pb35">
      <view class="title">
        提示
      </view>
      <view class="text mb35">
        是否{{ props.isType == 0 ? '切换语言，切换完毕后下次进入生效。' : '' }}
      </view>
      <view class="footerPopup p0-35" v-if="props.isType == 0">
        <view class="btn left" @click="sumbit(false)">取消</view>
        <view class="btn right" @click="sumbit(true)">确定</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  // 0切换语言
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
