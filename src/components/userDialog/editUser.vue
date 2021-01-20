<template>
  <el-dialog
    title="添加用户"
    :visible.sync="editDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="editUser"
      :rules="editRules"
      ref="addRef"
    >
      <el-form-item label="用户姓名:" prop="roleName">
        <el-input v-model="editUser.roleName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="editUser.phone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editBtn">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["editDialog", "editId"],
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
      editUser: {
        roleName: "",
        phone: ""
      },
      editRules: {
        roleName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        phone: [
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
    handleClose() {
      this.$refs.editRef.resetFields();
      this.$emit("clickClose", 3);
    },
    editBtn() {}
  }
};
</script>

<style></style>
