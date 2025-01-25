<template>
  <view class="content p35">
    <!--  -->
    <view class="form">
      <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>成员名称
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.nickname" placeholder="请输入成员名称" />
      </view>
      <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>手机号
        </view>
        <input class="uni-input ml25" maxlength="11" v-model="state.phone" placeholder="请输入手机号" />
      </view>
      <!-- <view class="item flex pb35 mt35">
        <view class="text">
          <text class="">*</text>邮箱
        </view>
        <input class="uni-input ml25" maxlength="5" v-model="state.phone" placeholder="请输入邮箱" />
      </view> -->
    </view>
    <!--  -->
    <view class="footerOne" v-if="state.id" @click="submit(2)" :class=" state.nickname && state.phone ? '' : 'btnNull' ">
      保存
    </view>
    <view class="footerTwo flex" v-else>
      <view class="btn btn1" @click="submit(0)" :class=" state.nickname && state.phone ? '' : 'btnNull' ">新增完成</view>
      <view class="btn btn2" @click="submit(1)" :class=" state.nickname && state.phone ? '' : 'btnNull' ">完成并继续新增 </view>
    </view>
    <!--  -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import User from '/@/api/user';
import { routerBack, showTips } from '/@/utils/currentFun';
const userApi = new User();
const { t } = useI18n()

onLoad((query?: AnyObject | undefined): void => {
  // console.log(query);
  uni.setNavigationBarTitle({
    title: query!.id == '1' ? '编辑成员' : '新增成员'
  });
  state.oid = query!.oid
  state.id = query!.id ? query!.id : ''
  if(state.id) {
    state.nickname = query!.nickname
    state.phone = query!.phone
  }
});
// 参数
const state = reactive({
  oid: '', // 机构id
  id: '',
  nickname: '',
  phone: '', // 手机号
})

// 0新增1继续新增2修改
const submit = (type: number) => {
  if( !state.nickname || !state.phone ) {
    showTips('请填写资料')
    return
  }
  if( type == 2 ) {
    userApi.getOrganizationsMembersEdit( state.oid, state.id, {
      nickname: state.nickname,
      phone: state.phone,
      role: 0
    } ).then((res: any) => {
      showTips(res.message)
      setTimeout(() => {
        routerBack(1)
      }, 1000);
    })
  } else {
    userApi.getOrganizationsMembersAdd( state.oid, {
      nickname: state.nickname,
      phone: state.phone,
    } ).then((res: any) => {
      showTips(res.message)
      setTimeout(() => {
        if( type == 0 ) {
          routerBack(1)
        } else {
          state.nickname = ''
          state.phone = ''
        }
      }, 1000);
      
    })
  }
}
</script>

<style >
page {
  background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.content {
  .form {
    margin-top: 40rpx;
    // height: 32rpx;
    .item {
      border-bottom: 1PX solid #D7D4CF;
      .text {
        color: #232322;
        width: 125rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;
        text {
          color: #FF3434;
        }
      }
      .uni-input {
        display: inline-block;
        width: calc( 100% - 190rpx );
        height: 36rpx;
        min-height: 36rpx;
        line-height: 36rpx;
      }
    }
  }
  .footerOne, .footerTwo {
    margin-top: 80rpx;
  }
  .btnNull {
    opacity: 0.6;
  }
}
</style>
