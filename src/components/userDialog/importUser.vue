<template>
  <el-dialog
    title="导入用户"
    :visible.sync="importDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="addUser"
      :rules="addRules"
      ref="addRef"
    >
      <el-form-item label="导入用户:" prop="roleName">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <el-button style="width:350px">点击选择文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="importBtn">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["importDialog"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("closeImport", false);
    },
    importBtn() {}
  }
};
</script>

<style></style>
