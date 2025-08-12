<template>
  <view class="content p35">
    1263
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { routerTo } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: t('homestayOrder')
  });
  // state.type = query!.type
});
onShow(() => {
  
  clearSearch();
})
// 参数
const list = ref([] as any[]);
const state = reactive({
  page: 20,
  pageSize: 1,
  list: [] as any[],
});
const clearSearch = () => {
  state.pageSize = 1
  state.list = []
  getList()
}
//
const getList = async () => {
  await homestayApi.getOrderList({
    limit: state.page,
    page: state.pageSize
  }).then((res: any) => {
    console.log(res.data);
    list.value = res.data.orders;
  });
};
onReachBottom(() => {
  state.pageSize+=1;
  getList();
  console.log('到底了');
});
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped></style>
