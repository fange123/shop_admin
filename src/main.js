import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);

// # 把axios挂载到vue原型上
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
