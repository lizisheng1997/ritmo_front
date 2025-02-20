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
  // 
  getAgreementsRecharge() {
    return this.get({
      url: '/v1/agreements/recharge',
    });
  }
  // 创建会员订单
  getOrdersAdd(data: object) {
    return this.post({
      url: `/v1/vip/orders`,
      data
    });
  }
  // 支付会员订单
  getVipOrdersPay(id: string, code: string) {
    return this.post({
      url: `/v1/vip/orders/${id}/pay?code=${code}`
    });
  }
  // 获取机构成员列表
  getOrganizationsMembers(id: string) {
    return this.get({
      url: `/v1/organizations/${id}/members`,
    });
  }
  // 删除机构成员
  getOrganizationsMembersDel(id: string, mid: string) {
    return this.delete({
      url: `/v1/organizations/${id}/members/${mid}`,
    });
  }
  // 修改成员信息
  getOrganizationsMembersEdit(id: string, mid: string, data: object) {
    return this.put({
      url: `/v1/organizations/${id}/members/${mid}`,
      data
    });
  }
  // 新增成员信息
  getOrganizationsMembersAdd(id: string, data: object) {
    return this.post({
      url: `/v1/organizations/${id}/members`,
      data
    });
  }
  // 生成扩容订单
  getOrganizationsMembersExpand(id: string, data: object) {
    return this.post({
      url: `/v1/organizations/${id}/expansion`,
      data
    });
  }
  // 支付扩容订单
  getOrganizationsMembersPay(id: string, orderId: string, code: string) {
    return this.post({
      url: `/v1/organizations/${id}/expansion/${orderId}/pay?code=${code}`
    });
  }
  // 生成机构会员订单
  getOrganizationsMemberVip(id: string, data: object) {
    return this.post({
      url: `/v1/organizations/${id}/vip/orders`,
      data
    });
  }
  // 支付机构会员订单
  getOrganizationsMembersOrderPay(id: string, orderId: string, code: string) {
    return this.post({
      url: `/v1/organizations/${id}/vip/orders/${orderId}/pay?code=${code}`,
      
    });
  }
  // 获取我的预约列表
  getUserReservations() {
    return this.get({
      url: `/v1/users/reservations`,
    });
  }
  // 获取我的订单
  getUserOrders() {
    return this.get({
      url: `/v1/users/orders`,
    });
  }

}
