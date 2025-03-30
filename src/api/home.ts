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
    return this.post({
      url: '/v1/organizations',
      data
    });
  }
  // 获取机构详情
  getOrganizationsInfo(id: string) {
    return this.get({
      url: `/v1/organizations/${id}`,
    });
  }
  // 编辑机构
  getOrganizationsReapply(id: string, data: object) {
    return this.put({
      url: `/v1/organizations/${id}`,
      data
    });
  }
  // 上传营业执照
  getUpdateLicenses(data: object) {
    return this.uploadFile({
      url: '/v1/uploads/licenses',
      data
    });
  }
  // 切换机构
  getSwithOrganizations(id: string, type: number) {
    return this.post({
      url: `/v1/organizations/switch/${id}?type=${type}`,
    });
  }
  // 首页banner
  getCarousel() {
    return this.get({
      url: `/v1/homepage/carousel`,
    });
  }
  getSecondCarousel() {
    return this.get({
      url: `/v1/homepage/second-carousel`,
    });
  }
  getCarouselEn() {
    return this.get({
      url: `/v1/homepage/en/carousel`,
    });
  }
  getSecondCarouselEn() {
    return this.get({
      url: `/v1/homepage/en/second-carousel`,
    });
  }
  // 



}
