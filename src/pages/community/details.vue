<template>
  <view
    class="content"
    :style="{ paddingTop: state.navAllHeight + 'rpx' }">
    <view
      class="nav flex"
      :style="{ paddingTop: state.navAllHeight + 'rpx' }">
      <image
        class="icon"
        src="/@/static/iconLeftBlack.png"
        @click="routerBack(1)"></image>
      <image
        class="head mr25 mt10"
        :src="
          state.avatar ? state.avatar : '../../static/community/headimg.png'
        "></image>
      <text class="name">{{ state.nickname }}</text>
    </view>
    <!--  -->
    <image
      class="delete"
      src="/@/static/community/delete.png"
      v-if="state.isUser"
      @click="
        () => {
          operatePopupRef.openDialog(t('deletearticle'), {
            id: '',
            type: 1
          });
        }
      "></image>
    <swiper
      class="swiper"
      circular
      indicator-dots
      autoplay
      v-if="state.imagesArr?.length">
      <swiper-item
        v-for="(item, index) in state.imagesArr"
        :key="index"
        style="display: flex; justify-content: center; align-items: center">
        <image :src="item"></image>
      </swiper-item>
    </swiper>
    <!--  -->
    <view
      class=""
      style="padding: 35rpx 35rpx 180rpx">
      <view class="article pb35">
        <view class="title">{{ state.title }}</view>
        <view class="news mt20">
          {{ state.content }}
        </view>
        <view
          class="mt20"
          style="display: flex; justify-content: space-between">
          <view class="date">#{{ state.category }}#</view>
          <view class="date">{{ state.createtime }} {{ state.city }}</view>
        </view>
      </view>
      <!--  -->
      <view
        class="comment"
        v-if="state.commentList?.length">
        <view class="title mt25">评论</view>
        <view class="list">
          <view
            class="li m35-0"
            v-for="(item, index) in state.commentList"
            :key="item.id">
            <view class="review flex">
              <image
                class="head mr15"
                :src="
                  item.avatar
                    ? item.avatar
                    : '../../static/community/headimg.png'
                "></image>
              <view class="info">
                <view class="name"
                  >{{ item.nickname }}
                  <text
                    class="nameCard"
                    v-if="state.isUser"
                    >{{ t('author') }}</text
                  >
                </view>
                <view class="fub mt10">
                  <view class="">{{ item.content }}</view>
                  <view class="">
                    <text
                      class="date"
                      style="color: #898784"
                      >{{ item.createtime_text }}
                    </text>
                    <text
                      class="ml10"
                      style="color: #409eff"
                      @click="
                        () => {
                          addCommentRef.openDialog(
                            state.id,
                            index,
                            item.id,
                            `${t('reply')}@${item.nickname}`
                          );
                        }
                      "
                      >{{ t('reply') }}</text
                    >
                  </view>
                </view>
                <view class="collect">
                  <image
                    class="icon"
                    :src="
                      item.is_like
                        ? '../../static/community/collect1.png'
                        : '../../static/community/collect.png'
                    "
                    @click="
                      getLikeOrCollect(index, 'comment', 'like', item.id)
                    "></image>
                  <view class="count">{{ item.like_count }}</view>
                </view>
              </view>
            </view>
            <!--  -->
            <view
              class="card p15 ml65 mt25"
              v-if="item.child?.length">
              <u-read-more
                show-height="250"
                toggle
                text-indent="0"
                :shadow-style="{
                  backgroundImage: 'none',
                  background: 'transparent'
                }"
                close-text="展开所有评论"
                open-text="收起所有评论"
                color="#000000">
                <view
                  class="review flex mb35"
                  v-for="(s, i) in item.child"
                  :key="s.id">
                  <image
                    class="head"
                    :src="
                      item.avatar
                        ? item.avatar
                        : '../../static/community/headimg.png'
                    "></image>
                  <view
                    class="info"
                    style="width: calc(100% - 88rpx)">
                    <view
                      class="name"
                      style="color: #898784; font-size: 24rpx">
                      {{ s.nickname }}
                      <text
                        class="nameCard"
                        v-if="state.isUser"
                        >{{ t('author') }}</text
                      >
                    </view>
                    <view class="fub mt10">
                      <view class="">
                        <text class="">回复</text>
                        <text
                          class=""
                          style="
                            margin: 0 10rpx;
                            font-weight: 500;
                            font-size: 24rpx;
                            color: #898784;
                          "
                          >{{ s.parent_nickname }}:</text
                        >
                        {{ s.content }}
                      </view>
                      <view class="">
                        <text
                          class="date"
                          style="color: #898784"
                          >{{ s.createtime_text }}
                        </text>
                        <text
                          class="ml10"
                          style="color: #409eff"
                          @click="
                            () => {
                              addCommentRef.openDialog(
                                state.id,
                                index,
                                s.id,
                                `${t('reply')}@${s.nickname}`
                              );
                            }
                          ">
                          {{ t('reply') }}
                        </text>
                      </view>
                    </view>
                    <view class="collect">
                      <image
                        class="icon"
                        :src="
                          s.is_like
                            ? '../../static/community/collect1.png'
                            : '../../static/community/collect.png'
                        "
                        @click="
                          getLikeOrCollect(index, 'comment', 'like', s.id)
                        "></image>
                      <view class="count">{{ s.like_count }}</view>
                    </view>
                  </view>
                </view>
              </u-read-more>
            </view>
            <!--  -->
          </view>
          <!--  -->
        </view>
      </view>
      <u-empty
        :text="t('null')"
        mode="favor"
        v-if="!state.commentList?.length"
        margin-top="60"></u-empty>
    </view>
    <!--  -->
    <view class="commentF flex">
      <input
        class="input ml35"
        v-model="state.cdisabled"
        :placeholder="`  ${t('Saysomething')}...`"
        disabled
        @click="commentClick(-1)" />
      <view class="tag">
        <image
          class="icon"
          :src="
            state.isLike
              ? '../../static/community/collect1.png'
              : '../../static/community/collect.png'
          "
          @click="getLikeOrCollect(-1, 'post', 'like')"></image>
        <view class="text">{{ state.likeCount }}</view>
      </view>
      <view class="tag">
        <image
          class="icon"
          :src="
            state.isCollect
              ? '../../static/community/starAct.png'
              : '../../static/community/star.png'
          "
          @click="getLikeOrCollect(-1, 'post', 'collect')"></image>
        <view class="text">{{ state.collectCount }}</view>
      </view>
      <view
        class="tag"
        @click="openShow">
        <image
          class="icon"
          src="/@/static/community/share.png"></image>
        <view class="text">{{ state.shareCount }}</view>
      </view>
    </view>
    <!-- 分享 -->
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
          style="width: 300px; height: 375px;" />
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
        </view>
        <view class="close mt30 pt20">
          <text
            class=""
            @click="shareClose"
            >关闭</text
          >
        </view>
      </view>
    </view>
    <!-- 删除文章 -->
    <operatePopup
      ref="operatePopupRef"
      :isType="1"
      @refresh="
        (show, idx) => {
          if (show) {
            deleteArticle();
          }
        }
      "></operatePopup>
    <!-- 添加评论 -->
    <addComment
      ref="addCommentRef"
      @refresh="
        (idx) => {
          if (idx == -1) {
            getCommunityCommentList();
          } else {
            getCommunityCommentChildList(idx);
          }
        }
      " />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import share from './share.vue';
