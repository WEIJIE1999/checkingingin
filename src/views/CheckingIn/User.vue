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
        >
          <el-select
            slot="prepend"
            v-model="searchContent.select"
            style="width:100px"
            placeholder="请选择"
            clearable
          >
            <el-option label="序号" value="1" />
            <el-option label="用户姓名" value="2" />
            <el-option label="用户电话" value="3" />
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
        <el-table-column prop="userName" label="用户姓名" />
        <el-table-column prop="userPhone" label="联系电话" />
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
                @click="onDialog('editUser', scope.row)"
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
                @click="onDialog('deleteUser', scope.row.id)"
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
    <addUser :add-dialog="addUservisible" @clickClose="clickClose" />
    <!-- 导入用户弹框 -->
    <importUser :import-dialog="importUservisible" @clickClose="clickClose" />
    <!-- 编辑用户弹框 -->
    <editUser
      :edit-id="editId"
      :edit-dialog="editUservisible"
      @clickClose="clickClose"
    />
    <!-- 用户删除弹框 -->
    <deleteUser
      :delete-id="deleteId"
      :delete-dialog="deleteUservisible"
      @clickClose="clickClose"
    />
  </div>
</template>

<script>
import { getUserList } from "@/utils/request/user";
import addUser from "@/components/userDialog/addUser.vue";
import deleteUser from "@/components/userDialog/deleteUser.vue";
import editUser from "@/components/userDialog/editUser.vue";
import importUser from "@/components/userDialog/importUser.vue";
export default {
  components: { addUser, importUser, editUser, deleteUser },
  data() {
    return {
      // 搜索信息
      searchContent: {
        content: "",
        select: ""
      },
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
      //   修改弹框显示
      editUservisible: false,
      //   删除弹框显示
      deleteUservisible: false,
      //   修改ID
      editId: "",
      //   删除ID
      deleteId: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    //   获取用户列表
    async getUser() {
      this.loading = true;
      const data = await getUserList(this.queryInfo);
      this.total = data.totalElements;
      this.userList = data.data;
      this.loading = false;
    },
    //   监听弹框回调事件
    clickClose(val) {
      if (val === 1) {
        this.addUservisible = false;
        this.getUser();
      } else if (val === 2) {
        this.deleteUservisible = false;
        this.getUser();
      } else if (val === 3) {
        this.editUservisible = false;
        this.getUser();
      } else if (val === 4) {
        this.importUservisible = false;
        this.getUser();
      }
    },
    // 监听点击弹框显示事件
    onDialog(type, id) {
      this.loading = false;
      switch (type) {
        case "addUser":
          this.addUservisible = true;
          break;
        case "editUser":
          this.editUservisible = true;
          this.editId = id;
          break;
        case "importUser":
          this.importUservisible = true;
          break;
        case "deleteUser":
          this.deleteUservisible = true;
          this.deleteId = id;
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
      this.searchContent.content = "";
      this.searchContent.select = "";
    },
    // 搜索
    search() {}
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
