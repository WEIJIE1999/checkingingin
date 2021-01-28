// 考勤状态接口
import https from "@/utils/https";
import Message from "element-ui/packages/message";

/* 获取状态列表 */
export const getStatusList = (params = {}) => {
  return https.get("/status/queryMyCheckStatusList", params).then(res => {
    if (res.code === "0") {
      return res.data;
    } else {
      return false;
    }
  });
};

/* 状态添加 */
export const addStatus = params => {
  return https.post("/status/saveStatus", params).then(res => {
    if (res.code === "0") {
      Message({
        type: res.code === "0" ? "success" : "error",
        message: res.code === "0" ? "添加成功!" : res.message
      });
    }
    return res.code === "0";
  });
};

/* 删除状态 */
export const deleteStautus = params => {
  return https.post("/status/deleteStatus", params).then(res => {
    res.code === "0" &&
      Message({
        type: "success",
        message: "删除成功!"
      });
    return res.code === "0";
  });
};
