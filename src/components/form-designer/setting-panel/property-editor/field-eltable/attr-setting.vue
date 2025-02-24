<template>
  <el-dialog
    v-model="dialogVisible"
    title="字段属性设置"
    width="1000"
    top="10vh"
  >
    <div class="dialog-content">
      <el-table 
        border 
        id="table_count" 
        :data="dataList" 
       
        style="width: 100%"
        row-key="prop"
        v-sortable="{ onEnd: onDragEnd, handle: '.drag-handle' }"
      >
        <el-table-column width="50" align="center">
          <template #default>
            <el-icon class="drag-handle"><Rank /></el-icon>
          </template>
        </el-table-column>
      
        <el-table-column prop="label"  header-align="center" label="表格列名">
          <template #default="scope">
            <el-input
              v-model="scope.row.label"
              placeholder="请输入字段名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="字段值"></el-table-column>
        <el-table-column prop="width" label="宽度">
          <template #default="scope">
            <el-input
              v-model="scope.row.width"
              placeholder="请输入宽度"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fixed" label="是否固定">
          <template #default="scope">
            <el-switch
              v-model="scope.row.fixed"
              placeholder="是否固定列"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="align" label="对齐方式">
          <template #default="scope">
            <el-select v-model="scope.row.align" placeholder="请选择对齐方式">
              <el-option label="左对齐" value="left"></el-option>
              <el-option label="右对齐" value="right"></el-option>
              <el-option label="居中对齐" value="center"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="headerAlign" label="表头对齐方式">
          <template #default="scope">
            <el-select v-model="scope.row.headerAlign" placeholder="请选择表头对齐方式">
              <el-option label="左对齐" value="left"></el-option>
              <el-option label="右对齐" value="right"></el-option>
              <el-option label="居中对齐" value="center"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import Sortable from 'sortablejs';
import { Rank } from '@element-plus/icons-vue'

// 定义 props
const props = defineProps({
  tableItems: {
    type: Array,
    default: () => []
  }
});

// 定义 emits
const emit = defineEmits(["update:selectedFields", "confirm"]);

let dialogVisible = ref(false);

const selectedFields = ref([]);

const dataList = ref([]);

const openDialog = () => {
  dialogVisible.value = true;
  dataList.value = JSON.parse(JSON.stringify(props.tableItems));
};

const handleConfirm = () => {
  dialogVisible.value = false;
  emit("confirm", dataList.value);
};

// 修改 v-sortable 指令的实现
const vSortable = {
  mounted(el, binding) {
    const tbody = el.querySelector('.el-table__body-wrapper tbody');
    Sortable.create(tbody, {
      handle: '.drag-handle',
      animation: 300,
      ...binding.value
    });
  }
};

// 拖拽结束后的处理函数
const onDragEnd = (evt) => {
  const { oldIndex, newIndex } = evt;
  if (oldIndex !== newIndex) {
    const currRow = dataList.value.splice(oldIndex, 1)[0];
    dataList.value.splice(newIndex, 0, currRow);
  }
};

defineExpose({
  dialogVisible,
  openDialog,
  selectedFields
});
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 60vh;
  display: flex;
  gap: 20px;

  .left-panel,
  .right-panel {
    position: relative; // 添加相对定位以支持 loading

    :deep(.el-scrollbar__wrap) {
      height: 100%;
    }

    :deep(.el-loading-mask) {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  .left-panel {
    width: 200px;
    border-right: 1px solid #dcdfe6;
  }

  .right-panel {
    flex: 1;
    overflow: hidden;

    .field-item {
      margin-bottom: 10px;
      padding: 0 10px;

      .field-label {
        font-weight: bold;
        margin-right: 8px;
      }

      .field-value {
        color: #666;
      }
    }
  }
}

// 添加拖拽样式
:deep(.drag-handle) {
  cursor: move;
  font-size: 20px;
  color: #909399;
  
  &:hover {
    color: #409EFF;
  }
}

// 移除整行的 cursor: move
:deep(.el-table__row) {
  cursor: default;
}

:deep(.sortable-ghost) {
  opacity: 0.5;
  background: #c8ebfb;
}

:deep(.sortable-drag) {
  background: #fff;
  opacity: 0.8;
}
</style>
