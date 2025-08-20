import Request from '/@/utils/request';

export default class Community extends Request {
  constructor() {
    super();
  }
  // 社区分类
  getCommunityCategory(data: object) {
    return this.get({
      url: '/api/community/communityCategory',
      data
    });
  }
  // 帖子列表
  getCommunityList(data: object) {
    return this.post({
      url: '/api/community/communityPostList',
      data
    });
  }
  // 创建帖子
  getCommunityListAdd(data: object) {
    return this.post({
      url: '/api/community/communityPost',
      data
    });
  }
  // 获取草稿帖子
  getCommunityPostDraft(data: object) {
    return this.post({
      url: '/api/community/getCommunityPostDraft',
      data
    });
  }
  // 获取帖子详情   
  getCommunityInfo(data: object) {
    return this.post({
      url: '/api/community/communityPostInfo',
      data
    });
  }
  // 删除帖子
  getCommunityPostDelt(data: object) {
    return this.post({
      url: '/api/community/communityPostDel',
      data
    });
  }
  // 获取帖子一级评论
  getCommunityCommentList(data: object) {
    return this.post({
      url: '/api/community/commentList',
      data
    });
  }
  // 评论
  getCommunityComment(data: object) {
    return this.post({
      url: '/api/community/comment',
      data
    });
  }
  // 查看子级评论
  getCommunityCommentChildList(data: object) {
    return this.post({
      url: '/api/community/commentChildList',
      data
    });
  }
  // 点赞/收藏
  getAddOrCannalLikeOrCollect(data: object) {
    return this.post({
      url: '/api/community/addOrCannalLikeOrCollect',
      data
    });
  }
  // 添加分享数
  getAddShareCount(data: object) {
    return this.post({
      url: '/api/community/addShareCount',
      data
    });
  }
  // 查看自己主页
  getCommunityProfiles(data: object) {
    return this.post({
      url: '/api/community/communityProfiles',
      data
    });
  }
  // 我收藏的帖子
  getMyCollectsList(data: object) {
    return this.post({
      url: '/api/community/myCollectsList',
      data
    });
  }
  // 查看别人页面
  getOneProfiles(data: object) {
    return this.post({
      url: '/api/community/getOneProfiles',
      data
    });
  }
  getOneProfilesPostList(data: object) {
    return this.post({
      url: '/api/community/getOneProfilesPostList',
      data
    });
  }
  // 我回复的
  getCommentBytype(data: object) {
    return this.post({
      url: '/api/community/commentBytype',
      data
    });
  }
  // 屏蔽用户
  getAddBlockedProfiles(data: object) {
    return this.post({
      url: '/api/community/addBlockedProfiles',
      data
    });
  }
  // 屏蔽列表
  getBlockedProfilesList(data: object) {
    return this.post({
      url: '/api/community/getBlockedProfilesList',
      data
    });
  }
  // 解除屏蔽
  getDelBlockedProfiles(data: object) {
    return this.post({
      url: '/api/community/delBlockedProfiles',
      data
    });
  }

  // 门店列表
  getStoreTitleList(data: object) {
    return this.post({
      url: '/api/community/getStoreTitleList',
      data
    });
  }





}
