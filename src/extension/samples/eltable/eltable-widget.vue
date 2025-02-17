<template>
  <static-content-wrapper
    :designer="designer"
    :field="field"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <!-- <el-alert
      ref="fieldEditor"
      :title="field.options.title"
      :type="field.options.type"
      :description="field.options.description"
      :closable="field.options.closable"
      :center="field.options.center"
      :close-text="field.options.closeText"
      :show-icon="field.options.showIcon"
      :effect="field.options.effect"
      @close="handleCloseCustomEvent"
    ></el-alert> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :border="field.options.border"
      :show-overflow-tooltip="field.options.tooltip"
    >
      <el-table-column
        v-for="item in tableItems"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template #default="scope">
          <el-button size="small"> 编辑 </el-button>
          <el-button size="small" type="danger"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div>{{ field.options.description }}</div> -->
  </static-content-wrapper>
</template>

<script>
import StaticContentWrapper from "@/components/form-designer/form-widget/field-widget/static-content-wrapper";
import emitter from "@/utils/emitter";
import i18n from "@/utils/i18n";
import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "eltable-widget",
  componentName: "FieldWidget", //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n],
  data: () => {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  },
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    designState: {
      type: Boolean,
      default: false
    },

    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
      default: ""
    }
  },
  computed: {
    tableItems() {
      return this.field.options.tableItems;
    }
  },
  components: {
    StaticContentWrapper
  },
  created() {
    this.registerToRefList();
    this.initEventHandler();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    handleCloseCustomEvent() {
      if (!!this.field.options.onClose) {
        let changeFn = new Function(this.field.options.onClose);
        changeFn.call(this);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
