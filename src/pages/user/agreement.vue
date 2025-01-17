<template>
  <view class="content p35">
    各种协议
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
    title: query!.type == '0' ? '用户协议' : '隐私协议'
  });
  // state.id = query!.id
});
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
</script>

<style lang="scss" scoped>
.content {
  
}
</style>
