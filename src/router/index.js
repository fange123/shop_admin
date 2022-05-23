import Vue from "vue";
import VueRouter from "vue-router";

//todo:代码优化，异步组件，实现按需加载

//# 指定了相同的webpackChunkName，会合并打包成一个js文件
//# 不加 webpackChunkName的话，每个组件都打包成一个js文件，有之后，name名称相同的一组组件打包为一个js文件
const Login = () =>
  import(/* webpackChunkName: 'index' */ "../components/Login.vue");
const Index = () =>
  import(/* webpackChunkName: 'index' */ "../components/Index.vue");
const Users = () =>
  import(/* webpackChunkName: 'users' */ "../components/users/Users.vue");
const Rights = () =>
  import(/* webpackChunkName: 'rights' */ "../components/rights/Rights.vue");
const Roles = () =>
  import(/* webpackChunkName: 'rights' */ "../components/rights/Roles.vue");
const Categories = () =>
  import(
    /* webpackChunkName: 'goods' */ "../components/products/Categories.vue"
  );
const Goods = () =>
  import(/* webpackChunkName: 'goods' */ "../components/products/Goods.vue");
const GoodsAdd = () =>
  import(/* webpackChunkName: 'goods' */ "../components/products/GoodsAdd.vue");

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
