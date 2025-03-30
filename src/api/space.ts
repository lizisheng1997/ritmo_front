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
  // 获取会议室列表
  getSpaceMeetingRooms(data: object) {
    return this.get({
      url: `/v1/meeting-rooms`,
      data
    });
  }
  // 办公室
  getSpaceOffices(data: object) {
    return this.get({
      url: `/v1/offices`,
      data
    });
  }
  // 展示柜
  getSpaceShowcases(data: object) {
    return this.get({
      url: `/v1/showcases`,
      data
    });
  }
  // 活动室
  getSpacEventRooms(data: object) {
    return this.get({
      url: `/v1/event-rooms`,
      data
    });
  }
  // 获取会议室、工位可预约的时间
  getSpaceWorkspacesTimes(id: string, data: object) {
    return this.get({
      url: `/v1/booking/workspaces/${id}/time-slots`,
      data
    });
  }
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
  getSpaceWorkspacesOrder(id: string, query: string) {
    return this.post({
      url: `/v1/booking/workspaces/${id}/confirm${query}`,
    });
  }
  getSpaceMeetingRoomsOrder(id: string, query: string) {
    return this.post({
      url: `/v1/booking/meeting-rooms/${id}/confirm${query}`,
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
  // 办公室详情
  getSpaceOfficesDetails(sid: string, id: string) {
    return this.get({
      url: `/v1/offices/${id}?space_id=${sid}`,
    });
  }
  // 展示柜详情
  getSpaceShowcasesDetails(sid: string, id: string) {
    return this.get({
      url: `/v1/showcases/${id}?space_id=${sid}`,
    });
  }
  // 活动室详情
  getSpaceEventRoomsDetails(sid: string, id: string) {
    return this.get({
      url: `/v1/event-rooms/${id}?space_id=${sid}`,
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
