import Request from '/@/utils/request';

export default class Space extends Request {
  constructor() {
    super();
  }
  // 获取当前空间
  getSpaceCurrent() {
    return this.get({
      url: '/v1/spaces/current/info'
    });
  }
  // 获取列表
  getSpaceList() {
    return this.get({
      url: '/v1/spaces'
    });
  }
  // 获取空间详情
  getSpaceInfo(id: string) {
    return this.get({
      url: `/v1/spaces/${id}`
    });
  }
  // 获取工位列表
  getSpaceWorkspaces(id: string, data: object) {
    return this.get({
      url: `/v1/spaces/${id}/workspaces`,
      data
    });
  }
  // 获取办公室列表
  getSpaceMeetingRooms(data: object) {
    return this.get({
      url: `/v1/meeting-rooms`,
      data
    });
  }
  // 获取会议室、工位可预约的时间
  getSpaceMeetingRoomsTimes(id: string, data: object) {
    return this.get({
      url: `/v1/booking/meeting-rooms/${id}/time-slots`,
      data
    });
  }
  // 创建工位
  getSpaceWorkspacesAdd(data: object) {
    return this.post({
      url: `/v1/booking/workspaces`,
      data
    });
  }
  // 创建会议室
  getSpaceWorkRoomAdd(data: object) {
    return this.post({
      url: `/v1/booking/meeting-rooms`,
      data
    });
  }
  // 确认会议室、工位订单
  getSpaceWorkspacesOrder(id: string, data: object) {
    return this.post({
      url: `/v1/booking/workspaces/${id}/confirm`,
      data
    });
  }
  // 工位详情
  getSpaceMeetingWorkspacesDetails(sid: string, id: string) {
    return this.get({
      url: `/v1/spaces/${sid}/workspaces/${id}`,
    });
  }
  // 会议室详情
  getSpaceMeetingRoomsDetails( id: string, data: object) {
    return this.get({
      url: `/v1/meeting-rooms/${id}`,
      data
    });
  }
  // 工位订单详情
  getSpaceMeetingWorkspacesBook( id: string, data: object) {
    return this.get({
      url: `/v1/booking/workspaces/${id}`,
      data
    });
  }
  // 会议室订单详情
  getSpaceMeetingRoomsBook( id: string, data: object) {
    return this.get({
      url: `/v1/booking/meeting-rooms/${id}`, 
      data
    });
  }


}
