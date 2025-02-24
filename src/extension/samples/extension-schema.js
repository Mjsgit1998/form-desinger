export const cardSchema = {
  type: "card",
  category: "container",
  icon: "card",
  widgetList: [],
  options: {
    name: "",
    label: "card",
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: "100%",
    shadow: "never",
    customClass: ""
  }
};

export const alertSchema = {
  type: "alert",
  icon: "alert",
  formItemFlag: false,
  options: {
    name: "",
    title: "Good things are coming...",
    type: "info",
    description: "",
    closable: true,
    closeText: "",
    center: true,
    showIcon: false,
    effect: "light",
    hidden: false,
    onClose: "",
    customClass: ""
  }
};

export const eltableSchema = {
  type: "eltable",
  icon: "alert",
  formItemFlag: false,
  options: {
    border: true,
    tooltip: true,
    ifTool: true,
    defaultObjectName: "",
    defaultSelectedFields: [],
    tableItems: [
      // {
      //   label: "姓名",
      //   prop: "name",
      //   width: "100px",
      //   fixed: false
      // },
      // {
      //   label: "年龄",
      //   prop: "age",
      //   width: "100px",
      //   fixed: false
      // },
      // {
      //   label: "日期",
      //   prop: "date",
      //   width: "100px",
      //   fixed: false
      // },
      // {
      //   label: "地址",
      //   prop: "address",
      //   width: "100px",
      //   fixed: false
      // }
    ]
  }
};