import operatePopup from '/@/components/operatePopup.vue';
import addComment from '/@/components/addComment.vue';
import { useI18n } from 'vue-i18n';
import { routerBack, showTips } from '/@/utils/currentFun';
import Community from '/@/api/community';
const communityApi = new Community();
const { t } = useI18n();

onLoad((query?: AnyObject | undefined): void => {
  state.id = query!.id;
  // @ts-ignore
  state.navAllHeight = getApp().globalData.navAllHeight + 88;

  getInfo();
});
// 参数
const state = reactive({
  type: 0, //
  navAllHeight: 0,
  id: '',
  userId: '',
  isUser: 0,
  imagesArr: [] as string[],
  nickname: '',
  avatar: '',
  title: '',
  content: '',
  city: '',
  createtime: '',
  category: '',
  isCollect: 0, // 是否收藏
  collectCount: 0, //
  isLike: 0, // 是否点赞
  likeCount: 0, //
  shareCount: 0, // 转发量
  commentList: [] as any[], // 评论列表
  cdisabled: '',
  show: false
});
const operatePopupRef = ref();
const shareRef = ref();
const getInfo = async () => {
  await communityApi
    .getCommunityInfo({
      post_id: state.id
    })
    .then((res: any) => {
      // console.log(res.data);
      state.avatar = res.data.avatar;
      state.nickname = res.data.nickname;
      state.imagesArr = res.data.imagesArr;
      state.title = res.data.title;
      state.content = res.data.content;
      state.city = res.data.city;
      state.userId = res.data.user_id;

      state.isUser =
        uni.getStorageSync('userInfos').id == res.data.user_id ? 1 : 0;
      state.isCollect = res.data.is_collect;
      state.collectCount = res.data.collect_count;
      state.isLike = res.data.is_like;
      state.likeCount = res.data.like_count;
      state.shareCount = res.data.share_count;
      state.createtime = res.data.createtime_text;
      state.category = res.data.category_name;
      getCommunityCommentList();
    });
};
// 获取帖子的一级评论
const getCommunityCommentList = async () => {
  await communityApi
    .getCommunityCommentList({
      post_id: state.id,
      user_id: state.userId,
      page: 1,
      limit: 999
    })
    .then((res: any) => {
      state.commentList = res.data.map((item: { child: any[] }) => {
        item['child'] = [];
        return item;
      });
      if (state.commentList?.length) {
        for (let i in state.commentList) {
          getCommunityCommentChildList(Number(i));
        }
      }
      console.log('一级', state.commentList);
    });
};
// 根据评论获取子级评论
const getCommunityCommentChildList = async (idx: number) => {
  await communityApi
    .getCommunityCommentChildList({
      post_id: state.id,
      comment_id: state.commentList[idx].id,
      page: 1,
      limit: 999
    })
    .then((res: any) => {
      console.log('二级', res.data);
      state.commentList[idx].child = res.data;
    });
};
// 删除文章
const deleteArticle = () => {
  communityApi
    .getCommunityPostDelt({
      post_id: state.id
    })
    .then((res: any) => {
      showTips(res.msg);
      setTimeout(() => {
        routerBack(1);
      }, 1000);
    });
};
//
const addCommentRef = ref();
// idx -1 刷新一级分类  反之刷新二级
const commentClick = (idx: number) => {
  // console.log(123);
  addCommentRef.value.openDialog(state.id, idx);
};
// 点赞/收藏
/**
 *  status post帖子 comment评论 为comment时 comment_id 必填
 *  like_status like点赞,collect收藏
 */
