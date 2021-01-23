<template>
  <!-- 选择人员弹框 -->
  <el-dialog
    title="提示"
    :visible.sync="addManDialog"
    width="35%"
    :before-close="handleClose"
  >
    <el-transfer
      filterable
      :filter-method="filterMethod"
      v-model="value"
      :props="{
        key: 'id',
        label: 'userName'
      }"
      :data="userData"
    >
    </el-transfer>
    <span slot="footer" class="dialog-footer"
      ><el-button type="primary" @click="addMan">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { searchUser } from "@/utils/request/user";
export default {
  props: {
    addManDialog: {
      Boolean
    }
  },
  data() {
    return {
      value: [],
      userData: [],
      userList: [],
      filterMethod(query, item) {
        return item.userName.indexOf(query) > -1;
      }
    };
  },
  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      const data = await searchUser();
      this.userData = data;
    },
    //   确定添加
    addMan() {},
    // 关闭弹框
    handleClose() {
      this.$emit("update:addManDialog", false);
    }
  }
};
</script>

<style></style>
