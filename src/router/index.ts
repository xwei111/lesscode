import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/main/index.vue";
import Home from "../views/home/index.vue";
import Project from "../views/project/index.vue";

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
    path: "/main/:type/:id",
    name: "MainId",
    component: Main,
  },
  {
    path: "/project/:kind/:id",
    name: "Project",
    component: Project,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
