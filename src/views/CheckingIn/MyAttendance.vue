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
            <el-option label="迟到转事假" value="迟到转事件假"></el-option>
            <el-option label="签到正常" value="签到正常"></el-option>
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
            @change="search"
            clearable
            placeholder="请输入内容"
            v-model="searchform.search"
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
        :data="attendanceDate"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="datee" label="用户姓名"> </el-table-column>
        <el-table-column sortable prop="namee" label="考勤时间">
        </el-table-column>
        <el-table-column prop="addresse" label="签到状态"> </el-table-column>
        <el-table-column prop="oute" label="签退状态"> </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
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
        <el-form-item label="用户姓名" prop="name">
          <el-select class="status" v-model="addForm.name" placeholder="请选择">
            <el-option label="小红" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考勤时间" prop="data">
          <el-date-picker
            clearable
            v-model="addForm.data"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogAdd = false">确 定</el-button>
        <el-button @click="DialogAdd = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        pageSize: 5
      },
      //   数据总条数
      total: "",
      // 操作数据loading效果
      loading: true,
      attendanceDate: [],
      searchform: {
        status: "",
        theData: "",
        search: ""
      },
      //   添加弹框
      DialogAdd: false,
      addForm: {
        name: "",
        data: ""
      },
      //   添加数据规则
      addRules: {
        name: [{ required: true, message: "请选择人员", trigger: "blur" }],
        data: [{ required: true, message: "请选择打卡时间", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getGroupList();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.this.getGroupList();
    },
    // 搜索
    search() {
      console.log("111");
    },
    //   重置表单
    reset() {
      this.$refs.searchform.resetFields();
    },
    // 关闭弹框重置
    handleClose() {
      this.$refs.addForm.resetFields();
    },
    // 点击打开弹框
    DialogAddVisible() {
      this.DialogAdd = true;
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
