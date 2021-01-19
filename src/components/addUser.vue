<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {};
</script>

<style></style>
