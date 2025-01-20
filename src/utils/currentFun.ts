

import User from '/@/api/user';
const userApi = new User();
import { baseUrl } from './request'
// 成功提示
export const showTips = (title: string) => {
  uni.showToast({
    title,
    mask: true,
    icon: 'none',
    duration: 2000
  });
}
/**
 * 路由跳转
 * @param url 路径
 * @param auth  是否需要验证登录
 */
export const routerTo = ( url: string = '', auth: boolean = false ) => {
  if( !auth && !url ) {
    return
  }
  if( auth ) {
    // 此处为登录跳转校验
    if(!uni.getStorageSync('userInfos')) {
      showTips('请先登录')
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/login/index',
        })
      }, 1000);
      return
    } else {
      if( uni.getStorageSync('userInfos').is_new_user  == true ) {
        showTips('请先完善资料')
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/information',
          })
        }, 1000);
        return
      } else {
        uni.navigateTo({
          url,
        })
      }
    }
  } else {
    uni.navigateTo({
      url,
    })
  }
}
export const routerBack = (count: number) => {
  uni.navigateBack({
    delta: count
  })
}
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
        
        if( res.errMsg != 'chooseImage:ok' ) {
          return
        }
        resolve(res.tempFilePaths) 
        uni.hideLoading()
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

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
        'refresh_token': uni.getStorageSync('refreshToken')
            ? uni.getStorageSync('refreshToken')
            : '',
      },
      success: function(res) {
        // console.log(res);
        let obj = JSON.parse(res.data)
        if( obj.code == 0 ) {
          resolve(obj)
        } else if(obj.code == 401) {
          reject(false)
          showTips('登录已过期')
          setTimeout(() => {
            uni.clearStorageSync();
            uni.navigateTo({
                url: "/pages/login/index"
            })
          }, 1500);
        }
      },
      fail: function(err) {
        uni.hideLoading()
        reject(err)
      }
    });
  })
}