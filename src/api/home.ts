import Request from '/@/utils/request';

export default class Home extends Request {
  constructor() {
    super();
  }
  // 获取我的机构列表
  getMyOrganizations(data: object) {
    return this.get({
      url: '/v1/organizations/my',
      data
    });
  }
  // 创建机构
  getAddOrganizations(data: object) {
    return this.get({
      url: '/v1/organizations',
      data
    });
  }
  // 获取机构详情
  getOrganizationsInfo(id: string) {
    return this.get({
      url: `/v1/organizations/id`,
    });
  }
  // 上传营业执照
  getUpdateLicenses(data: object) {
    return this.uploadFile({
      url: '/v1/uploads/licenses',
      data
    });
  }


}
