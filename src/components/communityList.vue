<template>
  <!-- 空间流式布局 -->
  <view class="flowList p0-20" v-if="props.list?.length">
    <u-waterfall v-model="props.list" ref="uWaterfall1">
			<template v-slot:left="{leftList}">
				<view class="warter" v-for="(item, index) in leftList" :key="index">
          <u-lazy-load threshold="-450" border-radius="10" :image="item.imagesArr[0]" :index="index" @click="routerTo(`/pages/community/details?id=${item.id}`, true)" v-if="item.imagesArr?.length"></u-lazy-load>
					<view class="title mt15 twoEllipsis">
						{{item.title}}
					</view>
					<view class="userCard mt15 flex">
						<view class="left flex" @click="homePage(item.id, item.user_id )">
              <image class="head mr20" :src=" item.avatar ? item.avatar : '../static/community/headimg.png' "></image>
              <image class="level" src="/@/static/home/vip1.png" v-if=" item.vip_level == 1 "></image>
              <image class="level" src="/@/static/home/vip2.png" v-else-if=" item.vip_level == 2 "></image>
              <image class="level" src="/@/static/home/vip3.png" v-else-if=" item.vip_level == 3 "></image>
              <!--  -->
              <view class="info">
                <view class="name" style="line-height: 48rpx;">{{ item.nickname }}</view>
                <!-- <view class="name space">{{ item.gongsi }}</view> -->
              </view>
            </view>
						<view class="right">
              <image class="icon" src="/@/static/community/collect.png" v-if=" item.is_like == 0 "></image>
              <image class="icon" src="/@/static/community/collect1.png" v-else></image>
              <view class="count">{{ item.view_count }}</view>
            </view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="warter" v-for="(item, index) in rightList" :key="index">
          <u-lazy-load threshold="-450" border-radius="10" :image="item.imagesArr[0]" :index="index" @click="routerTo(`/pages/community/details?id=${item.id}`, true)" v-if="item.imagesArr?.length"></u-lazy-load>
					<view class="title mt15 twoEllipsis">
						{{item.title}}
					</view>
					<view class="userCard mt15 flex" @click="homePage(item.id, item.user_id )">
						<view class="left flex">
              <image class="head mr20" :src=" item.avatar ? item.avatar : '../static/community/headimg.png' "></image>
              <image class="level" src="/@/static/home/vip1.png" v-if=" item.vip_level == 1 "></image>
              <image class="level" src="/@/static/home/vip2.png" v-else-if=" item.vip_level == 2 "></image>
              <image class="level" src="/@/static/home/vip3.png" v-else-if=" item.vip_level == 3 "></image>
              <view class="info">
                <view class="name" style="line-height: 48rpx;">{{ item.nickname }}</view>
              </view>
            </view>
						<view class="right">
              <image class="icon" src="/@/static/community/collect.png" v-if=" item.is_like == 0 "></image>
              <image class="icon" src="/@/static/community/collect1.png" v-else></image>
              <view class="count">{{ item.view_count }}</view>
            </view>
					</view>
				</view>
			</template>
		</u-waterfall>
  </view>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const props = defineProps({
  list: {
    type: Array,
    default:() => []
  }, 
  // 是否能跳转
  isRouter: {
    type: Number,
    default:() => 1
  }
})
const newList = ref([] as any[])
// 收藏
const emits = defineEmits([])
const homePage = (id: string, userId: string) => {
  if( props.isRouter == 1 ) {
    let type = uni.getStorageSync('userInfos').id == userId ? 1 : 0;
    routerTo(`/pages/community/homepage?id=${id}&isUser=${type}`, true)
  }
}
</script>

<style lang="scss" scoped>
.flowList {
  .warter {
		border-radius: 8px;
		margin: 15rpx;
		background-color: #ffffff;
		position: relative;
    .title {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 32rpx;
      color: #232322;
    }
    .userCard {
      justify-content: space-between;
      .left {
        width: calc( 100% - 80rpx );
        position: relative;
        .head {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          border-radius: 48rpx;
        }
        .level {
          display: inline-block;
          width: 20rpx;
          height: 20rpx;
          position: absolute;
          left: 30rpx;
          top: 20rpx;
        }
        .info {
          width: calc( 100% - 68rpx );
          .name {
            font-size: 20rpx;
            font-weight: 500;
            color: #898784;
            // height: 26rpx;
          }
          .space {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .right {
        text-align: center;
        .icon {
          display: inline-block;
          width: 30rpx;
          height: 30rpx;
        }
        .count {
          font-size: 20rpx;
          font-weight: 400;
          line-height: 1;
          color: #898784;
        }
      }
    }
	}

}
	

</style>
