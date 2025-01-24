<template>
  <view class="content p35">
    <view class="list" v-for="( item, index ) in state.list" :key="index">
      <view class="user mb25 flex p25">
        <view class="left flex">
          <image class="head mr30" :src="item.business_license_url"></image>
          <view class="center mr20">
            <view class="company flex">
              <text class="text oneEllipsis" :class=" item.status != 1 ? 'statusAsh' : '' " style="max-width: 64%;">{{ item.name }}</text>
              <image class="icon ml10" src="http://47.116.190.37:8002/static/home/vip1.png"></image>
            </view>
            <view class="name mt10">{{ item.admin_name }}</view>
          </view>
        </view>
        <view class="right">
          <!-- 
            0: 待审核 (新创建的机构默认状态)
            1: 正常 (管理员审核通过)
            2: 已拒绝 (管理员审核未通过)
            3: 已禁用 (管理员手动禁用)
          -->
          <!--  -->
           <template v-if="item.status == 0 ">
            <view class="status mb5">审核中</view>
            <view class="details" @click="routerTo(`/pages/home/institutionsDetails?id=${item.id}`)">详情></view>
           </template>
           <template v-else-if="item.status == 1 ">
            <image class="select" src="http://47.116.190.37:8002/static/selectIcon.png" v-if="item.id == state.currentOrg"></image>
            <image class="select" src="http://47.116.190.37:8002/static/select.png" v-else @click="() => {
              operatePopupRef.openDialog('是否切换机构', item.id)
            }"></image>
           </template>
           <template v-else>
            <view class="status statusRed mb5">{{ item.status == 2 ? '已驳回' : '已禁用' }}</view>
            <view class="details" @click="routerTo(`/pages/home/institutionsDetails?id=${item.id}`)">详情></view>
           </template>
        </view>
      </view>
      <!--  -->
    </view>
    <u-empty text="暂无数据" mode="list" icon-size="400" src="../..//static/null.png" style="margin-top: 40%;" v-if=" !state.list?.length "></u-empty>
    <!--  -->
    <view class="footerOne mt35" @click="routerTo(`/pages/home/addInstitutions`)">
      创建机构
    </view>
    <operatePopup ref="operatePopupRef" :isType="1" @refresh="getSelect"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { baseUrl } from '/@/utils/request'
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue'

import operatePopup from '/@/components/operatePopup.vue'
import { useI18n } from 'vue-i18n'
import Home from '/@/api/home';
import User from '/@/api/user';
const userApi = new User();
const homeApi = new Home();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  // state.id = query!.id
  
});
onShow(() => {
  getList()
  // getUserInfo()
})
// 参数
const state = reactive({
  list: [] as any[],
  currentOrg: '',
})
// 获取列表
const getList = () => {
  homeApi.getMyOrganizations({status: ''}).then((res: any) => {
    console.log(res);
    state.currentOrg = res.data.current_org.id
    state.list = res.data.organizations
  })
}
// 切换机构
const operatePopupRef = ref()
const getSelect = (show: boolean, id: string) => {
  if( show ) {
    homeApi.getSwithOrganizations(id).then((res: any) => {
      console.log(res);
      showTips(res.message)
      state.list = []
      state.currentOrg = ''
      getList()
    })
  }
}
// 获取用户资料
// const getUserInfo = async() => {
//   await userApi.getUserInfo({}).then((res: any) => {
//     console.log(res);
//   })
// }
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .list {
    .user {
      justify-content: space-between;
      height: 140rpx;
      background-color: #FFFFFF;
      box-shadow: 0px 4px 10px 0px #0000001A;
      border-radius: 20rpx;
      .left {
        width: calc( 100% - 126rpx );
        .head {
          display: inline-block;
          width: 80rpx;
          height: 80rpx;
          border-radius: 80rpx;
        }
        .center {
          width: calc( 100% - 160rpx );
          .not {
            line-height: 140rpx;
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
          }
          .company {
            font-size: 28rpx;
            font-weight: 600;
            color: #232322;
            .text {
              display: inline-block;
            }
            .icon {
              display: inline-block;
              width: 116rpx;
              height: 36rpx;
            }
          }
          .name {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 30rpx;
            color: #898784;
          }
        }
        .centerW100 {
          width: 100% !important;
        }
      }
      .right {
        // width: 100rpx;
        .select {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          margin-top: 20rpx;
        }
        .status {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 36rpx;
          color: #898784;
        }
        .details {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 40rpx;
          color: #232322;
        }
      }
    }
  }
  
  .statusAsh {
    color: #898784 !important;
  }
  .statusRed {
    color: #FF3434 !important;
  }
}
</style>
