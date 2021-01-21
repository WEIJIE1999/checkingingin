// 我的考勤接口
import https from "@/utils/https";

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
