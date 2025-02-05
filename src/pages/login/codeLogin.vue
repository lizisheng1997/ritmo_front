<template>
  <view class="content p35">
    <view class="title">验证码登录</view>
    <view class="fub mt20">未注册手机验证后自动登录</view>
    <!--  -->
    <view class="form flex pb40">
      <view class="sign" @click=" state.areaShow = true ">
        <u-icon class="icon" name="plus" color="#232322" size="16"></u-icon>
        {{ state.areaCode }}<u-icon class="icon ml10" name="arrow-down-fill" color="#232322" size="14"></u-icon>
      </view>
      <input class="uni-input ml25" type="number" maxlength="11" v-model="state.phone" placeholder="请输入手机号" />
    </view>
    <!--  -->
    <view class="btn" :class=" state.phone.length == 11 ? '' : 'btnNull' " @click="submit">发送验证码</view>
    <!--  -->
    <view class="tips mt30 flex">
      <image class="icon mr10" src="/@/static/loginSelect.png" v-if="!state.select" @click="state.select = true"></image>
      <image class="icon mr10" src="/@/static/selectIcon.png" @click="state.select = false" v-else></image>
      同意RITMOHUB <text class="" @click="openPupup(0)">《用户协议》</text>、<text class="" @click="openPupup(1)">《隐私政策》</text>
    </view>
  </view>
  <textPopup ref="textPopupRef" @refresh="textPopupRefresh"/>
  <!-- 选择 -->
  <u-select v-model="state.areaShow" :list="selectList"  label-name="value" value-name="value" @confirm="confirm"></u-select>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue'
import textPopup from '/@/components/textPopup.vue'
import { useI18n } from 'vue-i18n'
import { routerTo, showTips } from '/@/utils/currentFun'
import { selectList } from '/@/utils/universalArray'
import { onLoad } from '@dcloudio/uni-app'
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
});
// 参数
const state = reactive({
  phone: '', // 手机号
  intro: '', // 
  areaCode: '86', // 
  areaShow: false,
  select: false, // 
})
// 
const submit = () => {
  if( state.phone.length != 11 ) {
    return
  }
  if( !state.select ) {
    showTips('请同意协议')
    return
  }
  // console.log(111);
  routerTo(`/pages/login/inputCode?phone=${state.phone}&areaCode=${state.areaCode}`)
  
}
const confirm = (e: { value: string }[]) => {
  // console.log(e);
  state.areaCode = e[0].value
}
// 打开弹窗
const textPopupRef = ref()
const openPupup = (type: number) => {
  textPopupRef.value.openDialog(type)
}
const textPopupRefresh = (show: boolean) => {
  state.select = show
}
</script>

<style lang="scss" scoped>
.content {
  .title {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 62rpx;
    color: #232322;
  }
  .fub {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: #898784;
  }
  .btn {
    width: 100%;
    line-height: 88rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 32rpx;
    font-weight: 600;
    background-color: #FFCF00;
    margin-top: 80rpx;
  }
  .btnNull {
    opacity: 0.6;
  }
  .form {
    margin-top: 80rpx;
    // height: 32rpx;
    border-bottom: 1PX solid #D7D4CF;
    .sign {
      width: 100rpx;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 32rpx;
      border-right: 2rpx solid #D7D4CF;
      .icon {
        vertical-align: middle;
        margin-top: -5rpx;
      }
    }
    .uni-input {
      display: inline-block;
      height: 32rpx;
      min-height: 32rpx;
      line-height: 32rpx;
    }
  }
  .tips {
    font-weight: 400;
    width: 670rpx;
    font-size: 20rpx;
    line-height: 28rpx;
    color: #898784;
    text {
      color: #232322;
    }
    .icon {
      display: inline-block;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      margin-top: -6rpx;
    }
  }
}
</style>
