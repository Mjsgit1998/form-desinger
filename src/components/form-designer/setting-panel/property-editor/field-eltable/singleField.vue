<template>
  <el-dialog
    v-model="dialogVisible"
    title="字段选择"
    width="1000"
    top="10vh"
  >
    <div class="dialog-content">
      <div class="left-panel">
        <el-scrollbar>
          <div v-loading="leftLoading">
            <el-menu
              :default-active="activeIndex"
              @select="handleSelect"
            >
              <el-menu-item 
                v-for="(item, index) in listData" 
                :key="index"
                :index="String(index)"
              >
                {{ item.DisplayName }}
              </el-menu-item>
            </el-menu>
          </div>
        </el-scrollbar>
      </div>
      <div class="right-panel">
        <el-scrollbar>
          <div v-loading="rightLoading">
            <el-radio-group v-if="currentItem" v-model="selectedField">
              <div class="field-item" v-for="field in currentItem.fields" :key="field.FieldName">
                <el-radio :label="field.FieldName">
                  <span class="field-label">{{ field.DisplayName }}:</span>
                  <span class="field-value">{{ field.FieldName }}</span>
                </el-radio>
              </div>
            </el-radio-group>
          </div>
        </el-scrollbar>
      </div>
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
import { getObjectList, getFieldListByName } from "@/api/index";
import { ElMessage, ElLoading } from "element-plus";

// 定义 props
const props = defineProps({
  // 初始选中的对象名称
  defaultObjectName: {
    type: String,
    default: ''
  },
  // 初始选中的字段
  defaultSelectedField: {
    type: String,
    default: ''
  }
});

// 定义 emits
const emit = defineEmits(['update:selectedField', 'confirm']);

let dialogVisible = ref(false);
const activeIndex = ref('0');
const listData = ref([]);
const currentItem = ref(null);
const selectedField = ref('');

const leftLoading = ref(false);
const rightLoading = ref(false);

// 监听 defaultSelectedField 变化
watch(() => props.defaultSelectedField, (newVal) => {
  selectedField.value = newVal;
}, { immediate: true });

// 获取列表数据并设置初始选中项
const fetchObjectList = async () => {
  leftLoading.value = true;
  try {
    const response = await getObjectList();
    listData.value = response.data || [];
    
    if (listData.value.length > 0) {
      // 如果有默认选中的对象名称，找到对应的索引
      if (props.defaultObjectName) {
        const defaultIndex = listData.value.findIndex(
          item => item.ObjectName === props.defaultObjectName
        );
        if (defaultIndex !== -1) {
          await handleSelect(String(defaultIndex));
          activeIndex.value = String(defaultIndex);
          return;
        }
      }
      // 没有默认值或未找到默认值时，选择第一项
      await handleSelect('0');
    }
  } catch (error) {
    console.error("获取对象列表失败:", error);
    ElMessage.error('获取数据失败，请稍后重试');
  } finally {
    leftLoading.value = false;
  }
};

// 获取字段列表
const handleSelect = async (index) => {
  rightLoading.value = true;
  try {
    const selectedObject = listData.value[Number(index)];
    const response = await getFieldListByName(selectedObject.ObjectName);
    currentItem.value = {
      ...selectedObject,
      fields: Array.isArray(response.data) ? response.data : []
    };
    // 切换对象时，如果是初始默认对象，保留选中字段，否则清空选中
    if (selectedObject.ObjectName !== props.defaultObjectName) {
      selectedField.value = '';
    }
    activeIndex.value = index;
  } catch (error) {
    console.error("获取字段列表失败:", error);
    ElMessage.error('获取字段数据失败，请稍后重试');
  } finally {
    rightLoading.value = false;
  }
};

// 监听选中字段变化
watch(selectedField, (newVal) => {
  emit('update:selectedField', newVal);
});

const openDialog = async () => {
  dialogVisible.value = true;
  await fetchObjectList();
};

const handleConfirm = () => {
  // 获取选中字段的完整信息
  const selectedFieldInfo = currentItem.value.fields.find(field => 
    field.FieldName === selectedField.value
  );

  emit('confirm', {
    selectedField: selectedField.value,
    selectedFieldInfo,
    selectedObject: currentItem.value
  });
  dialogVisible.value = false;
};

defineExpose({
  dialogVisible,
  openDialog,
  selectedField
});
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 60vh;
  display: flex;
  gap: 20px;

  .left-panel, .right-panel {
    position: relative;
    
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
</style>
