import Request from '/@/utils/request';

export default class User extends Request {
  constructor() {
    super();
  }
  // 获取用户信息
  getUserInfo(data: object) {
    return this.post({
      url: '/v1/users/me',
      data
    });
  }
  // 更新用户信息
  getUpdateUser(data: object) {
    return this.put({
      url: '/v1/users/me',
      data
    });
  }
}
