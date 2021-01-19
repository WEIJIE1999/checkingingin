<template>
  <div>
    <el-card>
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
        :data="userList"
        height="550"
        max-height="550"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="datee" label="考勤组名称"> </el-table-column>
        <el-table-column prop="namee" label="考勤人数"> </el-table-column>
        <el-table-column prop="addresse" label="类型"> </el-table-column>
        <el-table-column prop="oute" label="考勤时间"> </el-table-column>
        <el-table-column prop="outte" label="状态"> </el-table-column>
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
                @click="editDialog(scope.row.id)"
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
                @click="deleteDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <addGroup :addDialog="addDialog" @closeAdd="closeAdd" />
  </div>
</template>

<script>
import addGroup from "@/components/groupDialog/addGroup";
export default {
  components: { addGroup },
  data() {
    return {
      loading: true,
      addDialog: false
    };
  },
  methods: {
    addGroup() {
      this.addDialog = true;
    },
    closeAdd(val) {
      this.addDialog = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcurmbRight {
  margin-right: 10px;
}
</style>
