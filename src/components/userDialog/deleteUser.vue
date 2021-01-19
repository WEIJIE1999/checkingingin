<template>
  <el-dialog
    title="删除用户"
    :visible.sync="deleteDialog"
    width="30%"
    :before-close="handleClose"
  >
    <p class="text">是否确定删除改用户</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="deleteBtn">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["deleteDialog", "deleteId"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("closeDelete", false);
    },
    deleteBtn() {}
  }
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 20px;
  text-align: center;
  line-height: 200px;
  font-weight: bold;
}
</style>
