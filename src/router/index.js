import Vue from "vue";
import VueRouter from "vue-router";

//todo:代码优化，异步组件，实现按需加载
const Login = () => import("../components/Login.vue");
const Index = () => import("../components/Index.vue");
const Users = () => import("../components/users/Users.vue");
const Rights = () => import("../components/rights/Rights.vue");
const Roles = () => import("../components/rights/Roles.vue");
const Categories = () => import("../components/products/Categories.vue");
const Goods = () => import("../components/products/Goods.vue");
const GoodsAdd = () => import("../components/products/GoodsAdd.vue");

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
      {
        path: "roles",
        name: "roles",
        component: Roles,
      },
      {
        path: "rights",
        name: "rights",
        component: Rights,
      },
      {
        path: "list",
        name: "list",
        component: Goods,
      },
      {
        path: "list-add",
        name: "list-add",
        component: GoodsAdd,
      },
      {
        path: "classical",
        name: "classical",
        component: Categories,
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
  } else {
    next("/login");
  }
});

export default router;
