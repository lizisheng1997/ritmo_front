import { defineStore } from 'pinia';
import type { T, useUserType } from '../../utils/types';

import ClientCode from '/@/api/oneClientOneCode';
const clientCode = new ClientCode();
import Login from '/@/api/login';
const loginApi = new Login();

// 企微sdk
// #ifdef H5
let wx: T = '';
if ((window as T).wx.config == undefined) {
  wx = (window as T).jWeixin;
} else {
  wx = (window as T).wx;
}
const jsApiList = [
  'getCurExternalContact',
  'sendChatMessage',
  'openExistedChatWithMsg',
  'launchMiniprogram',
  'getContext',
  'openEnterpriseChat',
  'invoke',
  'shareToExternalMoments'
];
// #endif

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): useUserType => ({
    userInfo: {
      userId: ''
    } as any,
    lesseeList: [], // 分站点列表
    lesseeId: '' // 租户id
  }),
  getters: {},
  actions: {
    // 储存分站点信息
    setLesseeList(data: T) {
      this.lesseeList = data;
    },
    // 存储用户信息
    setUserInfo(data: T) {
      this.userInfo = data;
    },
    // 存储租户id
    setLesseeId(lesseeId: string) {
      this.lesseeId = lesseeId;
    },
    // 对象转为用&拼接的字符串
    setParams(params: any) {
      const arr = [];
      for (const key in params) {
        arr.push(`${key}=${params[key]}`);
      }
      return arr.join('&');
    },
    /**
     * H5授权获取用户信息
     * data: 企微传递参数
     * type: 1一客一码oneClientOneCode页面
     *       2sop任务详情sop/task/details页面
     *       3素材列表marketing/matter页
     *       4公司文件marketing/companyFile页
     *       5客户系统登录
     *       6我的客户
     *       7sop朋友圈详情
     *       8更多功能
     *       9员工申诉列表
     *       10员工申诉详情
     *       11素材详情
     *       13话术库
     * 授权重定向到auth.vue页面，通过type判断再跳转到具体页面
     * options: {
     *   scope: 1手动授权snsapi_privateinfo 获取成员的详细信息，包含头像、二维码等敏感信息
     *          2静默授权snsapi_base 获取成员的基础信息（UserId与DeviceId）
     *          默认1
     * }
     */
    authUserInfo(data: any, type: number, options = { scope: 1 }) {
      data.H5Type = type;
      return new Promise(async (resolve, reject) => {
        uni.showToast({
          icon: 'loading',
          duration: 10000,
          mask: true
        });
        // 用户id
        const userId = uni.getStorageSync('clientCode-userId');
        if (type != 6 && type != 3 && type != 11) {
          if (userId) {
            this.userInfo.userId = userId;
          }
        }
        if (!data.code && !this.userInfo.userId) {
          // 授权
          const paramsString = this.setParams(data);
          const params: Record<string, string> = {
            appid: data.corpId,
            redirect_uri: window.encodeURIComponent(
              `http://pg.juxue.cloud/auth?${paramsString}`
            ),
            response_type: 'code',
            scope: options.scope == 1 ? 'snsapi_privateinfo' : 'snsapi_base',
            agentid: data.agentId,
            state: 'STATE'
          };
          uni.hideToast();
          const query = this.setParams(params);
          window.location.href =
            'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            query +
            '#wechat_redirect';
          return;
        } else if (data.code && !this.userInfo.userId) {
          const res: T = await clientCode.getUserInfo({
            corpId: data.corpId,
            code: data.code // 重定向之后得到的
          });
          if (res.code == 0) {
            uni.setStorageSync('clientCode-userId', res.data.userid);
            uni.setStorageSync('clientCode-avatar', res.data.avatar);
            uni.setStorageSync('clientCode-userInfo', res.data);
            this.userInfo = res.data;
            this.userInfo.userId = res.data.userid;
          } else {
            uni.hideToast();
            console.log('获取用户信息失败,Error:' + res.msg);
            reject(false);
            return;
          }
        }

        // getConfig
        const config: T = await clientCode.getConfig({
          url: window.btoa(location.href)
        });
        if (config.code == 0) {
          const configData = config.data;
          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.corpId, // 必填，企业微信的corpID
            timestamp: configData.timestamp, // 必填，生成签名的时间戳
            nonceStr: configData.nonceStr, // 必填，生成签名的随机串
            signature: configData.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          });
          wx.ready(async () => {
            // getAgentConfig
            const agentConfig: T = await clientCode.getAgentConfig({
              url: window.btoa(location.href)
            });
            if (agentConfig.code == 0) {
              const agentConfigData = agentConfig.data;
              wx.agentConfig({
                corpid: data.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                agentid: data.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                timestamp: agentConfigData.timestamp, // 必填，生成签名的时间戳
                nonceStr: agentConfigData.nonceStr, // 必填，生成签名的随机串
                signature: agentConfigData.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                jsApiList, //必填，传入需要使用的接口名称
                success() {
                  uni.hideToast();
                  resolve(wx);
                },
                fail(err: T) {
                  console.log('agentConfig', err);
                  uni.hideToast();
                  if (err.errMsg.indexOf('function not exist') > -1) {
                    alert('版本过低请升级');
                  } else {
                    console.log(err.errMsg);
                  }
                  reject(false);
                }
              });
            } else {
              uni.hideToast();
              console.log(
                '获取agentConfig参数失败,Error:' + JSON.stringify(agentConfig)
              );
              reject(false);
            }
          });
          wx.error(function (err: T) {
            uni.hideToast();
            console.log(err.errMsg + ';' + err.err_msg);
            reject(false);
          });
        } else {
          uni.hideToast();
          console.log('获取config参数失败,Error:' + JSON.stringify(config));
          reject(false);
        }
      });
    },
    /**
     * 默认分站点登录
     * 如果有多个分站点，则跳转选择分站点页面
     * 如果只有一个，则直接登录
     */
    async siteLogin() {
      uni.showToast({
        icon: 'loading',
        duration: 5000,
        mask: true
      });
      const res: any = await loginApi.authQwSilentLogin({
        corpId: uni.getStorageSync('matterCorpId'),
        lesseeType: 1,
        userId: this.userInfo.userId
        // userId: 'wojpflEAAAhv4415GPXhEJYtz0JZ3Azg'
      });
      uni.hideToast();
      if (res.code == 0) {
        uni.setStorageSync('token', res.data.token);
        if (res.data.lessee != null && res.data.lessee.length > 1) {
          // 如果有多个分站点，则让用户选择登录
          this.setLesseeList(res.data.lessee);
          return false;
        } else {
          return true;
        }
      } else {
        uni.showToast({
          title: res.msg,
          duration: 2000,
          icon: 'none',
          mask: true
        });
      }
    }
  }
});
