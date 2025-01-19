
import { showTips } from './currentFun';
// @ts-ignore
import type { T } from './types';

export const baseUrl = 'http://47.116.190.37:8002/api';
// baseUrl = 'http://192.168.7.79:8000/gateway/'; 
// console.log(baseUrl);

export default class Request {
  baseUrl = ''; // 接口地址
  constructor() {}
  request(options: T) {
    return new Promise((reslove, reject) => {
      uni.request({
        url: baseUrl + options.url,
        method: options.method,
        data: options.data,
        header: {
          'refresh_token': uni.getStorageSync('refreshToken')
            ? uni.getStorageSync('refreshToken')
            : '',
        },
        success(res: T) {
          // console.log(res);
          
          if (res.data.code == 300) {
            showTips(res.data.message)
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/index'
              });
            }, 1000)
            reject(res.data);
          } else if( res.data.code == 200 ) {
            reslove(res.data);
          } else {
            showTips(res.data.message)
            reject(res.data);
          }
        },
        fail(err: T) {
          reject(err.data);
        }
      });
    });
  }
  async get(options: T) {
    options.method = 'GET';
    return await this.request(options);
  }
  async post(options: T) {
    options.method = 'POST';
    return await this.request(options);
  }
  async put(options: T) {
    options.method = 'PUT';
    return await this.request(options);
  }
  async delete(options: T) {
    options.method = 'DELETE';
    return await this.request(options);
  }
  // 文件上传
  async uploadFile(options: T): Promise<string> {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseUrl + options.url,
        filePath: options.filePath,
        name: 'file',
        formData: options.data,
        success(res: T) {
          const json = JSON.parse(res.data);
          if (res.data.code == 300) {
            showTips(res.message)
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/index'
              });
            }, 1000)
            reject(res);
          } else if (json.data.code == 200) {
            const data = JSON.parse(json.data);
            const url = data.data.downloadUrl;
            resolve(url);
          } else {
            showTips(res.data.message)
            reject(json);
          }
        },
        fail(err: T) {
          reject(err.data);
        }
      });
    });
  }

  async returnUrl() {
    return baseUrl;
  }
}
