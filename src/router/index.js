import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Index from "../components/Index.vue";
import Users from "../components/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "users",
        name: "users",
        component: Users,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

//* 给路由对象注册导航守卫
//? to: 去哪儿
//? from: 从哪儿来
//? next():直接放行，去你要去的路由    next('/login'):必须先去登录
router.beforeEach((to, _, next) => {
  // 所有导航的跳转都要经过导航守卫
  //* 如果to到登录页，放行
  //* 如果to到其他页面，先判断有没有token
  const token = localStorage.getItem("token");
  if (to.path === "/login" || token) {
    next();
    console.log("zou ");
  } else {
    next("/login");
  }
});

export default router;
