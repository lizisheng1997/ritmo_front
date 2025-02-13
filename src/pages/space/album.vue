<template>
  <view class="content ">
    <u-waterfall v-model="state.flowList">
      <template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
				</view>
			</template>
  </u-waterfall>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  state.id = query!.id
  getInfo()
});
// 参数
const state = reactive({
  id: '',
  type: 0, // 
  flowList: [],
})
const getInfo = () => {
  spaceApi.getSpaceInfo(state.id).then((res: any) => {
    // console.log(res.data);
    state.flowList = res.data.images.map((item: string) => {
      return {
        image: item
      }
    })
  })
}
</script><style>
/* page不能写带scope的style标签中，否则无效 */
page {
  background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
.content {
  padding: 35rpx 20rpx;
}
.demo-warter {
  border-radius: 16rpx;
  margin: 10rpx;
  background-color: #ffffff;
  position: relative;
}

.demo-image {
  width: 100%;
  border-radius: 4px;
}

</style>
