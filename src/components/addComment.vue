<template>
  <u-popup v-model="state.isShow" mode="bottom" border-radius="20" width="630" @close="reset">
    <view class="popup p35">
      <u-input v-model="state.content" type="textarea" border :placeholder="` ${ state.text ? state.text  : t('Pleaseentercomment')} `" />
      <view class="btn">
        <text class="" @click="sumbit">{{ t('Send') }}</text>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { showTips } from '../utils/currentFun';
import Community from '/@/api/community';
const communityApi = new Community();
const { t } = useI18n()

// 参数
const state = reactive({
  isShow: false, // 
  idx: -1,
  text: '', // 提示字
  postId: '', // 帖子id
  parentId: '', // 评论id
  content: ''
})
// 打开弹窗
const openDialog = (postId: string, idx: number, parentId?: string, text?: string) => {
  // console.log(rows)
  state.postId = postId
  state.idx = idx
  state.parentId = parentId ? parentId : ''
  state.text = text ? text : ''
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = () => {
  // 
  if( !state.content ) {
    showTips(t('Pleaseentercomment'))
    return
  }
  communityApi.getCommunityComment({
    post_id: state.postId,
    parent_id: state.parentId,
    content: state.content

  }).then((res: any) => {
    showTips(uni.getStorageSync('languageType') == 'zh' ? '已成功发送评论' : 'success')
    setTimeout(() => {
      emit('refresh',  state.idx)
      reset()
    }, 500);
  })
}
const reset = () => {
  state.text = ''
  state.postId = ''
  state.parentId = ''
  state.content = ''  
  state.isShow = false
}
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #409eff;
  text-align: right;
}
</style>
