<template>
  <div class="about">
    <el-container>
      <el-header height="80px" class="header">
        <div>主页</div>
        <div>系统配置</div>
        <div>考勤管理</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" style="width:190px;height:820px">
            <el-menu-item @click="myAttendance" index="1">
              <i class="el-icon-timer"></i>
              <span slot="title">我的考勤</span>
            </el-menu-item>
            <el-menu-item @click="user" index="2">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item @click="attendanceStatus" index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">考勤状态管理</span>
            </el-menu-item>
            <el-menu-item @click="attendanceGroup" index="4">
              <i class="el-icon-tickets"></i>
              <span slot="title">考勤组管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    myAttendance() {
      if (this.$router.history.current.path !== "/attendance/myAttendance") {
        this.$router.push("/attendance/myAttendance");
      }
    },
    user() {
      if (this.$router.history.current.path !== "/attendance/user") {
        this.$router.push("/attendance/user");
      }
    },
    attendanceStatus() {
      if (
        this.$router.history.current.path !== "/attendance/attendanceStatus"
      ) {
        this.$router.push("/attendance/attendanceStatus");
      }
    },
    attendanceGroup() {
      if (this.$router.history.current.path !== "/attendance/attendanceGroup") {
        this.$router.push("/attendance/attendanceGroup");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #4180b1;
  div {
    font-size: 18px;
    color: white;
    float: left;
    line-height: 80px;
    width: 250px;
    text-align: center;
  }
}
.header div:nth-child(1) {
  margin-left: 250px;
}
.header div:nth-child(3) {
  background-color: #f0f0f0;
  border-bottom: 4px solid orange;
  color: black;
  box-sizing: border-box;
  font-weight: bold;
  line-height: 76px;
}
</style>
