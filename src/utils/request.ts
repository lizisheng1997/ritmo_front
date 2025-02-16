
import { showTips } from './currentFun';
// @ts-ignore
import type { T } from './types';

// 记得全局更换background-image地址
export const baseUrl = 'https://ritmohub.cn'; // 测试环境
// console.log(baseUrl);

export default class Request {
  baseUrl = ''; // 接口地址
  constructor() {}
  request(options: T) {
    return new Promise((reslove, reject) => {
      uni.request({
        url: baseUrl+ '/api' + options.url,
        method: options.method,
        data: options.data,
        header: {
          'Authorization': uni.getStorageSync('accessToken')
            ? `Bearer ${uni.getStorageSync('accessToken')}`
            : '',
        },
        success(res: T) {
          // console.log(res);
          
          if (res.data.code == 300 || res.data.code == 401) {
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
        url: baseUrl + '/api' + options.url,
        filePath: options.data.filePath,
        name: 'file',
        
        header: {
          'Authorization': uni.getStorageSync('accessToken')
            ? `Bearer ${uni.getStorageSync('accessToken')}`
            : '',
        },
        success(res: T) {
          const json = JSON.parse(res.data);
          console.log(json);
          showTips(json.message)
          if (json.code == 300) {
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/index'
              });
            }, 1000)
            reject(res);
          } else if (json.code == 200) {
            resolve(json.data);
          } else {
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
