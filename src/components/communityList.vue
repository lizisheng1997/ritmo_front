<template>
  <!-- 空间流式布局 -->
  <view class="flowList p0-20">
    <u-waterfall v-model="props.list" ref="uWaterfall1">
			<template v-slot:left="{leftList}">
				<view class="warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index" @click="routerTo('/pages/community/details')"></u-lazy-load>
					<view class="title mt15 twoEllipsis">
						{{item.title}}
					</view>
					<view class="user mt15 flex">
						<view class="left flex" @click="routerTo('/pages/community/homepage')">
              <image class="head mr20" src="http://47.116.190.37:8002/static/addHead.png"></image>
              <view class="info">
                <view class="name">安徒生</view>
                <view class="name space">{{ item.gongsi }}</view>
              </view>
            </view>
						<view class="right">
              <image class="icon" src="http://47.116.190.37:8002/static/community/collect.png"></image>
              <view class="count">80</view>
            </view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index" @click="routerTo('/pages/community/details')"></u-lazy-load>
					<view class="title mt15 twoEllipsis">
						{{item.title}}
					</view>
					<view class="user mt15 flex" @click="routerTo('/pages/community/homepage')">
						<view class="left flex">
              <image class="head mr20" src="http://47.116.190.37:8002/static/addHead.png"></image>
              <view class="info">
                <view class="name">安徒生</view>
              </view>
            </view>
						<view class="right">
              <image class="icon" src="http://47.116.190.37:8002/static/community/collect1.png"></image>
              <view class="count">80</view>
            </view>
					</view>
				</view>
			</template>
		</u-waterfall>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 参数
const props = defineProps({
  list: {
    type: Array,
    default:() => []
  }, 
})
// 收藏
const emits = defineEmits([])
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
    .user {
      justify-content: space-between;
      .left {
        width: calc( 100% - 80rpx );
        .head {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          border-radius: 48rpx;
        }
        .info {
          width: calc( 100% - 68rpx );
          .name {
            font-size: 20rpx;
            font-weight: 500;
            line-height: 24rpx;
            color: #898784;
            height: 26rpx;
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
          width: 40rpx;
          height: 40rpx;
        }
        .count {
          font-size: 20rpx;
          font-weight: 400;
          line-height: 26rpx;
          color: #898784;
        }
      }
    }
	}

}
	

</style>
