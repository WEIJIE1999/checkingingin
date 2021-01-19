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
      <el-button class="addBtn" @click="this.addUservisible = true"
        >添加用户</el-button
      >
      <!-- 导入用户按钮 -->
      <el-button style="margin-left:40px" class="addBtn">导入用户</el-button>
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="userList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="datee" label="序号"> </el-table-column>
        <el-table-column prop="namee" label="用户姓名"> </el-table-column>
        <el-table-column prop="addresse" label="联系电话"> </el-table-column>
        <el-table-column prop="oute" label="添加"> </el-table-column>
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
                @click="showEditDialog(scope.row.id)"
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
                @click="removeUserByid(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户弹框 -->
    <addUser />
  </div>
</template>

<script>
import addUser from "@/components/addUser.vue";
export default {
  components: { addUser },
  data() {
    return {
      visible: false,
      searchTitle: "",
      select: "",
      userList: [],
      loading: true,
      addUservisible: false
    };
  },
  methods: {
    reset() {
      this.searchTitle = "";
      this.select = "";
    },
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
