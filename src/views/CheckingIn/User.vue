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
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索栏 -->
      <el-form>
        <el-input
          @change="search"
          size="small"
          placeholder="请输入需要搜索的内容..."
          v-model="searchTitle"
          class="input-with-select"
          clearable
        >
          <el-select
            style="width:100px"
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            clearable
          >
            <el-option label="序号" value="1"></el-option>
            <el-option label="用户姓名" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button @click="search" size="small" id="searchBtn" slot="append"
            >搜索</el-button
          >
        </el-input>
        <el-button
          style="margin-left:30px"
          size="small"
          type="warning"
          @click="reset"
          >重置</el-button
        >
      </el-form>
      <!-- 添加用户按钮 -->
      <el-button class="addBtn" @click="onDialog('addUser')"
        >添加用户</el-button
      >
      <!-- 导入用户按钮 -->
      <el-button
        style="margin-left:40px"
        class="addBtn"
        @click="onDialog('importUser')"
        >导入用户</el-button
      >
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
        <el-table-column sortable prop="id" label="序号"> </el-table-column>
        <el-table-column prop="name" label="用户姓名"> </el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"> </el-table-column>
        <el-table-column sortable prop="createTime" label="添加时间">
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
                @click="onDialog('editUser', scope.row.id)"
              ></el-button>
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
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <!-- 添加用户弹框 -->
    <addUser :addDialog="addUservisible" @clickClose="clickClose" />
    <!-- 导入用户弹框 -->
    <importUser :importDialog="importUservisible" @clickClose="clickClose" />
    <!-- 编辑用户弹框 -->
    <editUser
      :editId="editId"
      :addDialog="editUservisible"
      @clickClose="clickClose"
    />
    <!-- 用户删除弹框 -->
    <deleteUser
      :deleteId="deleteId"
      :deleteDialog="deleteUservisible"
      @clickClose="clickClose"
    />
  </div>
</template>

<script>
import addUser from "@/components/userDialog/addUser.vue";
import deleteUser from "@/components/userDialog/deleteUser.vue";
import editUser from "@/components/userDialog/addUser.vue";
import importUser from "@/components/userDialog/importUser.vue";
export default {
  components: { addUser, importUser, editUser, deleteUser },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        pageSize: 5
      },
      //   数据总条数
      total: "",
      visible: false,
      searchTitle: "",
      select: "",
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
  methods: {
    //   监听弹框回调事件
    clickClose(val) {
      if (val === 1) {
        this.addUservisible = false;
      } else if (val === 2) {
        this.deleteUservisible = false;
      } else if (val === 3) {
        this.editUservisible = false;
      } else if (val === 4) {
        this.importUservisible = false;
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
      this.getGroupList();
    },
    // 监听页面值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.this.getGroupList();
    },
    //   打开删除弹框
    deleteDialog(val) {
      this.deleteUservisible = true;
      this.deleteId = val;
    },

    // 重置表单
    reset() {
      this.searchTitle = "";
      this.select = "";
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
