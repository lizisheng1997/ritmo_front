import Request from '/@/utils/request';

export default class User extends Request {
  constructor() {
    super();
  }
  // 获取用户信息
  getUserInfo(data: object) {
    return this.get({
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

  // 更新人脸
  getUpdateUserFace(data: object) {
    return this.uploadFile({
      url: '/v1/users/face',
      data
    });
  }
  // 上传头像
  getUpdateUserAvatar(data: object) {
    return this.uploadFile({
      url: '/v1/users/avatar',
      data
    });
  }
  // 隐私协议
  getAgreementsPrivacy() {
    return this.get({
      url: `/v1/agreements/privacy`,
    });
  }
  // 用户协议
  getAgreementsTerms() {
    return this.get({
      url: `/v1/agreements/terms`,
    });
  }
}
