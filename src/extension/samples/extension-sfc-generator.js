import {
  buildClassAttr,
  buildContainerWidget,
  buildFieldWidget
} from "@/utils/sfc-generator";

export const cardTemplateGenerator = function (cw, formConfig) {
  const wop = cw.options;
  //const headerAttr = `header="${wop.label}"`
  const classAttr = buildClassAttr(cw);
  const styleAttr = !!wop.cardWidth
    ? `style="{width: ${wop.cardWidth} !important}"`
    : "";
  const shadowAttr = `shadow="${wop.shadow}"`;
  const vShowAttr = !!wop.hidden ? `v-show="false"` : "";

  const cardTemplate = `<div class="card-container">
  <el-card ${classAttr} ${styleAttr} ${shadowAttr} ${vShowAttr}>
    <template #header>
      <div class="clear-fix">
        <span>${wop.label}</span>
        ${
          !!wop.showFold ? `<i class="float-right el-icon-arrow-down"></i>` : ""
        }
      </div>
    </template>
    ${cw.widgetList
      .map((wItem) => {
        if (wItem.category === "container") {
          return buildContainerWidget(wItem, formConfig);
        } else {
          return buildFieldWidget(wItem, formConfig);
        }
      })
      .join("")}
  </el-card>
</div>`;

  return cardTemplate;
};

export const alertTemplateGenerator = function (fw, formConfig) {
  const wop = fw.options;
  const titleAttr = `title="${wop.title}"`;
  const typeAttr = `type=${wop.type}`;
  const descriptionAttr = !!wop.description
    ? `description="${wop.description}"`
    : "";
  const closableAttr = `:closable="${wop.closable}"`;
  const closeTextAttr = !!wop.closeText ? `close-text="${wop.closeText}"` : "";
  const centerAttr = `:center="${wop.center}"`;
  const showIconAttr = `:show-icon="${wop.showIcon}"`;
  const effectAttr = `effect="${wop.effect}"`;

  const alertTemplate = `<el-alert ${titleAttr} ${typeAttr} ${descriptionAttr} ${closableAttr} ${closeTextAttr} ${centerAttr} 
  ${showIconAttr} ${effectAttr}>
</el-alert>`;

  return alertTemplate;
};

export const eltableTemplateGenerator = function (fw, formConfig) {
  const wop = fw.options;
  const borderAttr = `${wop.border ? "border" : ""}`;
  const titleAttr = `title="${wop.title}"`;
  const typeAttr = `type=${wop.type}`;
  const descriptionAttr = !!wop.description
    ? `description="${wop.description}"`
    : "";
  const closableAttr = `:closable="${wop.closable}"`;
  const closeTextAttr = !!wop.closeText ? `close-text="${wop.closeText}"` : "";
  const centerAttr = `:center="${wop.center}"`;
  const showIconAttr = `:show-icon="${wop.showIcon}"`;
  const effectAttr = `effect="${wop.effect}"`;

  const tableItemStr = `${fw.options.tableItems
    .map((it) => {
      return `<el-table-column prop="${it.prop}" label="${it.label}" width="${it.width}"></el-table-column>`;
    })
    .join("")}`;

  const eltableTemplate = `<el-table ${borderAttr} :data="[]" style="width: 100%" >
  ${tableItemStr}
  <el-table-column label="操作" align="center" fixed="right" width="150">
        <template #default="scope">
          <el-button size="small"> 编辑 </el-button>
          <el-button size="small" type="danger"> 删除 </el-button>
        </template>
      </el-table-column>
  </el-table>`;

  return eltableTemplate;
};
