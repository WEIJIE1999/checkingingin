<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          ><span class="breadcurmbRight">当前位置:</span
          >考勤管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索表单 -->
      <el-form ref="searchform" :model="searchform" label-width="80px" inline>
        <el-form-item prop="status" size="small" label="活动区域:">
          <el-select
            clearable
            class="status"
            v-model="searchform.status"
            placeholder="请选择考勤状态"
          >
            <el-option label="签到正常" value="签到正常"></el-option>
            <el-option label="迟到" value="迟到"></el-option>
            <el-option label="早退" value="早退"></el-option>
            <el-option label="迟到转事假" value="迟到转事假"></el-option>
            <el-option label="签退正常" value="签退正常"></el-option>
            <el-option label="缺卡" value="缺卡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="theData" size="small" label="考勤时间:">
          <el-date-picker
            clearable
            class="newdata"
            v-model="searchform.theData"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="search" size="small">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="searchform.content"
            @keyup.enter.native="search"
          >
            <template slot="append">
              <el-button id="searchBtn" @click="search">搜索</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 添加考勤记录按钮 -->
      <el-button class="addBtn" @click="DialogAddVisible"
        >添加考勤记录</el-button
      >
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="attendanceList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="userName" label="用户姓名"> </el-table-column>
        <el-table-column sortable prop="checkTime" label="考勤时间">
        </el-table-column>
        <el-table-column prop="startStatus" label="签到状态"> </el-table-column>
        <el-table-column prop="endStatus" label="签退状态"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="queryInfo.currPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加考勤记录弹框 -->
    <el-dialog
      title="添加考勤信息"
      :visible.sync="DialogAdd"
      width="30%"
      @close="handleClose"
    >
      <el-form
        :rules="addRules"
        :model="addForm"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item label="用户姓名" prop="id">
          <el-select
            class="status"
            ref="selectCh"
            v-model="addForm.id"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in userList"
              :key="index"
              :label="item.userName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤时间" prop="checkTime">
          <el-date-picker
            clearable
            v-model="addForm.checkTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAttendanceBtn">确 定</el-button>
        <el-button @click="DialogAdd = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAttendanceList,
  getallUserList,
  addAttendance
} from "@/utils/request/myAttendance";
export default {
  data() {
    return {
      // 下拉框label值
      userName: "",
      // 全部成员列表
      userList: [],
      // 数据列表
      attendanceList: [],
      //   分页
      queryInfo: {
        // 当前的页数
        currPage: 1,
        pageSize: 5
      },
      //   数据总条数
      total: 0,
      // 操作数据loading效果
      loading: true,
      //   搜索表单数据
      searchform: {
        status: "",
        theData: "",
        content: ""
      },
      //   添加弹框
      DialogAdd: false,
      addForm: {
        id: "",
        checkTime: ""
      },
      //   添加数据规则
      addRules: {
        name: [{ required: true, message: "请选择人员", trigger: "blur" }],
        data: [{ required: true, message: "请选择打卡时间", trigger: "blur" }]
      }
    };
  },
  //   初始化获取数据
  mounted() {
    this.getAttendanceList();
    this.getallList();
  },
  methods: {
    //   添加考勤
    async addAttendanceBtn() {
      if (this.addForm.checkTime < new Date()) {
        this.$refs.addForm.validate(async valid => {
          if (!valid) return;
          await addAttendance({
            userName: this.$refs.selectCh.selected.label,
            userId: this.addForm.id,
            checkTime: this.addForm.checkTime
              ? this.addForm.checkTime.getFullYear() +
                "-" +
                (this.addForm.checkTime.getMonth() + 1 + "").padStart(2, "0") +
                "-" +
                (this.addForm.checkTime.getDate() + "").padStart(2, "0") +
                " " +
                (this.addForm.checkTime.getHours() + "").padStart(2, "0") +
                ":" +
                (this.addForm.checkTime.getMinutes() + "").padStart(2, "0") +
                ":" +
                (this.addForm.checkTime.getSeconds() + "").padStart(2, "0")
              : ""
          });
          this.DialogAdd = false;
          this.$refs.addForm.resetFields();
          this.getAttendanceList();
        });
      } else this.$message.error("打卡时间不能超过现在的时间");
      this.DialogAdd = false;
      this.loading = false;
    },
    //   获取全部成员
    async getallList() {
      this.loading = true;
      const data = await getallUserList();
      this.userList = data;
      this.loading = false;
    },
    //   获取我的考勤列表
    async getAttendanceList() {
      this.loading = true;
      const data = await getAttendanceList({
        status: this.searchform.status,
        startTime: this.searchform.theData[0]
          ? this.searchform.theData[0].getFullYear() +
            "-" +
            (this.searchform.theData[0].getMonth() + 1 + "").padStart(2, "0") +
            "-" +
            (this.searchform.theData[0].getDate() + "").padStart(2, "0") +
            " " +
            (this.searchform.theData[0].getHours() + "").padStart(2, "0") +
            ":" +
            (this.searchform.theData[1].getMinutes() + "").padStart(2, "0") +
            ":" +
            (this.searchform.theData[1].getSeconds() + "").padStart(2, "0")
          : "",
        endtTime: this.searchform.theData[1]
          ? this.searchform.theData[1].getFullYear() +
            "-" +
            (this.searchform.theData[1].getMonth() + 1 + "").padStart(2, "0") +
            "-" +
            (this.searchform.theData[1].getDate() + "").padStart(2, "0") +
            " " +
            (this.searchform.theData[1].getHours() + "").padStart(2, "0") +
            ":" +
            (this.searchform.theData[1].getMinutes() + "").padStart(2, "0") +
            ":" +
            (this.searchform.theData[1].getSeconds() + "").padStart(2, "0")
          : "",
        content: this.searchform.content,
        currPage: this.queryInfo.currPage,
        pageSize: this.queryInfo.pageSize
      });
      this.total = data.totalElement;
      this.attendanceList = data.data;
      this.loading = false;
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAttendanceList();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currPage = newPage;
      this.getAttendanceList();
    },
    // 搜索
    async search() {
      this.queryInfo.currPage = 1;
      this.getAttendanceList();
      this.$message.success("搜索成功");
    },
    //   重置表单
    reset() {
      this.queryInfo.currPage = 1;
      this.queryInfo.pageSize = 5;
      this.$refs.searchform.resetFields();
      this.getAttendanceList();
    },
    // 关闭弹框重置
    handleClose() {
      this.$refs.addForm.resetFields();
      this.loading = false;
    },
    // 点击打开弹框
    DialogAddVisible() {
      this.DialogAdd = true;
      this.loading = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcurmbRight {
  margin-right: 10px;
}
#searchBtn {
  background-color: #4180b1;
  color: white;
  width: 80px;
}
.addBtn {
  background-color: #4180b1;
  color: white;
}
</style>
