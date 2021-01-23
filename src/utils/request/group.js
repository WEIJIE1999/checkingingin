// 考勤组管理接口
import https from "@/utils/https";
import Message from "element-ui/packages/message";

/* 获取用户列表 */
export const getGroup = (params = {}) => {
  return https.get("/group/queryGroupList", params).then(res => {
    if (res.code === "0") {
      return res.data;
    } else {
      return false;
    }
  });
};

/* 删除考勤组 */
export const deleteGroup = params => {
  return https.post("/group/delete", params).then(res => {
    res.code === "0" &&
      Message({
        type: "success",
        message: "删除成功!"
      });
    return res.code === "0";
  });
};
