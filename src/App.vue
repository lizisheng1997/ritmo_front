<script lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { defineComponent } from "vue";
export default defineComponent({
  globalData: {
    navigationBarHeight: 0,  // 获取导航栏（标题栏高度）高度
    navAllHeight: 0, // 总体高度 = 状态栏高度+导航栏高度
    terminalPay: '', // android ios wechat
  } as any,
  onLaunch: function () {
    // console.log("App Launch");
    // 获取状态栏高度
    let statuBar: any = uni.getSystemInfoSync().statusBarHeight;
    
    let navigationBarHeight = 44

    let navAllHeight = navigationBarHeight  + statuBar
    // @ts-ignore
    this.globalData.navigationBarHeight = navigationBarHeight
    // @ts-ignore
    this.globalData.navAllHeight = navAllHeight
    // 设置tabbar中英文
    let type = uni.getStorageSync('languageType') ? uni.getStorageSync('languageType') : 'zh'
    uni.setTabBarItem({
      index: 0,
      text: type == 'zh' ? '首页' : 'home',
    })
    uni.setTabBarItem({
      index: 1,
      text: type == 'zh' ? '空间' : 'space',
    })
    uni.setTabBarItem({
      index: 2,
      text: type == 'zh' ? '我的' : 'user',
    })
    // 
    const systemInfo = uni.getSystemInfoSync();
    // console.log('----', systemInfo)
    if (systemInfo.platform === 'android' || systemInfo.platform === 'ios') {
      // @ts-ignore
      this.globalData.terminalPay = systemInfo.platform;
    } else {
      // @ts-ignore
      this.globalData.terminalPay = 'wechat';
    }
  },
  onShow: function () {
    // console.log('App Launch')
  },
  onHide: function () {
    // console.log('App Launch')
  },
})
</script>
<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
  @import "./styles/main.scss";
</style>
