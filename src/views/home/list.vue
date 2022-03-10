<template>
  <ul class="templates-list">
    <li @click="() => toEditHandle()">
      <i class="template-empty el-icon-plus"></i>
    </li>
    <li
      v-for="(item, index) in dataSource"
      :key="index"
      @mouseover="id = item?._id"
      @mouseout="id = ''"
    >
      <img v-if="item?.imgUrl" :src="assetsUrl + item?.imgUrl" />
      <ListWraper v-else :dataSource="item ?? {}" />
      <div class="template-mark" v-show="id === item?._id && item?.name">
        <p>{{ item?.name }}</p>
        <div class="template-operate">
          <div
            class="template-operate-item"
            @click="() => toEditHandle(item?._id)"
          >
            <i class="el-icon-edit"></i>
            <span>编辑</span>
          </div>
          <div
            class="template-operate-item"
            v-if="type === 'mine'"
            @click="() => toLinkHandle(item?.type, item?._id)"
          >
            <i class="el-icon-link"></i>
            <span>访问</span>
          </div>
          <div
            class="template-operate-item"
            v-if="type === 'mine'"
            @click="() => deleteHandle(item?._id)"
          >
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </div>
        </div>
      </div>
    </li>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { assetsUrl } from "@/consts";
import ListWraper from "@/components/listWraper/index.vue";
import { deleteWork } from "@/apis/user";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    ListWraper,
  },
  props: {
    type: String,
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any, { emit }) {
    const id = ref<string>("");

    const toEditHandle = (_id: string): void => {
      window.open(_id ? `#/main/${props?.type}/${_id}` : `#/main`);
    };

    const toLinkHandle = (kind: string, _id: string): void => {
      window.open(`#/project/${kind === "poster" ? "mobile" : "pc"}/${_id}`);
    };

    const deleteHandle = (_id: string): void => {
      _deleteWork({ id: _id });
    };

    const _deleteWork = async (params: any): Promise<void> => {
      const { code } = await deleteWork(params);
      if (code === 200) {
        ElMessage.success("删除成功");
        emit("successHandle");
      }
    };

    return {
      toEditHandle,
      toLinkHandle,
      deleteHandle,
      assetsUrl,
      id,
    };
  },
});
</script>

<style lang="scss" scoped>
.templates-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  li {
    width: 10vw;
    height: 14vw;
    overflow: hidden;
    border: 1px solid #eee;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 0 10px 20px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .template-empty {
      font-size: 30px;
      color: #ccc;
    }
    img {
      width: 100%;
      min-height: 100%;
    }
    .template-mark {
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba($color: #000000, $alpha: 0.7);
      z-index: 9;
      color: #fff;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding-top: 20px;
      .template-operate {
        display: flex;
        padding-top: 2vh;
        cursor: pointer;
        .template-operate-item {
          display: flex;
          flex-direction: column;
          font-size: 0.7vw;
          align-items: center;
          justify-content: center;
          margin: 0.2vw;
          i {
            margin-bottom: 0.5vh;
          }
        }
      }
    }
  }
  u {
    display: inline-block;
    width: 10vw;
    margin: 0 10px 0 10px;
  }
}
</style>
