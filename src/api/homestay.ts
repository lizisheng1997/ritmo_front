import Request from '/@/utils/request';

export default class Homestay extends Request {
  constructor() {
    super();
  }
  // 根据经纬度获取地址
  getStaticAmapRegeo(data: object) {
    return this.post({
      url: '/addons/booking/common/staticAmapRegeo',
      data
    });
  }
  // 根据城市获取帖子
  getPostListByCity(data: object) {
    return this.post({
      url: '/api/community/getPostListByCity',
      data
    });
  }
  // 获取筛选条件
  getCondition(data: object) {
    return this.post({
      url: '/addons/booking/house/condition',
      data
    });
  }
  // 获取民宿列表
  getStoreList(data: object) {
    return this.post({
      url: '/addons/booking/store/storeList',
      data
    });
  }
  // 民宿详情
  getStoreDetail(data: object) {
    return this.post({
      url: '/addons/booking/store/detail',
      data
    });
  }
  // 获取房间列表
  getHouseList(data: object) {
    return this.post({
      url: '/addons/booking/house/houseList',
      data
    });
  }
  // 预约订单
  getHouseBooking(data: object) {
    return this.post({
      url: '/addons/booking/house/booking',
      data
    });
  }
  // 创建订单
  getHouseOrderAdd(data: object) {
    return this.post({
      url: '/addons/booking/order/add',
      data
    });
  }
  // 支付订单
  getHouseOrderPay(data: object) {
    return this.post({
      url: '/addons/booking/order/pay',
      data
    });
  }
  // 收藏民宿
  getOptionCollect(data: object) {
    return this.post({
      url: '/addons/booking/collect/optionCollect',
      data
    });
  }
  // 订单列表
  getOrderList(data: object) {
    return this.post({
      url: '/addons/booking/order/orderList',
      data
    });
  }
  // 订单详情
  getOrderDetails(data: object) {
    return this.post({
      url: '/addons/booking/order/detail',
      data
    });
  }
  // 取消订单
  getOrderCancel(data: object) {
    return this.post({
      url: '/addons/booking/order/cancel',
      data
    });
  }
  // 申请退款
  getOrderCheckout(data: object) {
    return this.post({
      url: '/addons/booking/order/orderCheckout',
      data
    });
  }






}
