<template>
  <view class="content p35">
    <view class="form">
      <view class="li flex pb25 mb25">
        <view class="left flex">
          <view class="label"><text class="">*</text>您的目的</view>
          <view class="text">我想参观办公室</view>
        </view>
        <image class="icon" src="/@/static/rightAsh.png" @click="state.selectShow = true"></image>
      </view>
      <view class="li flex pb25 mb25">
        <view class="left flex">
          <view class="label">城市</view>
          <view class="text">杭州</view>
        </view>
      </view>
      <view class="li flex pb25 mb25">
        <view class="left flex">
          <view class="label">空间</view>
          <view class="text">杭州</view>
        </view>
      </view>
      <view class="li flex pb25 mb25">
        <view class="left flex">
          <view class="label"><text class="">*</text>日期</view>
          <view class="text">{{ state.date ? state.date : '请选择日期' }}</view>
        </view>
        <image class="icon" src="/@/static/rightAsh.png" @click="state.calendarShow = true"></image>
      </view>
      <view class="li flex pb25 mb25">
        <view class="left">
          <view class="label">备注</view>
          <view class="textarea mt20">
            <u-input v-model="state.value" type="textarea" border placeholder="请输入备注" maxLength="300"/>
          </view>
        </view>
      </view>
      <!--  -->
    </view>
    <view class="footerOne">
      提交
    </view>
    <!-- 选择日期 -->
    <u-calendar v-model="state.calendarShow" mode="date" :change-year="false" min-year="2025" :min-date="state.oldDate" max-date="2030-12-31" @change="calendarChange"></u-calendar>
    <!--  -->
    <u-select v-model="state.selectShow" :list="list" @confirm="confirm"></u-select>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  state.type = query!.type
  state.date = new Date(new Date()).toISOString().split('T')[0]
  state.oldDate = new Date(new Date()).toISOString().split('T')[0]
});
// 参数
let list = [ {
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}]
const state = reactive({
  type: 0, // 2办公室3展示柜
  value: '123213',
  date: '',
  oldDate: '',
  calendarShow: false,
  selectShow: false,
})
// 选择日期结束
const calendarChange = (e: any) => {
  console.log(e);
  
}
const confirm = (e: any) => {
  console.log(e);
  
}
const getInfo = () => {
  // if( state.type == 0 ) {
  //   userApi.getAgreementsTerms().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // } else if( state.type == 1 ) {
  //   userApi.getAgreementsPrivacy().then((res: any) => {
  //     // console.log(res);
  //     state.content = res.data.content
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.content {
  .form {
    .li {
      justify-content: space-between;
      border-bottom: 1PX solid #F5F3EF;
      .left {
        width: calc( 100% - 50rpx );
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;
        color: #232322;
        .label {
          width: 160rpx;
        }
        .text {
          width: calc( 100% - 180rpx );
        }
        .textarea {
          width: 100%;
        }
      }
      .icon {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .footerOne {
    margin-top: 45rpx;
  }
}
</style>
