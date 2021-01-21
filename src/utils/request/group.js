// 考勤组管理接口
import https from "@/utils/https";

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
