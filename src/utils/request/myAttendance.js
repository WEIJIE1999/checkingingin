// 我的考勤接口
import https from "@/utils/https";
import Message from "element-ui/packages/message";

/* 获取考勤列表 */
export const getAttendanceList = (params = {}) => {
  return https.get("/self/queryMyCheckList", params).then(res => {
    if (res.code === "0") {
      return res.data;
    } else {
      return false;
    }
  });
};

/* 添加考勤 */
export const addAttendance = (params = {}) => {
  return https.post("self/addUserCheck", params).then(res => {
    Message({
      type: res.code === "0" ? "success" : "error",
      message: res.data
    });
    return res.code === "0";
  });
};

// 获取全部用户
export const getallUserList = (params = {}) => {
  return https.get("/user/userList", params).then(res => {
    if (res.code === "0") {
      return res.data;
    } else {
      return false;
    }
  });
};
