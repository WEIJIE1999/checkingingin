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
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button id="searchBtn" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button size="large" id="searchBtn">添加状态</el-button>
      <!-- 表格信息 -->
      <el-table
        v-loading="loading"
        :data="statusList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="datee" label="序号"> </el-table-column>
        <el-table-column prop="namee" label="状态名称"> </el-table-column>
        <el-table-column prop="addresse" label="规则设置"> </el-table-column>
        <el-table-column prop="oute" label="添加时间"> </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "",
      loading: true,
      statusList: []
    };
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
