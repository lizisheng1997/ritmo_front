

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
 * @param type  返回几页
 * @param auth  是否需要验证登录
 */
export const routerTo = ( url: string = '', type: number = 0, auth: boolean = false ) => {
  if( !auth && !url && !type ) {
    return
  }
  // console.log(url, type)
  if( url == '' ) {
    uni.navigateBack({
      delta: type,
    })
  } else {
    if( auth ) {
      // 此处为登录跳转校验
    } else {
      uni.navigateTo({
        url,
      })
    }
  }
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
        const tempFilePaths = res.tempFilePaths
        // if(lowerStr != 'png' && lowerStr !== 'jpg' && lowerStr !== 'jpeg' && lowerStr !== 'bmp') {
        //     uni.showToast({
        //         title: '请上传PNG、JPG、JPEG、BMP格式的图片',
        //         icon: 'none',
        //         duration: 3000
        //     });
        //     return;
        // }
        // if(res.tempFiles[0]['size']>15*1024*1024){
        //     uni.showToast({
        //         title: '图片大小不能超过15M',
        //         icon: 'none',
        //         duration: 3000
        //     });
        //     return;
        // }
        uni.showLoading({
          title:'上传中...'
        }) 
        let str: any[] = []
        // console.log(tempFilePaths);
        
        for( let i of tempFilePaths ) {
          // await burrentUploadImgFile(type, i).then((resChild: any) => {
            
          //   if( resChild.code == 0 ) {
          //     str.push(resChild.data)
          //   }
          // }).catch((err) => {
          //   reject(err)
          // })
          if( type == 0 ) {
            userApi.getUpdateUserFace({ filePath: i }).then((resChild: any) => {
              str.push(resChild)
            }).catch((err) => {
              reject(err)
            })
          } else if( type == 1 ) {
            userApi.getUpdateUserAvatar({ filePath: i }).then((resChild: any) => {
              str.push(resChild)
            }).catch((err) => {
              reject(err)
            })
          }
        }
        await resolve(str) 
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