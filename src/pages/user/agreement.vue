<template>
  <view class="content p35">
    <rich-text :nodes="state.content"></rich-text>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '用户协议' : query!.type == '1' ? '用户协议' : '会员服务协议'
  });
  state.type = query!.type
  getInfo()
});
// 参数
const state = reactive({
  type: 0, // 
  content: '',
})
const getInfo = () => {
  if( state.type == 0 ) {
    userApi.getAgreementsTerms().then((res: any) => {
      // console.log(res);
      state.content = res.data.content
    })
  } else if( state.type == 1 ) {
    userApi.getAgreementsPrivacy().then((res: any) => {
      // console.log(res);
      state.content = res.data.content
    })
  } else if( state.type == 2 ) {
    userApi.getAgreementsRecharge().then((res: any) => {
      // console.log(res);
      state.content = res.data.content
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  
}
</style>
