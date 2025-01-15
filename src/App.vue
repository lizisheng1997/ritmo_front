<script lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { defineComponent } from "vue";
export default defineComponent({
  globalData: {
    userInfo: null,
    navigationBarHeight: 0,  // 获取导航栏（标题栏高度）高度
    navAllHeight: 0, // 总体高度 = 状态栏高度+导航栏高度
  } as any,
  onLaunch: function () {
    console.log("App Launch");
    // 获取状态栏高度
    let statuBar: any = uni.getSystemInfoSync().statusBarHeight;
    // 获取胶囊数据
    let custom = uni.getMenuButtonBoundingClientRect()
    
    let navigationBarHeight = custom.height + (custom.top - statuBar) * 2

    let navAllHeight = navigationBarHeight  + statuBar
    // @ts-ignore
    this.globalData.navigationBarHeight = navigationBarHeight
    // @ts-ignore
    this.globalData.navAllHeight = navAllHeight
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
