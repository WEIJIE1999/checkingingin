// 用户接口
import https from "@/utils/https";
import Message from "element-ui/packages/message";

/* 获取用户列表 */
export const getUserList = (params = {}) => {
  return https.get("/user/listOfUser", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "查询成功!" : res.message
    });
    return res.data;
  });
};

/* 用户添加 */
export const addUser = params => {
  return https.post("/user/save", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "提交成功!" : res.message
    });
    return res.code === "0";
  });
};

/* 删除用户 */
export const deleteUser = params => {
  return https.post("/user/delete", params).then(res => {
    res.code === "0" &&
      Message({
        type: "success",
        message: "删除成功!"
      });
    return res.code === "0";
  });
};

/* 用户编辑 */
export const editUser = params => {
  return https.post("/user/edit", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "提交成功!" : res.message
    });
    return res.code === "0";
  });
};

/* 用户添加 */
export const searchUser = params => {
  return https.post("/user/userList", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.code === "0" ? "提交成功!" : res.message
    });
    return res.code === "0";
  });
};
