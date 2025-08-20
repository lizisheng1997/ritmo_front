<template>
  <u-popup
    v-model="state.isShow"
    mode="bottom"
    border-radius="20"
    width="630"
    :mask-close-able="false">
    <view class="popup p35">
      <view class="title"> {{ t('Pleaseselect') }} {{ t('tags') }} </view>
      <view class="form">
        <view class="item mt25">
          <view class="tagName"> {{ t('tags') }} </view>
          <view class="tags mt15">
            <text
              class="tag mb15"
              :class="state.tag.includes(item.id) ? 'tagAct' : ''"
              v-for="item in state.tagList"
              :key="item.id"
              @click="tagClick(item.id)"
              >{{ props.type == 'zh' ? item.name : item.name_en }}</text
            >
          </view>
        </view>
        <view class="footerTwo flex">
          <view
            class="btn btn1"
            @click="
              () => {
                state.tag = [];
                sumbit();
              }
            "
            >{{ t('clear') }}</view
          >
          <view
            class="btn btn2"
            @click="sumbit()">
            {{ t('confirm') }}</view
          >
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

const props = defineProps({
  // 中英文
  type: {
    type: String,
    default: () => ''
  }
});
// 参数
const state = reactive({
  tag: [] as number[],
  tagList: [] as any[],
  isShow: false //
});
// 打开弹窗
const openDialog = (rows: { tag: string }) => {
  let arr =  rows.tag ? rows.tag.split(',') : []
  state.tag = arr.map((item: string) => {
    return Number(item)
  });
  console.log(state.tag)
  getCondition();
  state.isShow = true;
};
defineExpose({ openDialog });
// 根据城市获取关键词
const getCondition = async () => {
  await homestayApi.getCondition({}).then((res: any) => {
    // console.log(res.data.filterList[1].value);
    let str = res.data.filterList[1].value;
    state.tagList = str.filter((item: { id: number }) => item.id != 0);
  });
};
// tag标签多选
const tagClick = (id: number) => {
  let arrIdx = state.tag.findIndex((item: number) => item == id);
  console.log(id);
  
  if (arrIdx == -1) {
    state.tag.push(id);
  } else {
    state.tag.splice(id, 1);
  }
};
const emit = defineEmits(['refresh']);
const sumbit = () => {
  // 区间判断
  emit('refresh', state.tag?.length ? state.tag.toString() : '');
  state.isShow = false;
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
  text-align: center;
}
.form {
  .item {
    .tags {
      .tag {
        display: inline-block;
        line-height: 45rpx;
        padding: 0 25rpx;
        border: 1px solid transparent;
        background-color: #f1f1f1;
        margin-right: 15rpx;
        font-size: 24rpx;
        border-radius: 8rpx;
      }
      .tagAct {
        background-color: #fcf8ec !important;
        border-color: #ffcf00 !important;
      }
      .input {
        display: inline-block;
        width: 140rpx;
      }
    }
  }
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
