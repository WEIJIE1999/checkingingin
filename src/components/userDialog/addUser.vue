<template>
  <el-dialog
    title="添加用户"
    :visible.sync="addDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="addUser"
      :rules="addRules"
      ref="addRef"
    >
      <el-form-item label="用户姓名:" prop="name">
        <el-input v-model="addUser.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phoneNumber">
        <el-input v-model="addUser.phoneNumber"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addBtn">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["addDialog"],
  data() {
    // 验证手机的功能
    const checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 添加表单
      addUser: {
        name: "",
        phoneNumber: ""
      },
      //   添加规则
      addRules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请选择活动区域", trigger: "change" },
          {
            validator: checkMobile,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //   重置表单关闭弹框
    handleClose() {
      this.$refs.addRef.resetFields();
      this.$emit("clickClose", 1);
    },
    // 添加功能
    addBtn() {}
  }
};
</script>

<style></style>
