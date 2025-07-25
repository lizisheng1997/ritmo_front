import Request from '/@/utils/request';

export default class Community extends Request {
  constructor() {
    super();
  }
  // 帖子列表
  getCommunityList(data: object) {
    return this.get({
      url: '/v1/community/posts',
      data
    });
  }
  // 创建帖子
  getCommunityListAdd(data: object) {
    return this.post({
      url: '/v1/community/posts',
      data
    });
  }
  // 更新帖子
  getCommunityListPut(id: string, data: object) {
    return this.put({
      url: `/v1/community/posts/${id}`,
      data
    });
  }
  // 帖子详情
  getCommunityListInfo(id: string) {
    return this.get({
      url: `/v1/community/posts/${id}`,
    });
  }


}
