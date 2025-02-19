<template>
  <u-popup v-model="state.isShow" mode="center" border-radius="20" width="630">
    <view class="popup ">
      <view class="title">
        {{ state.type == 0 ? t('userAgreement') : t('privacyPolicy') }}
      </view>
      <view class="text ">
        <rich-text :nodes="state.content"></rich-text>
      </view>
      <view class="footerPopup p35" v-if="props.isType == 0">
        <view class="btn left" @click="sumbit(false)">{{ t('disagree') }}</view>
        <view class="btn right" @click="sumbit(true)">{{ t('agreewith') }}</view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

const props = defineProps({
  
  isType: {
    type: Number,
    default: () => 0
  }
})
// 参数
const state = reactive({
  isShow: false, // 0用户协议
  type: 0, // 
  content: '',
})
// 打开弹窗
const openDialog = (type: number) => {
  // console.log(rows)
  state.type = type
  getInfo()
  state.isShow = true;
};
defineExpose({ openDialog });
// 参数
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
  }
}
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
  padding: 0 35rpx 0 35rpx;

  height: 600rpx;
  overflow-y: auto;
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
