<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630">
    <view class="popup p35">
      <view class="title">
        {{ state.isType == 0 ? '退出账号' : '确认删除账户' }}
      </view>
      <view class="text mt35" v-if="state.isType == 0">
        文案内容：
      </view>
      <view class="textAsh mt35" v-else>
        确认删除后，相关信息将无法还原
      </view>
      <view class="footerTwo flex" >
        <view class="btn btn1" @click="sumbit(0)">再想想</view>
        <view class="btn btn2" @click="sumbit(1)"> {{ state.isType == 0 ? '确认退出' : '确认删除' }}</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const state = reactive({
  isType: 0, // 0退出账号 1删除账户
  isShow: false, // 
})
// 打开弹窗
const openDialog = (isType: number) => {
  // console.log(rows)
  state.isType = isType
  state.isShow = true;
};
defineExpose({ openDialog });
const sumbit = (type: number) => {
  state.isShow = false
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
.footerTwo {
  margin: 80rpx 0 40rpx 0;
}
</style>
