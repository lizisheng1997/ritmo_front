<template>
  <view class="content p35">
    <view class="myOrderList">
      <view
        class="li mb35 flex"
        @click="routerTo(`/pages/user/orderDetails?id=${item.id}&type=${item.order_source }`)"
        v-for="item in list"
        :key="item.id">
        <view class="left flex">
          <image
            class="banner mr25"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            v-if="
              item.order_source == 'workspace' ||
              item.order_source == 'meeting_room'
            "></image>
          <view
            class="card mr25"
            v-else
            >{{
              item.order_source == 'vip' || item.order_source == 'org_vip'
                ? '会员'
                : '扩容'
            }}</view
          >
          <view class="info">
            <view class="title mb10">
              <text class="text">
                {{
                  item.order_source == 'vip' || item.order_source == 'org_vip'
                    ? '会员'
                    : item.order_source == 'org_expansion'
                    ? '扩容'
                    : item.order_source == 'workspace'
                    ? '工位'
                    : '会议室'
                }}
              </text>
              <!-- <text class="grade ml15">初级</text> -->
            </view>
            <view
              class="hour"
              v-if="
                item.order_source == 'workspace' ||
                item.order_source == 'meeting_room'
              "
              >{{ dateToLocaleDateString(item.start_time) }}-{{
                dateToLocaleDateString(item.end_time)
              }}</view
            >
            <view
              class="hour"
              v-if="
                item.order_source == 'vip' || item.order_source == 'org_vip'
              "
              >有效期：{{ dateToLocaleDateString(item.end_time) }}</view
            >
            <view
              class="hour"
              v-else
              >有效期：{{ dateToLocaleDateString(item.end_time) }}</view
            >
          </view>
        </view>
        <view
          class="pay flex"
          style="margin-top: 15rpx">
          <view class="price">￥{{ item.amount }}</view>
        </view>
      </view>
      <!-- 
      workspace工位   meeting_room会议室  vip会员 org_vip 机构会员 org_expansion机构扩容。 同时，每个订单记录添加 order_status_text（状态文字说明），状态映射如下： 对于预订类订单：0：“待支付”, 1：“待使用”, 2：“使用中”, 3：“已完成”, 4：“已取消”； 对于VIP及机构订单：0：“待支付”, 1：“已支付”, 2：“已取消”。 同时返回权益使用记录（VipBenefitHistory）的历史记录。 -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { routerTo, dateToLocaleDateString } from '/@/utils/currentFun';
import { useI18n } from 'vue-i18n';
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.type == '0' ? '我的订单' : '机构订单'
  });
  // state.type = query!.type
  getList();
});
// 参数
const list = ref([] as any[]);
const state = reactive({
  type: 0,
  valueLeng: '',
  value: ''
});
//
const getList = async () => {
  await userApi.getUserOrders().then((res: any) => {
    console.log(res.data);
    list.value = res.data.orders;
  });
};
</script>

<style>
page {
  background-color: #f5f3ef;
}
</style>
<style lang="scss" scoped></style>
