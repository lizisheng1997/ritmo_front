<template>
  <view
    class="content"
    :style="{
      paddingTop: state.navAllHeight + 'rpx'
    }">
    <view class="nav flex p0-35">
      <view
        class="btn"
         @click="homePage(0)">
        <image
          class="icon mr15"
          src="/@/static/community/nav1.png"></image>
        <text class="text">{{ t('MyHomePages') }}</text>
      </view>
      <view class="btn" @click="homePage(3)">
        <image
          class="icon mr15"
          src="/@/static/community/nav2.png"></image>
        <text class="text">{{ t('Replytome') }}</text>
        <view class="count">{{ state.count }}</view>
      </view>
    </view>
    <!--  -->
    <view class="p0-35">
      <scroll-view
        class="tabs mt35"
        scroll-x="true"
        scroll-left="0"
        enable-flex="true"
        style="height: 70rpx">
        <view
          class="text pb25"
          :class="index == state.current ? 'textAct' : ''"
          v-for="(item, index) in tabsList"
          :key="index"
          @click="() => {
            state.current = index
            reset()
          }"
          >{{ item.name }}</view
        >
      </scroll-view>
    </view>
    <!--  -->
    <communityList :list="list"> </communityList>
    <!--  -->
    <view
      class="add"
      @click="routerTo('/pages/community/addCommunity')">
      <image
        class="icon"
        src="/@/static/iconAdd.png">
      </image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import communityList from '/@/components/communityList.vue';
import { routerTo, showTips } from '/@/utils/currentFun';
import { communityIndexTabs } from '/@/utils/universalArray';
import { useI18n } from 'vue-i18n';
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import Community from '/@/api/community';
const communityApi = new Community();
const { t } = useI18n();

// 引入组件
onLoad(() => {
  // #ifdef MP-WEIXIN
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 90;
  // #endif
  // #ifdef APP-PLUS
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight;
  // #endif
});
onShow(() => {
  reset()
})
// 参数
const list = ref([] as any);
const tabsList = ref([] as any);
const state = reactive({
  count: 0,
  status: 0, //
  current: 0,
  navAllHeight: 0,
  page: 20,
  pageSize: 1
});
const reset = () => {
  list.value = []
  state.pageSize = 1
  getCommunityCategory()
}
// 获取分类
const getCommunityCategory = () => {
  communityApi
    .getCommunityCategory({})
    .then((res: any) => {
      // console.log(res.data);
      tabsList.value = res.data ? res.data : []
      tabsList.value.unshift({
        id: 0,
        name: '全部'
      });
      if( res.data?.length ) {
        getList();
      }
    })
    .finally(() => {
    });
}
// 获取列表
const getList = () => {
  uni.showLoading({
    title: '加载中'
  });
  communityApi
    .getCommunityList({
      category_id: state.current == 0 ? '' : tabsList.value[state.current].id,
      limit: state.page,
      page: state.pageSize
    })
    .then((res: any) => {
      // console.log(res.data);
      state.count = res.data.not_read_count
      list.value = list.value.concat(res.data.posts ? res.data.posts : []);
      
    })
    .finally(() => {
      setTimeout(() => {
        uni.hideLoading();
      }, 1500);
    });
};
// 个人中心
const homePage = (tabsIdx: number) => {
  let myUserId = uni.getStorageSync('userInfos').id
  routerTo(`/pages/community/homepage?id=${myUserId}&isUser=1&tabsIdx=${tabsIdx}`, true)
}
onReachBottom(() => {
  state.pageSize+=1;
  getList();
  console.log('到底了');
});
</script>

<style lang="scss" scoped>
.content {
  .nav {
    justify-content: space-between;
  }
  .btn {
    width: 320rpx;
    height: 120rpx;
    line-height: 120rpx;
    border-radius: 20rpx;
    background-color: #f5f3ef;
    position: relative;
    text-align: center;
    .icon {
      display: inline-block;
      width: 50rpx;
      height: 50rpx;
      vertical-align: middle;
    }
    .text {
      font-size: 28rpx;
      font-weight: 600;
      color: #232322;
    }
    .count {
      position: absolute;
      right: 45rpx;
      top: 25rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      font-size: 20rpx;
      font-weight: 500;
      color: #ffffff;
      border-radius: 32rpx;
      background-color: #ff3434;
    }
  }
  .tabs {
    width: 100%;
    white-space: nowrap;
    .text {
      display: inline-block;
      // width: 120rpx;
      font-size: 32rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #898784;
      position: relative;
      margin-right: 60rpx;
    }
    .textAct {
      color: #232322;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40rpx;
        height: 8rpx;
        background-color: #ffcf00;
      }
    }
  }
}
.add {
  position: fixed;
  right: 35rpx;
  bottom: 140rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #ffcf00;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
