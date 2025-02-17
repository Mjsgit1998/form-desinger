<template>
  <el-form-item label="表格字段" label-position="top">
    <el-table
      id="table_count"
      :data="optionModel.tableItems"
      style="width: 100%"
    >
      <el-table-column prop="" label="排序" align="center">
        <template #default="scope">
          <el-icon class="handle_drop" style="cursor: move"><Rank /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="字段名"></el-table-column>
      <el-table-column prop="prop" label="字段值"></el-table-column>
      <el-table-column prop="width" label="宽度"></el-table-column>
      <el-table-column prop="fixed" label="是否固定"></el-table-column>
    </el-table>
    <!-- <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 10px;
      "
    >
      <el-button type="primary" block>修改</el-button>
    </div> -->
  </el-form-item>
</template>

<script>
import Sortable from "sortablejs";
import { Rank } from "@element-plus/icons-vue";
export default {
  name: "eltable-tableItems-editor",
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  },
  components: { Rank },
  mounted() {
    this.$nextTick(() => {
      this.rowDrop();
    });
  },
  methods: {
    rowDrop() {
      const el = document.querySelector(
        "#table_count .el-table__body-wrapper tbody"
      );
      const that = this;
      new Sortable(el, {
        animation: 150,
        handle: ".handle_drop", //class类名执行事件
        ghostClass: "blue-background-class",
        // 结束拖拽后的回调函数
        onEnd({ newIndex, oldIndex }) {
          const tempList = [...that.optionModel.tableItems];
          /**splice 新增删除并以数组的形式返回删除内容；（此处表示获取删除项对象） */
          const currentRow = tempList.splice(oldIndex, 1)[0];
          tempList.splice(
            newIndex,
            0,
            currentRow
          ); /** 在新下标前添加一个数据， 第二个参数 0 表示不删除，即为新增 */
          that.optionModel.tableItems = [...tempList];
        }
        // onEnd: (evt) => {
        //     console.log('----onEnd(拖拽结束)---', evt)
        // },
      });
    }
  }
};
</script>

<style scoped></style>
