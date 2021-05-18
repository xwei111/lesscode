import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// 样式
import "@/styles/index.scss";
// 注册自定义组件
import install from "@/utils/customEl";

window.addEventListener("click", () => {
  store.commit("set_showCustomMenu", false);
});

window.addEventListener("resize", () => {
  store.commit("set_showCustomMenu", false);
});

const app = createApp(App);

install(app);

app.use(store).use(router).use(ElementPlus).mount("#app");
