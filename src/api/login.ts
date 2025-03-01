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
}
