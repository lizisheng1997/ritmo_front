<template>
  <view class="content p35">
    <view class="member flex">
      <view class="left">
        机构成员： 
        <text class="">5/6</text>
      </view>
      <view class="btn" @click="openMemberExpansion">
        <image class="icon" src="http://47.116.190.37:8002/static/user/addMember.png"></image>
        成员扩容
      </view>
    </view>
    <!--  -->
    <view class="list">
      <view class="li flex mt35 p35" v-for="item in state.list" :key="item.id">
        <view class="left flex">
          <image class="head mr25" src="http://47.116.190.37:8002/static/home/head.png"></image>
          <view class="info">
            <view class="name mb10">{{ item.nickname }}</view>
            <view class="phone">{{ item.phone }}</view>
          </view>
        </view>
        <view class="right mt15">
          <view class="card">超管</view>
          <image class="icon ml15" src="http://47.116.190.37:8002/static/user/delete.png" @click="operatePopupRef.openDialog('是否删除该成员', item.id)"></image>
          
          <image class="icon" src="http://47.116.190.37:8002/static/user/editMember.png" @click="routerTo(`/pages/user/editMember?oid=${state.id}&id=${item.id}&nickname=${item.nickname}&phone=${item.phone}`)"></image>
        </view>
      </view>
    </view>
    <u-empty text="暂无数据" mode="list" icon-size="400" src="../../static/null.png" style="margin-top: 40%;" v-if=" !state.list?.length "></u-empty>
    <!--  -->
    <view class="footerOne" @click="routerTo(`/pages/user/editMember?oid=${state.id}`)">
      新增成员
    </view>
    <memberExpansion ref="memberExpansionRef" />
    <operatePopup ref="operatePopupRef" :isType="1" @refresh="getSelect"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import memberExpansion from '/@/components/memberExpansion.vue'
import operatePopup from '/@/components/operatePopup.vue'
import { routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { onLoad, onShow } from '@dcloudio/uni-app';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id
});
onShow(() => {
  getList()
})
// 参数
const state = reactive({
  id: '', //机构id
  list: [] as any[],


  phone: '', // 手机号
  select: false, // 
  image: '',
})
// 列表
const getList = () => {
  userApi.getOrganizationsMembers(state.id).then((res: any) => {
    console.log(res.data);
    state.list = res.data
  })
}
// 删除
const operatePopupRef = ref()
const getSelect = (show: boolean, id: string) => {
  if( show ) {
    userApi.getOrganizationsMembersDel(state.id, id).then((res: any) => {
      showTips(res.message)
      state.list = []
      getList()
    })
  }
}

// 
const memberExpansionRef = ref()
const openMemberExpansion = () => {
  memberExpansionRef.value.openDialog(4)
}
</script>

<style >
page {
  background-color: #F5F3EF;
}
</style>
<style lang="scss" scoped>
.content {
  .member {
    justify-content: space-between;
    .left {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 60rpx;
      text {
        display: inline-block;
        font-weight: 600;
        color: #232322;
      }
    }
    .btn {
      width: 180rpx;
      height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 60rpx;
      color: #232322;
      border-radius: 6rpx;
      background-color: #FFFFFF;
      .icon {
        display: inline-block;
        width: 36rpx;
        height: 36rpx;
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
  }
  .list {
    .li {
      justify-content: space-between;
      border-radius: 20rpx;
      background-color: #fff;
      .left {
        .head {
          display: inline-block;
          width: 90rpx;
          height: 90rpx;
          border-radius: 90rpx;
        }
        .info {
          .name {
            font-size: 32rpx;
            font-weight: 600;
            line-height: 44rpx;
            color: #232322;
          }
          .phone {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 30rpx;
            color: #757575;
          }
        }
      }
      .right {
        .card {
          display: inline-block;
          width: 66rpx;
          line-height: 36rpx;
          text-align: center;
          font-family: Helvetica;
          font-size: 20rpx;
          font-weight: 400;
          color: #F5F3EF;
          border-radius: 4rpx;
          background-color: #22D274;
        }
        .icon {
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          vertical-align: middle;
        }
      }
    }
  }
  .footerOne {
    margin-top: 80rpx;
  }
}
</style>