const getLikeOrCollect = (
  idx: number,
  status: string,
  likeStatus: string,
  commentId?: string
) => {
  communityApi
    .getAddOrCannalLikeOrCollect({
      post_id: state.id,
      comment_id: status == 'comment' ? commentId : '',
      status,
      like_status: likeStatus
    })
    .then((res: any) => {
      showTips(res.msg);
      if (idx == -1) {
        getInfo();
      } else {
        getCommunityCommentChildList(idx);
      }
    });
};


// canvas相关
const ctx = ref()
const openShow = () => {
  state.show = true
  setTimeout(() => {
    canvasInit()
  }, 500);
}
const canvasInit = () => {
  uni
    .createSelectorQuery()
    .select('#myCanvas')
    // @ts-ignore
    .fields({ node: true, size: true })
    .exec((res) => {
      if( !res ) {
        showTips('绘制异常')
        return
      }
      // console.log(res[0]);
      uni.showLoading({
        title: '绘制中...'
      });
      let canvas = res[0].node;
      ctx.value = canvas.getContext('2d');
      // 适配高清屏幕
      let dpr = 1;
      dpr = uni.getWindowInfo().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      let canvasW = canvas.width;
      let canvasH = canvas.height;
      console.log(canvasW);
      console.log(canvasH);
      
      
      
      // 清除画布
      ctx.value.clearRect(0, 0, canvasW, canvasH)
      // 设置填充颜色为红色
      ctx.value.fillStyle = '#ffffff';
      // 填充一个矩形来作为背景
      ctx.value.fillRect(0, 0, canvasW, canvasH);
      // 绘制banner图
      uni.downloadFile({
        url: 'https://ritmohub.cn/static/loginBg.png',
        success: function(res) {
          // console.log(res.tempFilePath);
          const img = canvas.createImage()
          img.src = res.tempFilePath
          img.onload = () => {
            ctx.value.drawImage(img, 0, 0, canvasW, canvasH * 0.66)
            // 绘制昵称
            ctx.value.font = '40px Microsoft YaHei';
            ctx.value.fillStyle = 'black';
            ctx.value.fillText(state.nickname, 60 * dpr, 251*dpr);
            ctx.value.save();
            // 绘制头像
            uni.downloadFile({
              url: state.avatar,
              success: function(res1) {
                // console.log(res1.tempFilePath);
                const img1 = canvas.createImage()
                img1.src = res1.tempFilePath
                img1.onload = () => {
                  ctx.value.save();
                  ctx.value.beginPath();
                  
                  ctx.value.arc(30 * dpr, 245 * dpr, 20 * dpr, 0, 2 * Math.PI)
                  ctx.value.closePath();
                  ctx.value.clip();
                  // 计算图片绘制位置（使图片中心对准圆心）
                  ctx.value.drawImage(img1, 10 * dpr, 225 * dpr, 60 * dpr, 60 * dpr); 
                  ctx.value.stroke()
                  ctx.value.restore();
                  uni.hideLoading();
                }
              }, fail(result) {
                  uni.hideLoading();
              },
            });
          }
        }, fail(result) {
                  uni.hideLoading();
              },
      });

      // 绘制简介
      ctx.value.font = '40px Microsoft YaHei';
      ctx.value.fillStyle = 'black';
      let text = state.title;
      let y = 285 * dpr;
      let words = text.split(''); // 将文本拆分为单个字符数组
      let line = '';
      let lineHeight = 20; // 行高
      // console.log(words);
      for (var i = 0; i < words.length; i++) {
        let word = words[i];
        let width = ctx.value.measureText(line + word).width;
        if (width > 270) {
          ctx.value.fillText(line, 15 * dpr, y);
          line = word;
          y += lineHeight;
        } else {
          line += word;
        }
      }
      // 绘制剩余的行
      if (line) {
        ctx.value.fillText(line, 15 * dpr, y);
      }
      // 绘制公司logo
      const img2 = canvas.createImage()
      img2.src = '../../static/logo1.png'
      img2.onload = () => {
        ctx.value.drawImage(img2, 20, 315 * dpr, 40* dpr, 40* dpr)
      }
      // 绘制公司名称
      ctx.value.font = '38px Microsoft YaHei';
      ctx.value.fillStyle = 'black';
      ctx.value.fillText('Ritmohub', 55 * dpr, canvasH * 0.92);

    })
  
};
const shareClose = () => {
  ctx.value.clearRect(10, 10, 150, 75)
  setTimeout(() => {
    state.show = false 
  });
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #ffffff;
  .nav {
    position: fixed;
    left: 0;
    top: 0;
    // height: 88rpx;
    line-height: 88rpx;
    z-index: 99999;
    width: 100%;
    background-color: #ffffff;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
      vertical-align: middle;
      margin: 20rpx 35rpx 0 0;
    }
    .head {
      display: inline-block;
      width: 64rpx;
      height: 64rpx;
      border-radius: 64rpx;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      font-size: 32rpx;
      font-weight: 600;
      color: #232322;
    }
  }
  .delete {
    position: fixed;
    right: 35rpx;
    top: 200rpx;
    z-index: 99999;
    display: inline-block;
    width: 50rpx;
    height: 50rpx;
  }
  .swiper {
    height: 740rpx;
    position: relative;
    .uni-swiper-wrapper {
      .uni-swiper-slides {
        width: 100%;
        height: 100%;
      }
    }
  }
  .article {
    border-bottom: 1px solid #f5f3ef;
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      color: #232322;
    }
    .news {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #232322;
    }
    .date {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #898784;
    }
  }
  .comment {
    .title {
      font-size: 32rpx;
      font-weight: 600;
      line-height: 40rpx;
      color: #232322;
    }
    .list {
      .li {
        .review {
          .head {
            display: inline-block;
            width: 64rpx;
            height: 64rpx;
            border-radius: 64rpx;
            margin-right: 10rpx;
          }
          .info {
            width: calc(100% - 98rpx);
            position: relative;
            .collect {
              text-align: center;
              position: absolute;
              right: 0;
              top: 0;
              .icon {
                display: inline-block;
                width: 40rpx;
                height: 40rpx;
              }
              .count {
                font-size: 20rpx;
                font-weight: 400;
                line-height: 1;
                color: #898784;
              }
            }
            .name {
              font-size: 32rpx;
              font-weight: 600;
              line-height: 40rpx;
              color: #232322;
            }
            .fub {
              width: calc(100% - 200rpx);
              font-size: 24rpx;
              font-weight: 400;
              line-height: 40rpx;
              color: #232322;
            }
          }
        }
        .card {
          border-radius: 10rpx;
          background-color: #f5f3ef;
          .review {
            &:last-child {
              margin-bottom: 0 !important;
            }
          }
        }
      }
    }
  }
}
.commentF {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 160rpx;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0px #00000026;
  padding-top: 35rpx;
  .input {
    display: inline-block;
    width: calc(100% - 360rpx);
    background-color: #f5f3ef;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 6rpx;
  }
  .tag {
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    .icon {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
    }
    .text {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 30rpx;
      color: #232322;
    }
  }
}
.nameCard {
  display: inline-block;
  background-color: #d7d4cf !important;
  width: 55rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 4rpx;
  color: #898784;
  font-weight: 500;
  font-style: Medium;
  font-size: 20rpx;
  margin-left: 10rpx;
}
// 
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
    left: 75rpx;
    top: 280rpx;
    width: 606rpx;
    height: 770rpx;
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
