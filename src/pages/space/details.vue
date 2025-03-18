<template>
  <view class="content">
    <view class="back" @click="routerBack(1)">
      <image class="icon" src="/@/static/iconLeftBlack.png"></image>
    </view>
    <view class="banner" >
      <image class="imageW100" :src="state.banner"></image>
    </view>
    <!--  -->
    <view class="name">{{ state.name }}</view>
    <view class="center p0-35">
      <view class="grade mt15" v-if="state.type <= 1">{{ ltype == 'zh' ? spaceLevelEnums[state.level] : espaceLevelEnums[state.level] }}

      </view>
      <view class="fub mt25">
        {{ state.description }}
      </view>
      <view class="brief mt25">
        <text class="label">{{ t('belong') }}：</text>
        {{ state.area }}
      </view>
      <view class="brief mt25" v-if="state.type == 1 || state.type == 2">
        <text class="label">{{ t('capacity') }}：</text>
        {{ state.capacity }}{{ t('people') }}
      </view>

      <view class="brief mt25" v-if="state.type == 0 || state.type == 3">
        <text class="label">{{ t('leasingprice') }}：</text>
        ¥{{ state.price }}{{ t('RMB') }} / {{ state.type == 0 ? t('Startingfromminutes') : t('monthly')  }} 
      </view>

      <!-- <view class="brief mt25" v-if="state.type > 2">
        <text class="label">{{ t('sitearea') }}：</text>
        {{ state.size }}
      </view> -->
      <view class="line m35-0"></view>
      <!--  -->
      <view class="cards">
        <view class="card m10" v-for="(item, index) in state.services" :key="index">
          <image class="icon mt15" :src="item.icon"></image>
          <view class="text">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="list p0-35" v-if="state.type >= 2">
      <view class="li flex mt20 pt20" v-for="item in staffList" :key="item.id">
        <view class="btn" @click="makePhoneCall(item.phone)">{{ t('contact') }}</view>
        <view class="banner mr20">
          <image class="imageW100" :src="item.avatar_url"></image>
        </view>
        <view class="info">
          <view class="dname mt15">
            {{ item.name }}
            <text class="" style="font-size: 24rpx;font-weight: 200;">({{ item.position }})</text>
          </view>
          <view class="dtext mt15">{{ item.phone }} </view>
        </view>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="p35" v-if="state.type >= 2">
      <view class="wxchat" @click="contactClick" hover-class='none'>
        <text>联系微信客服</text>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { routerBack, routerTo, showTips } from '/@/utils/currentFun';
import { spaceLevelEnums, espaceLevelEnums } from '/@/utils/enums'
import { useI18n } from 'vue-i18n'
import Space from '/@/api/space';
const spaceApi = new Space();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  ltype.value = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
  state.type = query!.type
  state.id = query!.id
  state.sid = query!.sid
  getInfo()
});
// 参数
const ltype = ref('')
const staffList = ref([] as any)
const state = reactive({
  type: 0, // 0工位1会议室2办公室3展示柜4会议室
  id: '',
  sid: '',
  banner: '',
  services: [] as any[],
  name: '',
  area: '',
  description: '',
  size: '',
  price: 0,
  level: 1,
  capacity: 1,
})
const getInfo = () => {
  if( state.type == 0 ) {
    spaceApi.getSpaceMeetingWorkspacesDetails(state.sid, state.id).then((res: any) => {
      // console.log(res.data.image_url);
      details(res.data)
    })
  } else if( state.type == 1 ) {
    spaceApi.getSpaceMeetingRoomsDetails( state.id, {
      space_id: state.sid
    }).then((res: any) => {
      // console.log(res.data);
      details(res.data)
      state.capacity = res.data.capacity
    })
  } else if( state.type == 2 ) {
    spaceApi.getSpaceOfficesDetails( state.sid, state.id).then((res: any) => {
      console.log(res.data);
      details(res.data)
      state.capacity = res.data.capacity
      staffList.value = res.data.staff
    })
  } else if( state.type == 3 ) {
    spaceApi.getSpaceShowcasesDetails(state.sid, state.id).then((res: any) => {
      console.log(res.data);
      details(res.data)
      state.capacity = res.data.capacity
      staffList.value = res.data.staff
    })
  } else if( state.type == 4 ) {
    spaceApi.getSpaceEventRoomsDetails(state.sid, state.id).then((res: any) => {
      // console.log(res.data);
      details(res.data)
      state.capacity = res.data.capacity
      staffList.value = res.data.staff
    })
  }
}
const details = (obj: any) => {
  state.banner = obj.image_url
  state.services = obj.services
  state.name = obj.name
  state.description = obj.description
  state.area = obj.area_name
  state.price = obj.price
  state.level = obj.level
}
const makePhoneCall = (phone: string) => {
  uni.makePhoneCall({
    phoneNumber: phone
  });
}
const contactClick = () => {
  // console.log(12213);
  
  // @ts-ignore
  wx.openCustomerServiceChat({
    extInfo: {url: 'https://work.weixin.qq.com/kfid/kfca90d65129645148c'},
    corpId: 'wwaf856e1b502600db',
    success(res: any) {},
    fail(res: any) {
      console.log(res);
      
    },
  })
}
</script>

<style >
page {
  background-color: #F1F1EF;
}
</style>
<style lang="scss" scoped>
.content {
  position: relative;
  .back {
    position: absolute;
    left: 35rpx;
    top: 88rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: #FFFFFFB2;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5rpx;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .banner{
    height: 530rpx;
  }
  .name {
    margin-top: -88rpx;
    padding: 0 35rpx 0 ;
    font-size: 36rpx;
    font-weight: 600;
    line-height: 88rpx;
    color: #232322;
    background-color: #F1F1EF;
    border-radius: 25rpx 25rpx 0 0;
    z-index: 9999;
    position: relative;
    opacity: 0.8;
  }
  .center {
    
    .grade {
      display: inline-block;
      width: 46rpx;
      height: 28rpx;
      line-height: 28rpx;
      text-align: center;
      border-radius: 4rpx;
      background-color: #22D274;
      font-size: 16rpx;
      font-weight: 500;
      color: #ffffff;
      vertical-align: middle;
    }
    .grade1 {
      background-color: #ED9E05;
    }
    .fub {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .brief {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
      .label {
        color: #898784;
      }
    }
    .line {
      width: 100%;
      height: 1PX;
      background-color: #D7D4CF;
    }
    .cards {
      overflow: hidden;
      .card {
        float: left;
        width: 110rpx;
        height: 110rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        text-align: center;
        .icon {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
        }
        .text {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 28rpx;
          color: #232322;
        }
      }
    }
  }
}

.list {
  .li {
    border-top: 1PX solid #F5F3EF;
    position: relative;
    .btn {
      position: absolute;
      right: 0;
      top: 20rpx;
      width: 160rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #232322;
      background-color: #FFCF00;
    }
    .banner {
      width: 130rpx;
      height: 100rpx;
      border-radius: 6rpx;
    }
    .info {
      width: calc( 100% - 260rpx );
      .dname {
        font-size: 28rpx;
        font-weight: 600;
        line-height: 32rpx;
        color: #232322;
      }
      .dtext {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #232322;
      }
    }
  }
}
.wxchat {
  background-color: #FFCF00;
  font-size: 28rpx;
  font-weight: 600;
  color: #232322;
  text-align: center;
  line-height: 88rpx;
  border-radius: 88rpx;
}
</style>
