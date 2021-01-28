<template>
  <!-- 导入用户弹窗 -->
  <el-dialog
    title="导入用户"
    :visible.sync="importDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="importUser"
      :rules="importRules"
      ref="addRef"
    >
      <el-form-item ref="excel" label="导入用户:" prop="file">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="http://3091m9d958.zicp.vip/check/user/importByExcel"
          :auto-upload="false"
          :on-success="successUpload"
          :file-list="fileList"
          :on-change="handleChange"
          :on-error="errorUpload"
          :show-file-list="false"
        >
          <!-- 导入按钮 -->
          <el-button style="width:350px">{{ fileName }}</el-button>
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
    return {
      fileList: [],
      //   导入按钮绑定名字
      importUser: {
        file: ""
      },
      code: "",
      //   文件名
      fileName: "点击选择文件",
      //   导入用户规则
      importRules: {
        file: [{ required: true, message: "请导入文件", trigger: "change" }]
      }
    };
  },
  methods: {
    //   关闭弹窗
    handleClose() {
      this.$emit("update:import-dialog", false);
      this.$emit("update:loading", false);
      this.fileList = [];
      this.fileName = "点击选择文件";
    },
    // 确定按钮
    importBtn() {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return;
        this.$refs.upload.submit();
        this.fileName = "点击选择文件";
      });
    },
    // 成功上传
    successUpload(response) {
      if (response.code === "0") {
        this.$message.success(
          `成功导入${response.data.success},失败导入${response.data.fail}`
        );
        this.fileList = [];
        this.code = response.code;
        this.fileName = "点击选择文件";
        this.$refs.upload.clearFiles();
        this.$emit("clickClose", 4, this.code);
      }
    },
    // 筛选第一个选中文件
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的csv文件
        fileList = this.importUser.importMan;
        this.fileName = file.name;
        this.importUser.file = fileList;
        this.importUser.file = file;
      }
    },
    // 上传失败回调
    errorUpload() {
      this.$message.error("上传失败");
    }
  }
};
</script>

<style></style>
