<template>
  <view class="content p35">
    <view class="member flex">
      <view class="left">
        机构成员： 
        <text class="">{{ state.list.length }} / {{ state.totalMemberLimit }}</text>
      </view>
      <view class="btn" @click="openMemberExpansion">
        <image class="icon" src="https://ritmohub.cn/static/user/addMember.png"></image>
        成员扩容
      </view>
    </view>
    <!--  -->
    <view class="list">
      <view class="li flex mt35 p35" v-for="item in state.list" :key="item.id">
        <view class="left flex">
          <image class="head mr25" src="https://ritmohub.cn/static/home/head.png"></image>
          <view class="info">
            <view class="name mb10">{{ item.nickname }}</view>
            <view class="phone">{{ item.phone }}</view>
          </view>
        </view>
        <view class="right mt15">
          <view class="card" v-if=" item.role == 1 ">超管</view>
          <image class="icon ml15" src="https://ritmohub.cn/static/user/delete.png" @click="operatePopupRef.openDialog('是否删除该成员', {id: item.id})" v-if=" item.role != 1 "></image>
          
          <image class="icon" src="https://ritmohub.cn/static/user/editMember.png" @click="routerTo(`/pages/user/editMember?oid=${state.id}&id=${item.id}&nickname=${item.nickname}&phone=${item.phone}`)"  v-if=" item.role != 1 "></image>
        </view>
      </view>
    </view>
    <u-empty :text="t('Nodata')" mode="list" icon-size="400" src="https://ritmohub.cn/static/null.png" style="margin-top: 40%;" v-if=" !state.list?.length "></u-empty>
    <!--  -->
    <view class="footerOne" @click="routerTo(`/pages/user/editMember?oid=${state.id}`)">
      新增成员
    </view>
    <memberExpansion ref="memberExpansionRef" @refresh="memberExpansionChange"/>
    <!-- 操作 -->
    <operatePopup ref="operatePopupRef" :isType="1" @refresh="getSelect"></operatePopup>
    <!-- 支付 -->
     
    <payPopup
      ref="payPopupRef"
      :isType="1"
      @refresh="getPay"></payPopup>
  </view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import memberExpansion from '/@/components/memberExpansion.vue'
import operatePopup from '/@/components/operatePopup.vue'
import payPopup from '/@/components/payPopup.vue';
import { getRequestPayment, routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n'
import { onLoad, onShow } from '@dcloudio/uni-app';
import User from '/@/api/user';
import Home from '/@/api/home';
const homeApi = new Home();
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.id = query!.id
});
onShow(() => {
  // getList()
  getInfo()
})
// 参数
const state = reactive({
  id: '', //机构id
  list: [] as any[],
  orgName: '',
  totalMemberLimit: 0, // 总人数
  currentMemberCount: 0, // 人数
  duration: 0, // 天数
})
// 获取机构详情
const getInfo = () => {
  homeApi.getOrganizationsInfo(state.id).then((res: any) => {
    console.log(res.data);
    state.totalMemberLimit = res.data.total_member_limit
    // state.currentMemberCount = res.data.current_member_count
    state.list = res.data.members
    state.orgName = res.data.name
    if( !res.data.is_vip ) {
      setTimeout(() => {
        operatePopupRef.value.openDialog('是否支付该机构基础扩容费用', 0)
      }, 200);
    }
  })
}
// 删除
const operatePopupRef = ref()
const payPopupRef = ref();
const getSelect = (show: boolean, obj: {id: string}) => {
  // console.log(show);
  if( show ) {
    if( obj.id ) {
      userApi.getOrganizationsMembersDel(state.id, obj.id).then((res: any) => {
        showTips(res.message)
        state.list = []
        getInfo()
      })
    } else {
      payPopupRef.value.openDialog();
    }
  } else {
    if( !obj.id ) routerBack(1)
  }
}

// 
const memberExpansionRef = ref()
const openMemberExpansion = () => {
  memberExpansionRef.value.openDialog()
}
// 扩容订单
const memberExpansionChange = (duration: number, limit: number) => {
  routerTo(`/pages/user/memberOrder?id=${state.id}&limit=${limit}&oldLimit=${state.totalMemberLimit}&duration=${duration}&orgName=${state.orgName}`, true)
}
// 创建机构会员订单
const getPay = (show: boolean, type: string, id: string) => {
  if (show) {
    userApi.getOrganizationsMemberVip(state.id, {
      members: 3,
      duration_type: 'month'
    }).then((res: any) => {
      getOrganizationsMembersOrderPay(type, res.data.id)
    }).catch(() => {
      getInfo()
    })
  }
}
// 支付机构会员订单
const getOrganizationsMembersOrderPay = (type: string, orderId: string) => {
  // @ts-ignore
  let terminalPay = getApp().globalData.terminalPay
  if (type == 'wxpay') {
    uni.login({
      success: function (resLogin) {
        if (resLogin.code) {
          console.log(resLogin);
          getOrdersPay(state.id, orderId, type, `?device=${terminalPay}&code=${resLogin.code}&payment_type='wechat'`)
        } else {
          console.log('登录失败！' + resLogin.errMsg);
        }
      }
    });
  } else if( type == 'alipay' ) {
    // console.log(type);
    getOrdersPay(state.id, orderId, type, `?device=${terminalPay}&platform=android&payment_type=alipay`)

  }
}

const getOrdersPay = (id: string, orderId: string, type: string, obj: string) => {
  // console.log(obj);
  userApi.getOrganizationsMembersOrderPay(id, orderId, obj).then((res: any) => {
    // console.log(res.data);
    // showTips(res.message)
    getRequestPayment(type, res.data.orderInfo).then((res) => {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/user/index'
        })
      }, 1500);
    })
  })

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
