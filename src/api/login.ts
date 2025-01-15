import Request from '/@/utils/request';

export default class Login extends Request {
  constructor() {
    super();
  }
  // 判断用户是否授权
  async clientAuthorization(data: object) {
    return await this.get({
      url: 'scrm/material/mobile/clientAuthorization',
      data
    });
  }
}
