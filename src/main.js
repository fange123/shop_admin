import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

// * 注册一个全局过滤器，用来过滤时间戳
Vue.filter(
  "dateFilter",
  (value) => moment(value * 1000).format("YYYY-MM-DD HH:mm:ss") //value*1000是数据的问题，返回的时间戳 是秒的不是毫秒的
);
// # 把axios挂载到vue原型上
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "/api";
//!:全局请求头的token不能这样配置，它是不会变的
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
