<template>
  <view class="content membersIntroduction">
    <view class="top">
      <image class="back" src="/@/static/iconLeftBlack.png" @click="routerBack(1)" :style="{
      top: state.navAllHeight + 'rpx'
    }"></image>
      <image class="shield" src="/@/static/community/pingbi.png"
      @click="
        () => {
          operatePopupRef.openDialog(t('Doyouwanttoblockthisuser'), {
            id: '',
            type: 1
          });
        }
      "
      v-if="state.type == 0"></image>
      <image class="shield" src="/@/static/community/pingbi1.png"
      @click="
        () => {
          shieldListRef.openDialog();
        }
      "
      v-if="state.type == 1"></image>
      <view class="user flex">
        <image
          class="head"
          :src="state.avatarUrl"></image>
        <view class="center">
          <view class="company  mt30">
            <view class="">{{ state.nickname }}</view>
            <image
              class="icon mt8"
              src="https://ritmohub.cn/static/home/vip0.png"
              v-if="state.level == 0"
              style="width: 91rpx"></image>
            <image
              class="icon mt8"
              src="https://ritmohub.cn/static/home/vip1.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon mt8"
              src="https://ritmohub.cn/static/home/vip2.png"
              v-else-if="state.level == 0"></image>
            <image
              class="icon mt8"
              src="https://ritmohub.cn/static/home/vip3.png"
              v-else-if="state.level == 0"></image>
          </view>
        </view>
      </view>
      <!--  -->
      <view class="p0-35">
        <view class="introduce">{{ state.intro }}</view>
        <view class="cards flex mt25" v-if="state.phone || state.email">
          <text class="card mr35" v-if="state.phone">{{ state.phone }}</text>
          <text class="card" v-if="state.email">{{ state.email }}</text>
        </view>
        <view class="space mt25" v-if="state.spaces">
          <text class="text">{{ t('permanent') }}：</text>
          {{ state.spaces }}
        </view>
      </view>
    </view>
    <!--  -->
    <view class="tabs ">
      <view class="text pb25" :class=" index == state.current ? 'textAct' : '' " v-for=" (item, index) in state.type ? communityHomepageTabs : ['最新动态'] " :key="index" @click="() => {
        state.current = index
        tabsChange()
      }">{{ item }}</view>
    </view>
    <!--  -->
    <template v-if=" state.current <= 1 ">
      <communityList :list="state.list" :isRouter=" state.current == 0 ? 0 : 1 ">

      </communityList>
    </template>
    <!--  -->
    <template v-if=" state.current == 2 ">
      <view class="myreply p0-35 mt35">
        <view class="li mb25 pb25" v-for="item in state.list" :key="item.id">
          <view class="article flex">
            <image class="banner mr20" :src="item.post_imagesArr[0]" v-if="item.post_imagesArr?.length"></image>
            <view class="info">
              <view class="title twoEllipsis">{{ item.post_title }}</view>
              <view class="date mt6">{{ item.createtime_text }}</view>
            </view>
          </view>
          <view class="reply">{{ item.content }}</view>
        </view>
      </view>
    </template>
    <!--  -->
    <template v-if=" state.current == 3 ">
      <view class="replymy p0-35 mt35" v-for="item in state.list" :key="item.id">
        <view class="li mb25 pb25 flex">
          <image class="head mr20" :src="item.commenter_avatar"></image>
          <view class="info">
            <view class="name ">{{ item.commenter_nickname }}</view>
            <view class="time mt15">评论了你的动态 {{ item.createtime_text }}</view>
            <view class="text mt15">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </template>
      <u-empty
        :text="t('Nodata')"
        mode="favor"
        v-if="!state.list?.length"
        margin-top="120"
        icon-size="200"></u-empty>
    <!--  -->
    <!-- 删除文章 -->
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="
        (show, idx) => {
          if (show) {
            getAddBlockedProfiles();
          }
        }
      "></operatePopup>
      <!--  -->
        <shieldList ref="shieldListRef" @refresh="() => {
          tabsChange()
        }"/>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { defineAsyncComponent, reactive, ref } from 'vue';
