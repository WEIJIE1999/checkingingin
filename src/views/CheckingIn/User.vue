<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <span class="breadcurmbRight">当前位置:</span>考勤管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索栏 -->
      <el-form v-model="searchContent">
        <el-input
          v-model="searchContent.content"
          size="small"
          placeholder="请输入需要搜索的内容..."
          class="input-with-select"
          clearable
          @keyup.enter.native="search"
          @change="changeSearchContent"
        >
          <el-select
            slot="prepend"
            v-model="searchContent.select"
            style="width:100px"
            placeholder="请选择"
            clearable
            @change="changeSearchContent"
          >
            <el-option label="序号" value="id" />
            <el-option label="用户姓名" value="userName" />
            <el-option label="用户电话" value="userPhone" />
          </el-select>
          <el-button id="searchBtn" slot="append" size="small" @click="search">
            搜索
          </el-button>
        </el-input>
        <el-button
          style="margin-left:30px"
          size="small"
          type="warning"
          @click="reset"
        >
          重置
        </el-button>
      </el-form>
      <!-- 添加用户按钮 -->
      <el-button class="addBtn" @click="onDialog('addUser')">
        添加用户
      </el-button>
      <!-- 导入用户按钮 -->
      <el-button
        style="margin-left:40px"
        class="addBtn"
        @click="onDialog('importUser')"
      >
        导入用户
      </el-button>
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="userList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column sortable prop="id" label="序号" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="userPhone" label="手机号码" />
        <el-table-column sortable prop="createTime" label="添加时间">
          <template slot-scope="scope">{{
            scope.row.createTime | dataFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
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
                @click="onDialog('addUser', scope.row)"
              />
            </el-tooltip>
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
                @click="deleteById(scope.row.id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
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
    <!-- 添加用户弹框 -->
    <addUser
      :editList="editList"
      :add-dialog.sync="addUservisible"
      :loading.sync="loading"
      @clickClose="clickClose"
    />
    <!-- 导入用户弹框 -->
    <importUser
      :import-dialog.sync="importUservisible"
      @clickClose="clickClose"
      :loading.sync="loading"
    />
  </div>
</template>

<script>
import { getUserList, deleteUser } from "@/utils/request/user";
import addUser from "@/components/userDialog/addUser.vue";
import importUser from "@/components/userDialog/importUser.vue";
export default {
  components: { addUser, importUser },
  data() {
    return {
      searchForm: {
        id: "",
        userName: "",
        userPhone: ""
      },
      // 搜索信息
      searchContent: {
        content: "",
        select: ""
      },
      //   搜索参数
      searchAll: "",
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        currPage: 1,
        pageSize: 5
      },
      //   数据总条数
      total: 0,
      //   用户数据
      userList: [],
      // 操作数据loading效果
      loading: true,
      //   添加弹框显示
      addUservisible: false,
      //   导入弹框显示
      importUservisible: false,
      //   编辑信息
      editList: {},
      //   删除ID
      deleteId: "",
      //   没有选择下拉框时候
      theContent: ""
    };
  },
  //   初始化获取列表数据
  mounted() {
    this.getUser();
  },
  methods: {
    //   输入框内容改变
    changeSearchContent() {
      if (this.searchContent.select === "id") {
        this.searchForm.id = this.searchContent.content;
        this.theContent = "";
        this.searchForm.userName = "";
        this.searchForm.userPhone = "";
        console.log(this.searchForm.id);
      } else if (this.searchContent.select === "userName") {
        this.searchForm.userName = this.searchContent.content;
        this.theContent = "";
        this.searchForm.userPhone = "";
        this.searchForm.id = "";
        console.log(this.searchForm.userName);
      } else if (this.searchContent.select === "userPhone") {
        this.searchForm.userPhone = this.searchContent.content;
        this.theContent = "";
        this.searchForm.id = "";
        this.searchForm.userName = "";
        console.log(this.searchForm.userPhone);
      } else if (this.searchContent.select === "") {
        this.theContent = this.searchContent.content;
        this.searchForm.id = "";
        this.searchForm.userName = "";
        this.searchForm.userPhone = "";
      }
    },
    //   删除用户
    deleteById(id) {
      this.loading = true;
      this.$confirm("是否确定删除改用户？", "删除用户", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          await deleteUser({ id: id });
          this.getUser();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
          this.loading = false;
        });
    },
    //   获取用户列表
    async getUser() {
      this.loading = true;
      const data = await getUserList({
        id: this.searchForm.id,
        userName: this.searchForm.userName,
        userPhone: this.searchForm.userPhone,
        content: this.theContent,
        currPage: this.queryInfo.currPage,
        pageSize: this.queryInfo.pageSize
      });
      this.total = data.totalElements;
      this.userList = data.data;
      this.loading = false;
    },
    //   监听弹框回调事件
    clickClose(val, tVal) {
      this.loading = false;
      if (val === 1) {
        this.addUservisible = false;
        this.getUser();
      } else if (val === 4) {
        this.importUservisible = false;
        if (tVal === "0") {
          this.getUser();
        }
      }
    },
    // 监听点击弹框显示事件
    onDialog(type, id) {
      this.loading = false;
      switch (type) {
        case "addUser":
          this.loading = true;
          this.editList = id || {};
          this.addUservisible = true;
          break;
        case "importUser":
          this.loading = true;
          this.importUservisible = true;
          break;
      }
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUser();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.currPage = newPage;
      this.getUser();
    },

    // 重置表单
    reset() {
      this.queryInfo.currPage = 1;
      this.queryInfo.pageSize = 5;
      this.searchContent.content = "";
      this.searchContent.select = "";
      this.searchForm.userName = "";
      this.searchForm.userPhone = "";
      this.searchForm.id = "";
      this.theContent = "";
      this.getUser();
    },
    // 搜索
    async search() {
      this.queryInfo.currPage = 1;
      this.getUser();
      this.$message.success("搜索成功");
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcurmbRight {
  margin-right: 10px;
}
.input-with-select {
  width: 450px;
}
#searchBtn {
  background-color: #4180b1;
  color: white;
}
.addBtn {
  margin-top: 20px;
  background-color: #4180b1;
  color: white;
  border-radius: 10px;
}
</style>
