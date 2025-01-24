<template>
  <view class="content p35">
    <view class="title">机构信息</view>
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          机构名称
        </view>
        <input class="uni-input ml25" maxlength="7" v-model="form.name" placeholder="请输入机构名称" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          统一信用代码
        </view>
        <input class="uni-input ml25" v-model="form.socialCreditCode" placeholder="请输入统一信用代码" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          营业执照
        </view>
        <view class="yyzz ml30">
          <image class="icon imageW100" :src=" form.businessLicenseUrl ? form.businessLicenseUrl : 'http://47.116.190.37:8002/static/home/yyzz.png'" @click="uploadImage"></image>
          <image class="delete" src="http://47.116.190.37:8002/static/home/delete.png" @click=" form.businessLicenseUrl = '' "></image>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="title mt35">超管信息</view>
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          管理员
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="form.adminName" placeholder="请输入管理员" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          联系方式
        </view>
        <input class="uni-input ml25" type="number" maxlength="11" v-model="form.adminPhone" placeholder="请输入联系方式" />
      </view>
    </view>
    <!--  -->
    <view class="btn" :class=" form.name && form.socialCreditCode && form.businessLicenseUrl && form.adminName && form.adminPhone.length == 11 ? '' : 'btnNull' " @click="submit">
      确认创建
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { burrentChooseImage, routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import Home from '/@/api/home';
import { onLoad } from '@dcloudio/uni-app';
const homeApi = new Home();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  form.id = query!.type ? query!.type : ''
});
// 参数
const form = reactive({
  id: '',
  name: '', // 机构名称
  socialCreditCode: '', // 统一信用代码
  legalPerson: '',
  businessLicenseUrl: '', // 营业执照
  adminName: '', // 管理员
  adminPhone: '', // 联系方式
  // legal_person
})
// 上传图片
const uploadImage = () => {
   burrentChooseImage(0, 1).then((res: any) => {
    // console.log(res);
    
    homeApi.getUpdateLicenses({ filePath: res[0] }).then((res: any) => {
      // console.log(res);
      
      form.businessLicenseUrl = res.url
    }).catch((err) => {
    })
  })
}
// @click="routerTo(`/pages/home/institutionsDetails`)"
const submit = async() => {
  
  let { id, name, socialCreditCode, businessLicenseUrl, adminName, adminPhone } = form
  if(!name && !socialCreditCode && !businessLicenseUrl && !adminName && !adminPhone) {
    showTips('请填写资料')
    return;
  }
  await homeApi.getAddOrganizations({
    name,
    social_credit_code: socialCreditCode,
    business_license_url: businessLicenseUrl,
    admin_name: adminName,
    admin_phone: adminPhone,
  }).then((res: any) => {
    console.log(res);
    showTips(res.message)
    setTimeout(() => {
      routerBack(1)
    }, 1000);
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
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 200rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;

      }
      .yyzz {
        width: 180rpx;
        height: 105rpx;
        position: relative;
        .delete {
          display: inline-block;
          width: 32rpx;
          height: 32rpx;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .uni-input {
        display: inline-block;
        width: calc( 100% - 260rpx );
        height: 36rpx;
        min-height: 36rpx;
        line-height: 36rpx;
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
  .btnNull {
    opacity: 0.6;
  }
}
</style>
