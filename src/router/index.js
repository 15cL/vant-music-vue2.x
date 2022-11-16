import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/user",
  },
  {
    path: "/user",
    name: "user",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/user/UserView.vue"),
    meta: {
      keepAlive: false, // 不需要缓存
    },
  },
  {
    path: "/discover",
    name: "discover",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/discover/DiscoverView.vue"),
    meta: {
      keepAlive: false, // 不需要缓存
    },
  },
  {
    path: "/dailySongs",
    name: "dailySongs",
    component: () => import("@/views/dailySongs/dailySongs.vue"),
    meta: {
      keepAlive: true, // 不需要缓存
    },
  },
  {
    path: "/rank",
    name: "rank",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/rank/RankView.vue"),
    meta: {
      keepAlive: true, // 不需要缓存
    },
  },
  {
    path: "/search",
    name: "search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/search/SearchView.vue"),
    meta: {
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/login/LoginView.vue"),
    meta: {
      keepAlive: false, // 不需要缓存
    },
  },
  {
    path: "/listDetail",
    name: "listDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/listDetail/listDetail"),
    meta: {
      keepAlive: false, // 不需要缓存
    },
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
