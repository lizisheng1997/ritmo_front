import Request from '/@/utils/request';

export default class Home extends Request {
  constructor() {
    super();
  }
  sendCoded(data: object) {
    return this.post({
      url: '/v1/auth/send-code',
      data
    });
  }
}
