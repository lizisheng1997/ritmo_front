<template>
  <view
    class="share"
    v-if="state.show">
    <view class="mask"></view>
    <!--  -->
    <view class="card p15">
      <canvas
        canvas-id="myCanvas"
        type="2d"
        id="myCanvas"
        class="cansStyle"
        style="width: 310rpx; height: 500rpx;" />
    </view>
    <view class="footer p35-0">
      <view class="rows flex">
        <view class="item">
          <image
            class="icon"
            src="/@/static/community/poster.png"></image>
          <view class="text">保存海报</view>
        </view>
        <view class="item">
          <image
            class="icon"
            src="/@/static/community/wechat.png"></image>
          <view class="text">微信</view>
        </view>
        <!-- <view class="item">
          <image class="icon" src="/@/static/community/weibo.png"></image>
          <view class="text">微博</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/community/link.png"></image>
          <view class="text">复制链接</view>
        </view>
        <view class="item">
          <image class="icon" src="/@/static/community/share1.png"></image>
          <view class="text">分享</view>
        </view> -->
      </view>
      <view class="close mt30 pt20">
        <text
          class=""
          @click="close"
          >关闭</text
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Community from '/@/api/community';
const communityApi = new Community();
const { t } = useI18n();

onMounted(() => {});
// 参数
const state = reactive({
  show: false, //
  id: '',
  title: '',
  content: '',
  avatar: '',
  images: ''
});
const openDialog = (id: string) => {
  state.id = id;
  state.show = true;
  setTimeout(() => {
        canvasInit();
      }, 500);
};
const getInfo = async () => {
  await communityApi
    .getCommunityInfo({
      post_id: state.id
    })
    .then((res: any) => {
      console.log(res.data);
      state.title = res.data.title;
      state.content = res.data.content;
      state.avatar = res.data.avatar;
      state.images = res.data.imagesArr[0];
      setTimeout(() => {
        canvasInit();
      }, 1000);
    });
};
defineExpose({ openDialog });
const canvasInit = () => {
  const ctx = uni.createCanvasContext('myCanvas');
  ctx.setFillStyle('#4a90e2');
  ctx.setStrokeStyle('#333');
  ctx.setLineWidth(2);
  ctx.fillRect(0, 0, 300, 395); // 使用px单位尺寸
  ctx.draw();
  console.log(ctx);
  
};
// 初始化canvas
const canvasInit1 = () => {
  uni
    .createSelectorQuery()
    .select('#myCanvas')
    .fields({ node: true, size: true })
    .exec((res) => {
      // console.log(res);
      let canvas = res[0].node;
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white'; // 设置样式
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 绘制banner图
      let bannerImg = new Image();
      bannerImg.src = state.images;
      bannerImg.onload = () => {
        ctx.drawImage(bannerImg, 0, 0, canvas.width, 235);
        // 绘制昵称
        ctx.font = '20px Microsoft YaHei';
        ctx.fillStyle = 'black';
        ctx.fillText('Luxus', 70, 253);
        // 绘制简介
        ctx.font = '12px Microsoft YaHei';
        ctx.fillStyle = 'black';
        let text = state.title;
        let y = 283;
        let words = text.split(''); // 将文本拆分为单个字符数组
        let line = '';
        let lineHeight = 20; // 行高
        // console.log(words);
        for (var i = 0; i < words.length; i++) {
          let word = words[i];
          let width = ctx.measureText(line + word).width;
          if (width > 270) {
            ctx.fillText(line, 10, y);
            line = word;
            y += lineHeight;
          } else {
            line += word;
          }
        }
        // 绘制剩余的行
        if (line) {
          ctx.fillText(line, 10, y);
        }
        // 绘制二维码
        // let codeImg = new Image();
        // codeImg.src = 'https://ritmohub.cn/static/loginBg.png'
        // ctx.beginPath();
        // ctx.drawImage(codeImg, 240, 330, 65, 65)
        // 绘制公司名称
        ctx.font = '16px Microsoft YaHei';
        ctx.fillStyle = 'black';
        ctx.fillText('Ritmohub', 75, 370);
        // 绘制公司logo
        let logoImg = new Image();
        logoImg.src = 'https://ritmohub.cn/static/loginBg.png';
        ctx.beginPath();
        ctx.drawImage(logoImg, 10, 340, 50, 50);
        // 绘制头像
        let headImg = new Image();
        headImg.src = state.avatar;
        ctx.beginPath();
        ctx.arc(35, 235, 25, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.closePath(); //关闭一个路径
        ctx.drawImage(headImg, 10, 210, 50, 50);
      };
    });
};
const close = () => {
  uni
    .createSelectorQuery()
    .select('#myCanvas')
    //@ts-ignore
    .fields({ node: true, size: true })
    .exec((res) => {
      let canvas = res[0].node;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.show = false;
    });
};
</script>

<style lang="scss" scoped>
.share {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #808080;
    opacity: 0.5;
  }
  .card {
    position: absolute;
    left: 60rpx;
    top: 200rpx;
    width: 630rpx;
    height: 820rpx;
    border-radius: 20rpx;
    background-color: #ffffff;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    border-radius: 25rpx 25rpx 0 0;
    .rows {
      .item {
        flex: 1;
        text-align: center;
        .icon {
          display: inline-block;
          width: 80rpx;
          height: 80rpx;
        }
        .text {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 32rpx;
          text-align: center;
          color: #232322;
        }
      }
    }
    .close {
      border-top: 1px solid #f5f3ef;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      text-align: center;
      color: #232322;
    }
  }
}
</style>
