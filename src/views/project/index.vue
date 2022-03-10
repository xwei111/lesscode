<template>
  <div class="project-box">
    <ListWraper :dataSource="dataSource ?? {}" :isMobile="kind === 'mobile'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import ListWraper from "@/components/listWraper/index.vue";
import { getWorkList } from "@/apis/temList";

export default defineComponent({
  components: {
    ListWraper,
  },
  setup() {
    const {
      currentRoute: {
        value: {
          params: { kind, id },
        },
      },
    } = useRouter();

    const data = reactive({
      dataSource: {},
    });

    const _getWorkList = async (params: { id?: string; }): Promise<void> => {
      const res = await getWorkList(params);
      if (res?.code === 200) {
        data.dataSource = res?.data?.[0] ?? {};
      }
    }

    id && _getWorkList({ id: id as string });

    return {
      kind,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.project-box {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
