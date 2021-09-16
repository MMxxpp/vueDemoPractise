import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import fastClick from "fastclick"
import lazyload from "vue-lazyload"

Vue.config.productionTip = false

//解决移动端300毫秒延迟机制
fastClick.attach(document.body)

// 应用图片懒加载
Vue.use(lazyload,{
  // 占位符显示加载
  loading:require("./assets/img/common/placeholder.png")
})

// 创建新实例
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
