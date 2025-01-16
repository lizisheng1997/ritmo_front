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
}
