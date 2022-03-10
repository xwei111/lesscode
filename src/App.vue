<template>
  <Login />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Login from "./views/login/index.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Login,
  },
  setup() {
    const { state } = useStore();
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) state.userInfo = JSON.parse(userInfo);
  },
});
</script>

<style lang="scss"></style>