import communityList from '/@/components/communityList.vue'
import operatePopup from '/@/components/operatePopup.vue';
import shieldList from '/@/components/shieldList.vue';
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { communityHomepageTabs } from '/@/utils/universalArray';
import { useI18n } from 'vue-i18n';
import Community from '/@/api/community';
const communityApi = new Community();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  
  state.type = query!.isUser;
  state.current = 0
  if(state.type) {
     state.id =
        uni.getStorageSync('userInfos').id
  } else {
    state.id = query!.id;
  }
  if( query!.tabsIdx ) {
    state.current = Number(query!.tabsIdx)
  }
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight;
  getUserInfo();
  tabsChange()
  state.languageType = uni.getStorageSync('languageType');
});
// 参数
const state = reactive({
  id: '',
  type: 0, // 1我的主页  0他人主页
  navAllHeight: 0,
  languageType: '', //

  current: 0, // tabs
  nickname: '', //
  avatarUrl: '', //
  level: 0, //
  tabsIdx: 1,
  expireTime: '',
  intro: '',
  phone: '', // 手机号
  email: '', // 邮箱
  spaces: '', // 空间
  page: 1, // 页码
  pageSize: 20, // 页数
  list: [] as any[],
  select: false
});
const shieldListRef = ref()
// 获取用户资料
const getUserInfo = async () => {
  await communityApi.getOneProfiles({
    user_id: state.id
  }).then((res: any) => {
    // console.log(res);
    state.nickname = res.data.nickname;
    state.avatarUrl = res.data.avatar? res.data.avatar : '';
    state.level = res.data.vip_level;
    state.expireTime = res.data.vip_expire_time;
    state.intro = res.data.bio;
    state.phone = `+${res.data.area_code} ${res.data.show_email}`
    state.email = res.data.show_phone
    state.spaces = res.data.default_space_name
    
  });
}
// tabs
const tabsChange = () => {
  console.log(state.current);
  state.page = 1
  state.list = []
  switch (state.current) {
    case 0:
      getProfiles()
      break;
    case 1:
      getMyCollectsList()
      break;
    case 2:
      getCommentBytype(1)
      break;
    case 3:
      getCommentBytype(2)
      break;
  
  }
  
}
onReachBottom(() => {
  state.pageSize+=1;
  switch (state.current) {
    case 0:
      getProfiles()
      break;
  
  }
  console.log('到底了');
});
const getProfiles = async() => {
  if( state.type ) {
   await communityApi.getCommunityProfiles({
      page: state.page,
      limit: state.pageSize
    }).then((res: any) => {
      console.log(res.data);
      state.list = state.list.concat(res.data.postList ? res.data.postList : []);
    })
  } else {
    await communityApi.getOneProfilesPostList({
      page: state.page,
      limit: state.pageSize
    }).then((res: any) => {
      console.log(res.data);
      // state.list = state.list.concat(res.data.postList ? res.data.postList : []);
      
    })
  }
}
// 收藏的帖子
const getMyCollectsList = async() => {
   await communityApi.getMyCollectsList({
      page: state.page,
      limit: state.pageSize
    }).then((res: any) => {
      let arr = res.data.map((item: any) => {
        item['avatar'] = item.post_avatar
        item['vip_level'] = item.post_vip_level
        item['nickname'] = item.post_nickname
        item['imagesArr'] = item.post_imagesArr
        item['view_count'] = item.post_view_count
        return item
      })
      // console.log(arr);
      state.list = state.list.concat(arr ? arr : []);
    })
}
// 我回复的
const getCommentBytype = async(type: number) => {
   await communityApi.getCommentBytype({
      type,
      page: state.page,
      limit: state.pageSize
    }).then((res: any) => {
      // console.log(res.data);
      state.list = state.list.concat(res.data ? res.data : []);
      
    })

}
// 屏蔽用户
const operatePopupRef = ref()
const getAddBlockedProfiles = async () => {
  await communityApi.getAddBlockedProfiles({
    blocked_user_id: state.id, 
    reason: '',
  }).then((res: any) => {
    showTips(res.msg)
    setTimeout(() => {
      routerBack(1)
    }, 1000);
  })
}
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
    }
    .shield {
      display: inline-block;
      width: 58rpx;
      height: 58rpx;
      position: absolute;
      right: 35rpx;
      top: 38%;
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
      margin: 0 30rpx;
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
