import service from "@/utils/request";

export function getObjectList() {
  return service({
    url: "/api/ObjectList",
    method: "get"
  });
}

export function getFieldListByName(name) {
  return service({
    url: "/api/FieldList/" + name,
    method: "get"
  });
}
