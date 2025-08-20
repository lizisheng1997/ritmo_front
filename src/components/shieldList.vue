<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630" @close="() => {
    emit('refresh')
  }">
    <view class="popup pb35">
      <view class="title">
        {{ t('shieldList') }}
      </view>
      <view class="form mb35">
        <template v-for="item in state.list" :key="item.key">
          <view class="li flex mb25 pb25">
            <view class="left flex">
              <image class="icon mr25" :src="item.avatar ? item.avatar : '../static/community/headimg.png'"></image>
              <text class="text">{{ item.nickname }}</text>
              <!--  -->
            </view>
            <view class="select" @click="getDelBlockedProfiles(item.blocked_user_id)">解除屏蔽</view>
          </view>
        </template>
      </view>
    </view>
      <u-empty
        :text="t('Nodata')"
        mode="favor"
        v-if="!state.list?.length"
        margin-top="120"
        icon-size="200"></u-empty>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Community from '/@/api/community';
import { showTips } from '../utils/currentFun';
const communityApi = new Community();
const { t } = useI18n()

const state = reactive({
  isShow: false, // 
  list: [] as any[], //
  id: '', // 弹窗携带的id
})
// 打开弹窗
const openDialog = () => {
  // console.log(rows)
  getList()
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const getList = () => {
  communityApi.getBlockedProfilesList({}).then((res: any) => {
    // console.log(res.data);
    state.list = res.data
    
  })
}
// 
const getDelBlockedProfiles = async(id: string) => {
  await communityApi.getDelBlockedProfiles({
    blocked_user_id: id
  }).then((res: any) => {

    showTips(uni.getStorageSync('languageType') == 'zh' ? '操作成功' : 'success')
    state.isShow = false
    setTimeout(() => {
      emit('refresh')
    }, 500);
  })
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
.form {
  padding: 35rpx;
  .li {
    justify-content: space-between;
    border-bottom: 1PX solid #F5F3EF;
    &:last-child {
      border-bottom: none !important;
    }
    .left {
      .icon {
        display: inline-block;
        width: 60rpx;
        height: 60rpx;
      }
      .text {
        display: inline-block;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 60rpx;
        color: #232322;
      }
    }
    .select {
      display: inline-block;
      width: 108rpx;
      color: #ffcf00;
    }
  }
}
</style>
