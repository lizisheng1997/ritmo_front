<template>
  <view class="content">
    <!--  -->
    <u-tabs :list="tabsList" :is-scroll="false" v-model="state.status" active-color="#ffcf00" @change="tabsChange"></u-tabs>
    <view class="list mt25 p0-35">
      <view
        class="li p10 mb25"
        v-for="item in state.list" 
        :key="item.orderid"
        @click="orderTo(item.id)">
        <image
          class="banner"
          :src="item.house.images[0]"></image>
        <view class="center">
          <view class="name"> {{ state.type == 'zh' ? item.house.name : item.name_en }} </view>
          <view class="city m10-0">
            订单编号：{{ item.orderid }}
          </view>
          <view class="city m10-0">
            下单时间：{{ item.leave_time_text }}
          </view>
          <view class="city m10-0">
            订单金额：<text class="" style="color: #e93516;font-weight: 500;">￥{{ item.amount }}</text>
          </view>
          <view class="city footer">
            <text class="">订单类型：{{ item.type_text }}</text>
            <text class="btn">{{ state.type == 'zh' ? item.status_text : item.status }}</text>
          </view>
        </view>
      </view>
    </view>
    <u-empty :text="t('Nodata')" mode="list" icon-size="400" src="https://ritmohub.cn/static/null.png" style="margin-top: 40%;" v-if=" !state.list?.length "></u-empty>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { routerTo } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import Homestay from '/@/api/homestay';
const homestayApi = new Homestay();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);

  state.type = uni.getStorageSync('languageType')
    ? uni.getStorageSync('languageType')
    : 'zh';
  uni.setNavigationBarTitle({
    title: t('homestayOrder')
  });
  // state.type = query!.type
});
onShow(() => {
  
  clearSearch();
})
// 参数 
const tabsList = ref([
  { name: '全部', key: '0' },
  { name: '未支付', key: 'created' },
  { name: '已支付', key: 'paid' },
  { name: '已取消', key: 'canceled' },
  { name: '已入住', key: 'checkined' },
  { name: '退款中', key: 'refunding' },
  { name: '已完成', key: 'finished' },
])
const state = reactive({
  type: '',
  status: 0, // 订单状态:created=未支付,paid=已支付,expired=已失效,canceled=已取消,toshopay=到店付,refunding=退款中,checkined=已入住,checkouting=退房中,evaluate=待评价,finished=已完成
  page: 20,
  pageSize: 1,
  list: [] as any[],
});
const clearSearch = () => {
  state.pageSize = 1
  state.list = []
  getList()
}
//
const tabsChange = (index: number) => {
  state.status = index
  clearSearch();
};
//
const getList = async () => {
  await homestayApi.getOrderList({
    limit: state.page,
    page: state.pageSize,
    status: state.status == 0 ? '' : tabsList.value[state.status].key
  }).then((res: any) => {
    console.log(res.data.data);
    state.list = state.list.concat(res.data.data ? res.data.data : []);
  });
};
onReachBottom(() => {
  state.pageSize+=1;
  getList();
  console.log('到底了');
});
// 提交
const orderTo = async(orderId: string) => {
  routerTo(
    `/pages/homestay/order?orderId=${orderId}&type=1`,
    true
  );
};
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped>

  .list {
    .li {
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px #c1c1c1;
      border-radius: 15rpx;
      display: flex;
      .banner {
        display: inline-block;
        width: 216rpx;
        height: 216rpx;
        border-radius: 8rpx;
        margin-right: 25rpx;
      }
      .center {
        width: calc(100% - 245rpx);
        .name {
          font-weight: 600;
          font-size: 28rpx;
          line-height: 44rpx;
          color: #232322;
        }
        .city {
          font-weight: 500;
          font-size: 20rpx;
          color: #232322;
          .icon {
            display: inline-block;
            width: 20rpx;
            height: 22rpx;
          }
        }
        .footer {
         display: flex;
         justify-content: space-between;
         line-height: 44rpx;
          .btn {
            display: inline-block;
            background-color: #a08708;
            color: #fff;
            width: 100rpx;
            
            border-radius: 8rpx;
            display: flex;
            justify-content: center;
            text-align: center;
          }
        }
      }
    }
  }
</style>
