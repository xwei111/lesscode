import { createStore } from "vuex";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import modules from "./modules";

export default createStore({
  state,
  mutations,
  getters,
  modules,
});
