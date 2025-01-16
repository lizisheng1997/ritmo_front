<template>
  <view class="content p35">
    修改昵称/个人简介/邮箱
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
  
}
</style>
