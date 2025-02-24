<template>
  <el-form-item label="字段选择" label-position="left">
    <!-- <el-table
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
    </el-table> -->
    <!-- <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 10px;
      "
    > -->
    <el-button type="primary" block @click="openDialog">编辑</el-button>
    <!-- </div> -->
    <fieldDialog
      ref="fieldDialogRef"
      :default-object-name="optionModel.defaultObjectName"
      :default-selected-fields="optionModel.defaultSelectedFields"
      @confirm="handleConfirm"
    />
  </el-form-item>
  <el-form-item label="字段属性" label-position="top">
    <el-table
      border
      id="table_count"
      :data="optionModel.tableItems"
      height="200px"
      style="width: 100%"
    >
      <el-table-column prop="label" label="字段名"></el-table-column>
      <el-table-column prop="prop" label="字段值"></el-table-column>
      <el-table-column prop="width" label="宽度"></el-table-column>
      <el-table-column prop="fixed" label="是否固定"></el-table-column>
    </el-table>
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 10px;
      "
    >
      <el-button type="primary" block @click="openAttrDialog"
        >编辑属性</el-button
      >
    </div>
    <attrSetting
      ref="attrSettingRef"
      @confirm="handleConfirmAttr"
      :table-items="optionModel.tableItems"
    />
  </el-form-item>
</template>

<script setup>
import { ref } from "vue";
import { Rank } from "@element-plus/icons-vue";

import fieldDialog from "./field-dialog.vue";
import attrSetting from "./attr-setting.vue";
let props = defineProps({
  designer: Object,
  selectedWidget: Object,
  optionModel: Object
});

const fieldDialogRef = ref(null);
const attrSettingRef = ref(null);
const openDialog = () => {
  fieldDialogRef.value.openDialog();
};
const openAttrDialog = () => {
  attrSettingRef.value.openDialog();
};
const handleConfirm = ({
  selectedFields,
  selectedFieldsInfo,
  selectedObject
}) => {
  props.optionModel.defaultSelectedFields = selectedFields;
  props.optionModel.defaultObjectName = selectedObject.ObjectName;
  let arr = selectedFieldsInfo.map((element) => {
    return {
      label: element.DisplayName,
      prop: element.FieldName,
      width: "auto",
      fixed: false,
      align: "center",
      headerAlign: "center"
    };
  });
  arr.forEach((item, i) => {
    props.optionModel.tableItems.forEach((it) => {
      if (item.prop == it.prop) {
        arr[i] = { ...item, ...it };
      }
    });
  });
  props.optionModel.tableItems = JSON.parse(JSON.stringify(arr));
};

const handleConfirmAttr = (tableItems) => {
  props.optionModel.tableItems = JSON.parse(JSON.stringify(tableItems));
};
</script>

<script>
export default {
  name: "eltable-tableItems-editor"
};
</script>

<style scoped></style>
