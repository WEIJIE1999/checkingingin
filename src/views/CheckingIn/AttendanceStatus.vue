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
        <el-breadcrumb-item>考勤状态管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索表单 -->
      <el-form size="small" label-width="80px" inline>
        <el-form-item label="状态名称:">
          <el-select
            clearable
            class="status"
            v-model="status"
            placeholder="请选择考勤状态"
          >
            <el-option label="签到正常" value="签到正常"></el-option>
            <el-option label="迟到" value="迟到"></el-option>
            <el-option label="早退" value="早退"></el-option>
            <el-option label="迟到转事假" value="迟到转事件假"></el-option>
            <el-option label="签退正常" value="签退正常"></el-option>
            <el-option label="缺卡" value="缺卡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button id="searchBtn" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button size="large" id="searchBtn" @click="onDialog('addStatus')"
        >添加状态</el-button
      >
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="statusList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column sortable prop="id" label="序号"> </el-table-column>
        <el-table-column prop="name" label="状态名称"> </el-table-column>
        <el-table-column prop="explains" label="规则设置"> </el-table-column>
        <el-table-column sortable prop="createTime" label="添加时间">
          <template slot-scope="scope">{{
            scope.row.createTime | dataFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--删除按钮-->
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteById(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加状态弹框 -->
    <addStatus :addDialog.sync="addStatusVisible" @clickClose="clickClose" />
  </div>
</template>

<script>
import { getStatusList, deleteStautus } from "@/utils/request/status";
import addStatus from "@/components/statusDialog/addStatus.vue";
export default {
  components: { addStatus },
  data() {
    return {
      // 数据总条数
      total: 0,
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        currPage: 1,
        pageSize: 5
      },
      //   考勤状态选择
      status: "",
      //   数据操作loading效果
      loading: true,
      statusList: [],
      //   添加状态弹框显示
      addStatusVisible: false,
      //   删除的Id
      deleteId: ""
    };
  },
  //   初始化表格数据
  mounted() {
    this.getStatus();
  },
  methods: {
    //   关闭添加框
    clickClose() {
      this.addStatusVisible = false;
      this.getStatus();
    },
    //   搜索
    async search() {
      this.loading = false;
      const data = await getStatusList({
        currPage: this.queryInfo.currPage,
        pageSize: this.queryInfo.pageSize,
        statusName: this.status
      });
      this.statusList = data.data;
      this.$message.success("搜索成功");
    },
    //   根据id删除
    deleteById(row) {
      this.$confirm("是否确定删除改考勤状态？", "删除状态", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          await deleteStautus({ id: row.id, version: row.version });
          this.getStatus();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    //   重置按钮
    reset() {
      this.queryInfo.currPage = 1;
      this.queryInfo.pageSize = 5;
      this.status = "";
      this.getStatus();
    },
    //   监听全部弹窗点击事件
    onDialog(type) {
      this.loading = false;
      switch (type) {
        case "addStatus":
          this.addStatusVisible = true;
          break;
      }
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getStatus();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currPage = newPage;
      this.this.getStatus();
    },
    // 获取表单数据
    async getStatus() {
      this.loading = true;
      const data = await getStatusList({
        currPage: this.queryInfo.currPage,
        pageSize: this.queryInfo.pageSize
      });
      this.statusList = data.data;
      this.loading = false;
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
}
</style>
