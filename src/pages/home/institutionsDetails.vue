<template>
  <view class="content p35" v-if="state.info">
    <view class="examine pb35" style="border-bottom: 1PX solid #D7D4CF;">
      <view class="status" v-if="state.info.status == 0">审核中</view>
      <view class="status statusRed" v-else-if="state.info.status == 2">已驳回</view>
      <view class="remark flex mt35" v-if="state.info.status == 2">
        <view class="label">拒绝理由：</view>
        <view class="text">{{ state.info.reject_reason }}</view>
      </view>
    </view>
    <!--  -->
    <view class="title mt35">机构信息</view>
    <!--  -->
    <view class="form" style="border-bottom: 1PX solid #D7D4CF;">
      <view class="item flex pb35 ">
        <view class="text">
          机构名称
        </view>
        <view class="value">
          {{ state.info.name }}
        </view>
      </view>
      <view class="item flex pb35 ">
        <view class="text">
          统一信用代码
        </view>
        <view class="value">
          {{ state.info.social_credit_code }}
        </view>
      </view>
      <view class="item flex pb35 ">
        <view class="text">
          营业执照
        </view>
        <view class="yyzz ml30">
          <image class="icon imageW100" :src="state.info.business_license_url"></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="title mt35">超管信息</view>
    <view class="form">
      <view class="item flex pb35 ">
        <view class="text">
          管理员
        </view>
        <view class="value">
          {{ state.info.admin_name }}
        </view>
      </view>
      <view class="item flex pb35 ">
        <view class="text">
          联系方式
        </view>
        <view class="value">
          {{ state.info.admin_phone }}
        </view>
      </view>
    </view>
    <!--  -->
    <view class="btn">
      编辑并重新提审
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { baseUrl } from '/@/utils/request'
import { useI18n } from 'vue-i18n'
import Home from '/@/api/home';
const homeApi = new Home();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id
  getInfo()
});
// 参数
const state = reactive({
  id: '', // 
  info: {} as any
})
const getInfo = async() => {
  await homeApi.getOrganizationsInfo(state.id).then((res: any) => {
    console.log(res);
    state.info = res.data
  })
}
</script>

<style >
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.content {
  .examine {
    .status {
      font-size: 48rpx;
      font-weight: 600;
      line-height: 56rpx;
      color: #232322;
    }
    .statusRed {
      color: #FF3434 !important;
    }
    .remark {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;

      .label {
        width: 160rpx;
        color: #898784;
      }
      .text {
        width: calc( 100% - 160rpx );
        color: #232322;
      }
    }
  }
  .title {
    font-size: 36rpx;
    font-weight: 600;
    line-height: 48rpx;
    color: #232322;
  }
  .form {
    margin-top: 35rpx;
    
    // height: 32rpx;
    .item {
      justify-content: space-between;
      .text {
        color: #898784;
        width: 200rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;

      }
      .yyzz {
        width: 180rpx;
        height: 105rpx;
        position: relative;
      }
    }
  }
  .btn {
    margin-top: 70rpx;
    width: 100%;
    line-height: 88rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    background-color: #FFCF00;
  }
}
</style>
