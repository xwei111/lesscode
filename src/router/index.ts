import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/main/index.vue";
import Home from "../views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/main/:id",
    name: "MainId",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
