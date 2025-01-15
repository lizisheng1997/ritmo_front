import { useCurrentStore } from "../store/modules/current"
import pinia from '../store/index';

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