import { baseUrl } from './request';
// 成功提示
export const showTips = (title: string) => {
  uni.showToast({
    title,
    mask: true,
    icon: 'none',
    duration: 2000
  });
};
/**
 * 路由跳转
 * @param url 路径
 * @param auth  是否需要验证登录
 */
export const routerTo = (url: string = '', auth: boolean = false) => {
  if (!auth && !url) {
    return;
  }
  if (auth) {
    // 此处为登录跳转校验
    if (!uni.getStorageSync('userInfos')) {
      showTips('请先登录');
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/login/index'
        });
      }, 1000);
      return;
    } else {
      if (uni.getStorageSync('userInfos').is_new_user == true) {
        showTips('请先完善资料');
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/information'
          });
        }, 1000);
        return;
      } else {
        uni.navigateTo({
          url
        });
      }
    }
  } else {
    uni.navigateTo({
      url
    });
  }
};
export const routerBack = (count: number) => {
  uni.navigateBack({
    delta: count
  });
};
/**
 * 图片上传
 */
/**
 * 选择图片
 * @param type  0上传人脸照片 1上传头像
 * @param count  数量
 * @returns
 */
export const burrentChooseImage = (type: number, count: number) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: count,
      sizeType: ['original'], //original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
      success: async function async(res: any) {
        // console.log(res);

        if (res.errMsg != 'chooseImage:ok') {
          return;
        }
        resolve(res.tempFilePaths);
        uni.hideLoading();
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
};

/**
 * 上传图片
 * @param type  0上传人脸照片 1上传头像
 * @param filePath 文件临时路径
 * @returns
 */
export const burrentUploadImgFile = (type: number, filePath: any) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: type ? `${baseUrl}/v1/users/avatar` : `${baseUrl}/v1/users/faces`,
      filePath: filePath,
      name: 'file',
      formData: {
        file: filePath
      },
      header: {
        refresh_token: uni.getStorageSync('refreshToken')
          ? uni.getStorageSync('refreshToken')
          : ''
      },
      success: function (res) {
        // console.log(res);
        let obj = JSON.parse(res.data);
        if (obj.code == 0) {
          resolve(obj);
        } else if (obj.code == 401) {
          reject(false);
          showTips('登录已过期');
          setTimeout(() => {
            uni.clearStorageSync();
            uni.navigateTo({
              url: '/pages/login/index'
            });
          }, 1500);
        }
      },
      fail: function (err) {
        uni.hideLoading();
        reject(err);
      }
    });
  });
};
/**
 * 时间转换
 */
export const dateToLocaleDateString = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
/**
 * 复制文本
 */
export const copyText = (text: string) => {
  uni.setClipboardData({
    data: text,
    success: function () {
      showTips('复制成功');
    }
  });
};

/**
 * 支付
 */
export const getRequestPayment = (
  provider: any,
  obj: any,
  terminalPay?: string
) => {
  // const appId = terminalPay === 'ios' ? 'appId' : 'appid';
  // console.log(obj);

  return new Promise((resolve, reject) => {
    if (provider == 'wxpay') {
      uni.requestPayment({
        provider,
        // orderInfo: obj,
        // @ts-ignore
        appid: obj.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
        timeStamp: obj.timeStamp, // 时间戳（单位：秒）
        package: 'prepay_id=' + obj.package, // 固定值
        paySign: obj.paySign, //签名
        signType: obj.signType, // 签名算法，这里用的 MD5/RSA 签名
        nonceStr: obj.nonceStr,
        success: function (res) {
          // var rawdata = JSON.parse(res.rawdata);
          showTips('支付成功');
          resolve(res);
        },
        fail: function (err) {
          console.log('支付失败:' + JSON.stringify(err));
          showTips('支付失败');
          reject(err);
        }
      });
    } else if (provider == 'alipay') {
      uni.requestPayment({
        provider,
        orderInfo: obj,
        success: function (res) {
          // var rawdata = JSON.parse(res.rawdata);
          showTips('支付成功');
          resolve(res);
        },
        fail: function (err) {
          console.log('支付失败:' + JSON.stringify(err));
          showTips('支付失败');
          reject(err);
        }
      });
    } else if (provider == 'stripe') {
      uni.requestPayment({
        provider,
        orderInfo: obj,
        success(res) {
          showTips('支付成功');
          resolve(res);
        },
        fail(err) {
          console.log('支付失败:' + JSON.stringify(err));
          showTips('支付失败');
          reject(err);
        }
      });
    }
  });
};
