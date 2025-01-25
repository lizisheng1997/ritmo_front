<template>
  <view class="content membersIntroduction">
    <view class="top">
      <image class="back" src="http://47.116.190.37:8002/static/iconLeftBlack@2x.png" @click="routerBack(1)"></image>
      <view class="user flex">
        <image
          class="head"
          :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company flex mt30">
            <text class="text oneEllipsis">{{ state.nickname }}</text>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip0.png"
              v-if="state.level == 0"
              style="width: 91rpx"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip1.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip2.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon ml10"
              src="http://47.116.190.37:8002/static/home/vip3.png"
              v-else-if="state.level == 0"></image>
          </view>
        </view>
      </view>
      <!--  -->
      <view class="p0-35">
        <view class="introduce">后端开发程序猿</view>
        <view class="cards flex mt25">
          <text class="card mr35">+86 13209882736</text>
          <text class="card">derder@gmail.com</text>
        </view>
        <view class="space mt25">
          <text class="text">常驻：</text>
          杭州·顺丰中心节奏空间
        </view>
      </view>
    </view>
    <!--  -->
    <view class="tabs p0-35">
      <view class="text pb25" :class=" index == state.current ? 'textAct' : '' " v-for=" (item, index) in communityHomepageTabs " @click="state.current = index">{{ item }}</view>
    </view>
    <!--  -->
    <template v-if=" state.current <= 1 ">
      <communityList :list="cList">

      </communityList>
    </template>
    <!--  -->
    <template v-if=" state.current == 2 ">
      <view class="myreply p0-35 mt35">
        <view class="li mb25 pb25">
          <view class="article flex">
            <image class="banner mr20" src="http://47.116.190.37:8002/static/addHead.png"></image>
            <view class="info">
              <view class="title twoEllipsis">AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了</view>
              <view class="date mt6">04-21</view>
            </view>
          </view>
          <view class="reply">手麻了人也麻了AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了</view>
        </view>
        <view class="li mb25 pb25">
          <view class="article flex">
            <image class="banner mr20" src="http://47.116.190.37:8002/static/addHead.png"></image>
            <view class="info">
              <view class="titl twoEllipsise">AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了</view>
              <view class="date mt6">04-21</view>
            </view>
          </view>
          <view class="reply">
            <text class="">回复</text>
            Luxus：真不错👍
          </view>
        </view>
      </view>
    </template>
    <!--  -->
    <template v-if=" state.current == 3 ">
      <view class="replymy p0-35 mt35">
        <view class="li mb25 pb25 flex">
          <image class="head mr20" src="http://47.116.190.37:8002/static/addHead.png"></image>
          <view class="info">
            <view class="name ">Luxus</view>
            <view class="time mt15">评论了你的动态 3分钟前</view>
            <view class="text mt15">是的</view>
          </view>
        </view>
      </view>
    </template>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { defineAsyncComponent, reactive, ref } from 'vue';
import communityList from '/@/components/communityList.vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { communityHomepageTabs } from '/@/utils/universalArray';
import { useI18n } from 'vue-i18n';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  getUserInfo();

  state.languageType = uni.getStorageSync('languageType');
});
// 参数
const cList = ref([
{
						price: 35,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 75,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
					},
					{
						price: 385,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 784,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
					},
					{
						price: 7891,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 2341,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 661,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 1654,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 1678,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 924,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 8243,
						title: 'AI Agent共学，教大家怎么搭建微信机器人，当大家都搭建成功拉到一个群里后，整个效果太震撼了🚀 手麻了人也麻了',
						name: '李白',
            gongsi: '杭州大鱼网络科技有限公司',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
])
const state = reactive({
  languageType: '', //
  selectVip: 1, //
  current: 3, //

  nickname: '', //
  avatarUrl: '', //
  userId: '', //
  level: 0, //
  tabsIdx: 1,
  expireTime: '',
  select: false
});
// 获取用户资料
const getUserInfo = async () => {
  await userApi.getUserInfo({}).then((res: any) => {
    console.log(res);
    state.nickname = res.data.nickname;
    state.avatarUrl = res.data.avatar ? res.data.avatar.url : '';
    state.userId = res.data.id;
    state.level = res.data.vip.level;
    state.expireTime = res.data.vip.expire_time;
    
    
  });
}
// 提交
</script>

<style lang="scss" scoped>
.content {
  .top {
    height: 500rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    background: linear-gradient(180deg, #FFCF00 0%, #FFF2BA 45%, #FFFFFF 100%);

    .back {
      display: inline-block;
      width: 68rpx;
      height: 68rpx;
      position: absolute;
      left: 35rpx;
      top: 8%;
    }
    .introduce {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .cards {
      .card {
        padding: 0 10rpx;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 48rpx;
        color: #232322;
        border-radius: 10rpx;
        background-color: #FFFFFF;
      }
    }
    .space {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 32rpx;
      color: #232322;
      .text {
        color: #898784;
      }
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
        background-color: #FFCF00;
      }
    }

  }
  .myreply {
    .li {
      border-bottom: 1PX solid #F5F3EF;
      .article {
        .banner {
          display: inline-block;
          width: 100rpx;
          height: 100rpx;
          border-radius: 10rpx;
        }
        .info {
          width: calc( 100% - 130rpx );
          .title {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 32rpx;
            color: #232322;
          }
          .date {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 28rpx;
            color: #898784;
          }
        }
      }
      .reply {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #232322;
        text {
          color: #898784;
        }
      }
    }
  }
  .replymy {
    .li {
      border-bottom: 1PX solid #F5F3EF;
      .head {
        display: inline-block;
        width: 64rpx;
        height: 64rpx;
        border-radius: 64rpx;
      }
      .info {
        width: calc( 100% - 90rpx );
        .name {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 40rpx;
          color: #232322;
        }
        .time {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          color: #898784;
        }
        .text {
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
}
</style>
