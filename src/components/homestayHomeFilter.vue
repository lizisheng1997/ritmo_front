<template>
  <u-popup
    v-model="state.isShow"
    mode="bottom"
    border-radius="20"
    width="630"
    :mask-close-able="false">
    <view class="popup p35">
      <view class="title">
        {{ t('Pleaseselect') }}{{ t('peoplebedsbedrooms') }}
      </view>
      <view class="form">
        <view
          class="item mt25"
          v-if="props.isPrice">
          <view class="tagName"> 价格区间 </view>
          <view
            class="tags mt15"
            v-if="state.isShow">
            <kw-slider
              barHeight="5"
              showLabel
              v-model="state.price"
              :values="state.price"
              :min="0"
              :max="5000"
              activeColor="#FFCF00"
              blockColor="#FFCF00"></kw-slider>
          </view>
        </view>
        <view class="item mt25">
          <view class="tagName"> 床数 </view>
          <view class="tags mt15">
            <text
              class="tag"
              :class="item == state.beds ? 'tagAct' : ''"
              v-for="item in state.list"
              :key="item"
              @click="state.beds = item"
              >{{ item }}床</text
            >
            <view class="input">
              <u-input
                v-model="state.bedsIpt"
                type="number"
                border
                placeholder="自定义"
                :height="45"
                @focus="state.beds = 0" />
            </view>
          </view>
        </view>
        <view class="item mt25">
          <view class="tagName"> 居室数 </view>
          <view class="tags mt15">
            <text
              class="tag"
              :class="item == state.house ? 'tagAct' : ''"
              v-for="item in state.list"
              :key="item"
              @click="state.house = item"
              >{{ item }}室</text
            >
            <view class="input">
              <u-input
                v-model="state.houseIpt"
                type="number"
                border
                placeholder="自定义"
                :height="45"
                @focus="state.house = 0" />
            </view>
          </view>
        </view>
        <view class="item mt25">
          <view class="tagName"> 人数 </view>
          <view class="tags mt15">
            <text
              class="tag"
              :class="item == state.nums ? 'tagAct' : ''"
              v-for="item in state.list"
              :key="item"
              @click="state.nums = item"
              >{{ item }}人</text
            >
            <view class="input">
              <u-input
                v-model="state.numsIpt"
                type="number"
                border
                placeholder="自定义"
                :height="45"
                @focus="state.nums = 0" />
            </view>
          </view>
        </view>
      </view>
      <view class="footerTwo flex">
        <view
          class="btn btn1"
          @click="sumbit(0)"
          >{{ t('clear') }}</view
        >
        <view
          class="btn btn2"
          @click="sumbit(1)">
          {{ t('confirm') }}</view
        >
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Homestay from '/@/api/homestay';
import kwSlider from '/@/uni_modules/kw-slider/components/kw-slider/kw-slider.vue';
import { showTips } from '../utils/currentFun';
const homestayApi = new Homestay();
const { t } = useI18n();

const props = defineProps({
  // 是否需要价格区间
  isPrice: {
    type: Number,
    default: () => 0
  }
});
// 参数
const state = reactive({
  list: [1, 2, 3, 4, 5],
  num: '',
  price: [0, 5000], // 价格区间
  beds: 0, // 床数
  bedsIpt: '',
  house: 0, // 房型
  houseIpt: '',
  nums: 0, // 人数
  numsIpt: '',
  isShow: false //
});
// 打开弹窗
const openDialog = (rows: {
  beds: number;
  house: number;
  nums: number;
  price: any[];
}) => {
  // console.log(rows)
  if (props.isPrice) {
    state.price = rows.price ? rows.price : [0, 5000];
  }
  state.beds = rows.beds <= 5 ? rows.beds : 0;
  state.bedsIpt = rows.beds > 5 ? rows.beds.toString() : '';
  state.house = rows.house <= 5 ? rows.house : 0;
  state.houseIpt = rows.house > 5 ? rows.house.toString() : '';
  state.nums = rows.nums <= 5 ? rows.nums : 0;
  state.numsIpt = rows.nums > 5 ? rows.nums.toString() : '';
  state.isShow = true;
};
defineExpose({ openDialog });
const emit = defineEmits(['refresh']);
const sumbit = (type: number) => {
  // 区间判断
  if (type) {
    const reg = /^\d+(\.\d+)?$/;
    if (state.bedsIpt && !reg.test(state.bedsIpt)) {
      showTips('床数请输入数字');
      return;
    }
    if (state.houseIpt && !reg.test(state.houseIpt)) {
      showTips('居室请输入数字');
      return;
    }

    if (state.numsIpt && !reg.test(state.numsIpt)) {
      showTips('人数请输入数字');
      return;
    }
  }

  state.price = type ? state.price : [0, 5000];
  state.beds = type ? (state.bedsIpt ? Number(state.bedsIpt) : state.beds) : 0;
  state.house = type
    ? state.houseIpt
      ? Number(state.houseIpt)
      : state.house
    : 0;
  state.nums = type ? (state.numsIpt ? Number(state.numsIpt) : state.nums) : 0;
  emit('refresh', {
    price: state.price,
    beds: state.beds,
    house: state.house,
    nums: state.nums
  });
  state.isShow = false;
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44rpx;
  color: #232322;
  text-align: center;
}
.form {
  .item {
    .tags {
      .tag {
        display: inline-block;
        line-height: 45rpx;
        padding: 0 25rpx;
        border: 1px solid transparent;
        background-color: #f1f1f1;
        margin-right: 15rpx;
        font-size: 24rpx;
        border-radius: 8rpx;
      }
      .tagAct {
        background-color: #fcf8ec !important;
        border-color: #ffcf00 !important;
      }
      .input {
        display: inline-block;
        width: 140rpx;
      }
    }
  }
}

.textAsh {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 44rpx;
  color: #898784;
}
.footerTwo {
  margin: 80rpx 0 40rpx 0;
}
</style>
