<template>
  <view class="content" :style="{
    paddingTop: state.navAllHeight + 'rpx'
  }">
    <view class="p0-35">
      <view class="nav flex">
        <image class="icon" src="/@/static/iconLeftBlack.png" @click="() => {
          operatePopupRef.openDialog(t('Doyouwanttosavethedraft'), {
            id: -1,
            type: 1
          });
        }"></image>
        <image class="head mr25 mt10" :src=" state.avatarUrl ? state.avatarUrl : '../../static/addHead.png' "></image>
        <text class="name">{{ state.nickname }}</text>
      </view>
      <!--  -->
      <view class="title flex">
        <u-input class="input " v-model="state.title" :border="false" :custom-style="{
          height: '88rpx',
          lineHeight: '88rpx',
        }" :placeholder="t('Pleaseenteratitle')"  :maxlength="30"/>
        <view class="lent">{{ state.title.length }}/30</view>
      </view>
      <!--  -->
      <view class="news p35-0">
        <u-input v-model="state.content" type="textarea" :maxlength="1000" :auto-height="false" height="400" :placeholder="t('Pleaseenterthecontent')"/>
      </view>
      <!--  -->
      <view class="">
        <u-upload ref="uploadRef" max-count="6" :action="state.action" :file-list=" state.fileList" :header="headers" :upload-text="t('SelectPicture')" @on-success="uploadSuccess" @on-remove="uploadRemove"></u-upload>
      </view>
      <!--  -->
      <view class="select flex" @click="() => {
        state.regionShow = true
      }">
        <view class="left">
          <image class="icon mr15" src="/@/static/community/local.png"></image>
          <text class="">{{ state.city ? state.city : t('Pleaseselectcity') }}</text>
        </view>
        <image class="right mt20" src="/@/static/rightAsh.png"></image>
      </view>
      <!--  -->
      <view class="select flex" @click="() => {
        state.selectShow = true
      }">
        <view class="left">
          <image class="icon mr15" src="/@/static/community/tags.png"></image>
          <text class="">{{ state.categoryName ? state.categoryName : t('Pleaseselecttag') }}</text>
        </view>
        <image class="right mt20" src="/@/static/rightAsh.png"></image>
      </view>
      <view class="footerOne" @click="submit">
        {{ t('Confirmrelease') }}
      </view>
    </view>
    <!-- 选择城市 -->
     <u-picker mode="region" v-model="state.regionShow" :isArea="false" @confirm="cityConfirm"></u-picker>
    <!-- 选择标签 -->
    <u-select v-model="state.selectShow" :list="list" label-name="name" value-name="id" @confirm="confirm"></u-select>
     <!--  -->
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="(show, obj) => {
        if( show ) {
          if(obj.id == -1) {
            submitForm('draft')
          } else {
            submitForm('normal')
          }
        } else {
          if(obj.id == -1) {
            routerBack(1)
          }
        }
      }"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { onHide, onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import operatePopup from '/@/components/operatePopup.vue';
import User from '/@/api/user';
import Community from '/@/api/community';
const communityApi = new Community();
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id ? query!.id : ''
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight;
  getUserInfo()
  getCommunityCategory()
  getCommunityPostDraft()
  // if(state.id) getInfo();
});
onHide(() => {
  submitForm('draft')
})
// 参数
const list = ref([] as any[])
const headers = ref({
    'Authorization': uni.getStorageSync('accessToken')
      ? `Bearer ${uni.getStorageSync('accessToken')}`
      : '',
  })
const state = reactive({
  id: '',
  nickname: '',
  avatarUrl: '',
  title: '', // 标题
  content: '', // 内容
  city: '', // 城市
  categoryId: '',
  categoryName: '',
  
  navAllHeight: 0,
  selectShow: false,
  regionShow: false,
  action: 'https://ritmohub.cn/api/v1/community/upload/images',
  fileList: [] as any[]
})
const operatePopupRef = ref()
// 获取用户资料
const getUserInfo = async() => {
  await userApi.getUserInfo({}).then((res: any) => {
    // console.log(res.data);
    state.nickname = res.data.nickname
    state.avatarUrl = res.data.avatar_url? res.data.avatar_url : ''
  })
}
// 获取草稿
const getCommunityPostDraft = async() => {
  await communityApi.getCommunityPostDraft({}).then((res: any) => {
    console.log(res.data);
    if( res.data ) {
      state.title = res.data.title
      state.content = res.data.content
      state.city = res.data.city
      state.categoryId = res.data.category_id
      state.categoryName = res.data.category_name
      let imgList = res.data.images ? res.data.images.split(',') : []
      state.fileList = imgList.map((item: string) => {
        return {
          url: item
        }
      })
    }
  })
}
// 获取分类
const getCommunityCategory = () => {
  communityApi
    .getCommunityCategory({})
    .then((res: any) => {
      // console.log(res.data);
      list.value = res.data
      
    })
    .finally(() => {
    });
}
const confirm = (e: any) => {
  console.log(e);
  state.categoryId = e[0].value
  state.categoryName = e[0].label
  
}
// 城市回调
const cityConfirm = (e: any) => {
  console.log(e);
  state.city = e.city.name
}
// 
const uploadSuccess = (data: any, index: any, lists: any[]) => {
  // console.log(lists);
  state.fileList = lists
}
const uploadRemove = (index: any, lists: any[]) => {
  state.fileList = lists
}
const uploadRef = ref()
const submit = async() => {
  console.log(uploadRef.value.lists);
  if( !state.title ) {
    showTips(t('Pleaseenteratitle'))
    return;
  }
  if( !state.content ) {
    showTips(t('Pleaseenterthecontent'))
    return;
  }
  if( !state.city ) {
    showTips(t('Pleaseselectcity'))
    return;
  }
  if( !state.categoryId ) {
    showTips(t('Pleaseselecttag'))
    return;
  }
  operatePopupRef.value.openDialog(t('continueoperation'), {
    id: '',
    type: 1
  });
}
const submitForm = async(status: string) => {
  
  let fileList = state.fileList.map((item: any) => {
    return item.url
  })
  // console.log(state)
  await communityApi.getCommunityListAdd({
    title: state.title, 
    content: state.content,
    images: fileList.toString(),
    city: state.city,
    category_id: state.categoryId,
    status: status,
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
  .nav {
    height: 88rpx;
    line-height: 88rpx;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
      vertical-align: middle;
      margin: 20rpx 35rpx 0 0;
    }
    .head {
      display: inline-block;
      width: 64rpx;
      height: 64rpx;
      border-radius: 64rpx;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      font-size: 32rpx;
      font-weight: 600;
      color: #232322;
    }
  }
  .title {
    border-bottom: 1PX solid #F5F3EF;
    .input {
      width: calc( 100% - 100rpx );
    }
    .lent {
      width: 80rpx;
      line-height: 88rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #898784;
    }
  }
  .select {
    justify-content: space-between;
    line-height: 88rpx;
    border-bottom: 1PX solid #F5F3EF;
    .left {
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
      }
    }
    .right {
      display: inline-block;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
    }
  }
  .footerOne {
    margin-top: 88rpx;
  }
}
</style>
