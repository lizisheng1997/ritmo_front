<template>
  <view class="content">
    <view class="menuForm mt35 p0-35">
      <view class="li flex">
        <view class="left">
          评价
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/language`)">
        <view class="left" >
          语言
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <!-- <view class="li flex">
        <view class="left">
          清除缓存
        </view>
        <view class="right">
          <text class="text2">2Mb</text>
        </view>
      </view> -->
      <view class="li flex" @click="openBottomOperation(0)">
        <view class="left">
          退出登录
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="openBottomOperation(1)">
        <view class="left">
          删除账号
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=0`)">
        <view class="left">
          用户协议
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <view class="li flex" @click="routerTo(`/pages/user/agreement?type=1`)">
        <view class="left">
          隐私协议
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view>
      <!-- <view class="li flex">
        <view class="left">
          去更新
        </view>
        <view class="right">
          <image class="icon" src="http://47.116.190.37:8002/static/rightAsh.png"></image>
        </view>
      </view> -->
      
    </view>
    <bottomOperation ref="bottomOperationRef" />
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Login from '/@/api/login';
const loginApi = new Login();
const { t } = useI18n()

// 引入组件
const bottomOperation = defineAsyncComponent( 
  () => import('/@/components/bottomOperation.vue')
)
// 参数
const state = reactive({
  phone: '', // 手机号
  select: false, // 
  image: '',
})
const operatePopupRef = ref()
// 
const bottomOperationRef = ref()
const openBottomOperation = (type: number) => {
  bottomOperationRef.value.openDialog(type)
}
// 退出登录
const loginOut = async() => {

}
</script>

<style lang="scss" scoped>
.content {
  
}
</style>
