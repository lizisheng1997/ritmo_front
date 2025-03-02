import Request from '/@/utils/request';

export default class Login extends Request {
  constructor() {
    super();
  }
  // 发送验证码
  sendCoded(data: object) {
    return this.post({
      url: '/v1/auth/send-code',
      data
    });
  }
  // 登录
  getLogin(data: object) {
    return this.post({
      url: '/v1/auth/login',
      data
    });
  }
  // 刷新token
  getAuthRefresh(data: object) {
    return this.post({
      url: '/v1/auth/refresh',
      data
    });
  }
  // 获取认证信息
  getAuthUser() {
    return this.get({
      url: '/v1/auth/me'
    });
  }
  // 退出登录
  getLogout(data: object) {
    return this.post({
      url: '/v1/auth/logout',
      data
    });
  }
  // 获取删除账号状态
  getDeactivateStatus() {
    return this.get({
      url: '/v1/users/deactivate/status'
    });
  }
  // 注销账号前置
  getDeactivate(data: object) {
    return this.post({
      url: '/v1/users/deactivate',
      data
    });
  }
  getDeactivateCancel(data: object) {
    return this.post({
      url: '/v1/users/deactivate/cancel',
      data
    });
  }


}
