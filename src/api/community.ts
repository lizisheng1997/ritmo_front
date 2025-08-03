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
      url: '/api/community/communityPostDelt',
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


}
