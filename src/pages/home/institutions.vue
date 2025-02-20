<template>
  <view class="content p35">
    <view
      class="list"
      v-for="(item, index) in state.list"
      :key="index">
      <view class="user mb25 flex p25">
        <view class="left flex">
          <image
            class="head mr30"
            :src="item.business_license_url"
            v-if="item.business_license_url"></image>
          <view
            class="center mr20"
            :class="item.business_license_url ? '' : 'centerW100'">
            <view class="company flex">
              <text
                class="text oneEllipsis"
                :class="item.status != 3 ? 'statusAsh' : ''"
                style="max-width: 64%"
                >{{ item.name }}</text
              >
              <image
                class="icon ml10"
                src="/@/static/home/vip3.png"
                v-if="item.type == 0"></image>
              <image
                class="icon ml10"
                src="/@/static/home/vip2.png"
                v-else></image>
            </view>
            <view class="name mt10">{{
              item.type ? `ID: ${item.userId}` : item.admin_name
            }}</view>
          </view>
        </view>
        <view class="right">
          <!-- 
           1:未审核 2:已驳回 3:已通过 4:已禁用
          -->
          <!--  -->
          <template v-if="item.status == 1">
            <view class="status mb5">{{ t('inreview') }}</view>
            <view
              class="details"
              @click="routerTo(`/pages/home/institutionsDetails?id=${item.id}`)"
              >{{ t('details') }}></view
            >
          </template>
          <!-- item.type ? item.userId : item.id == state.currentOrg -->
          <template v-else-if="item.status == 3">
            <image
              class="select"
              src="/@/static/selectIcon.png"
              v-if="
                ( item.type && item.userId == state.currentOrg ) || 
                ( !item.type && item.id == state.currentOrg ) 
              "></image>
            <image
              class="select"
              src="/@/static/select.png"
              v-else
              @click="
                () => {
                  operatePopupRef.openDialog(t('continueoperation'), {
                    id: item.type ? item.userId : item.id,
                    type: item.type
                  });
                }
              "></image>
          </template>
          <template v-else>
            <view class="status statusRed mb5">{{
              item.status == 2 ? t('Rejected') : t('disabled')
            }}</view>
            <view
              class="details"
              @click="routerTo(`/pages/home/institutionsDetails?id=${item.id}`)"
              >{{ t('details') }}></view
            >
          </template>
        </view>
      </view>
      <!--  -->
    </view>
    <u-empty
      :text="t('Nodata')"
      mode="list"
      icon-size="400"
      src="https://ritmohub.cn/static/null.png"
      style="margin-top: 40%"
      v-if="!state.list?.length"></u-empty>
    <!--  -->
    <view
      class="footerOne mt35"
      @click="routerTo(`/pages/home/addInstitutions`)">
      {{ t('CreateInstitution') }}
    </view>
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="getSelect"></operatePopup>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { baseUrl } from '/@/utils/request';
import { routerTo, showTips } from '/@/utils/currentFun';
import { reactive, ref } from 'vue';

import operatePopup from '/@/components/operatePopup.vue';
import { useI18n } from 'vue-i18n';
import Home from '/@/api/home';
import User from '/@/api/user';
const userApi = new User();
const homeApi = new Home();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  uni.setNavigationBarTitle({
    title: t('ListofInstitutions')
  });
});
onShow(() => {
  state.list = [];
  getList();
});
// 参数
const state = reactive({
  list: [] as any[],
  currentOrg: ''
});
// 获取列表
const getList = () => {
  homeApi.getMyOrganizations({ status: '' }).then((res: any) => {
    // console.log(res);
    state.list = res.data.map((item: any) => {
      item.type = 0;
      return item;
    });
    getUserInfo();
  });
};
// 切换机构
const operatePopupRef = ref();
const getSelect = (show: boolean, obj: { id: string; type: number }) => {
  if (show) {
    homeApi.getSwithOrganizations(obj.id, obj.type).then((res: any) => {
      // console.log(res);
      showTips(res.message);
      state.list = [];
      state.currentOrg = '';
      getList();
    });
  }
};
// 获取用户资料
const getUserInfo = async () => {
  await userApi.getUserInfo({}).then((res: any) => {
    state.currentOrg = res.data.current_org_id
      ? res.data.current_org_id
      : res.data.id;
    console.log(state.currentOrg);

    state.list.push({
      type: 1,
      userId: res.data.id,
      name: res.data.nickname,
      business_license_url: res.data.avatar_url,
      level: res.data.vip_level,
      status: 3
    });
    // console.log(state.list);
  });
};
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>
.content {
  .list {
    .user {
      justify-content: space-between;
      height: 140rpx;
      background-color: #ffffff;
      box-shadow: 0px 4px 10px 0px #0000001a;
      border-radius: 20rpx;
      .left {
        width: calc(100% - 126rpx);
        .head {
          display: inline-block;
          width: 80rpx;
          height: 80rpx;
          border-radius: 80rpx;
        }
        .center {
          width: calc(100% - 160rpx);
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
              width: 36rpx;
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
    color: #ff3434 !important;
  }
}
</style>
