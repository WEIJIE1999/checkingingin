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

// 校验用户接口
export const checkMan = (params = {}) => {
  return https.post("/user/checkUser", params).then(res => {
    if (res.code === "0") {
      return res.data;
    } else {
      return false;
    }
  });
};

/* 考勤组添加 */
export const addGroup = params => {
  return https.post("/group/save", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "添加成功!" : res.message
    });
    return res.code === "0";
  });
};

/* 考勤组编辑 */
export const editGroup = params => {
  return https.post("/group/edit", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "编辑成功!" : res.message
    });
    return res.code === "0";
  });
};
