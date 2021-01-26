<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          ><span class="breadcurmbRight">当前位置:</span>
          考勤管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>考勤组管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 添加按钮 -->
      <el-button
        style="background-color: #4180b1;
         color: white;
         border-radius: 10px;
         width:150px"
        @click="addGroup"
        >增加考勤组</el-button
      >
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="groupList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="考勤组名称"> </el-table-column>
        <el-table-column prop="total" label="考勤人数"> </el-table-column>
        <el-table-column prop="chineseName" label="类型"> </el-table-column>
        <el-table-column prop="checkTime" label="考勤时间"></el-table-column>
        <el-table-column prop="status" label="状态" width="500px">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-tooltip
              effect="dark"
              content="编辑信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip
              v-if="scope.row.name !== '默认考勤组'"
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
                @click="deleteById(scope.row.id)"
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
    <!-- 增加弹框 -->
    <addGroup
      :editList="editList"
      :addDialog.sync="addDialog"
      @closeAdd="closeAdd"
    />
  </div>
</template>

<script>
import addGroup from "@/components/groupDialog/addGroup";
import { getGroup, deleteGroup } from "@/utils/request/group";
export default {
  components: { addGroup },
  data() {
    return {
      // 修改列表
      editList: {},
      // 考勤组表格
      groupList: [],
      // 数据表格是否操作完成
      loading: true,
      //   控制添加弹框出现
      addDialog: false,
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        currPage: 1,
        pageSize: 5
      },
      //   数据总条数
      total: 0
    };
  },
  //   进入页面初始化数据
  mounted() {
    this.getGroupList();
  },
  methods: {
    //   删除按钮
    deleteById(id) {
      this.$confirm("是否确定删除该考勤组？", "删除考勤组", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          await deleteGroup({ id: id });
          this.getGroupList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getGroupList();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currPage = newPage;
      this.getGroupList();
    },
    // 获取状态列表
    async getGroupList() {
      this.loading = true;
      const data = await getGroup(this.queryInfo);
      this.groupList = data.data;
      this.total = data.totalElement;
      this.loading = false;
    },
    // 关闭添加弹框
    closeAdd() {
      this.getGroupList();
    },
    // 添加时候打开弹框
    addGroup() {
      this.addDialog = true;
      this.editList = {};
    },
    // 修改时候打开弹框
    editDialog(editList) {
      this.addDialog = true;
      this.editList = editList;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcurmbRight {
  margin-right: 10px;
}
</style>
