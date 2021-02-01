<template>
  <!-- 用户添加弹框 -->
  <el-dialog
    :title="Object.keys(editList).length > 0 ? '编辑用户' : '添加用户'"
    :visible.sync="addDialog"
    width="30%"
    :before-close="handleClose"
  >
    <!-- 添加表单 -->
    <el-form
      label-width="100px"
      :model="addUser"
      :rules="addRules"
      ref="addRef"
    >
      <el-form-item label="用户姓名:" prop="userName">
        <el-input v-model="addUser.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="userPhone">
        <el-input v-model="addUser.userPhone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addBtn">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser, editUser } from "@/utils/request/user";
export default {
  props: ["addDialog", "editList"],
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
        userName: "",
        userPhone: ""
      },
      //   添加规则
      addRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: checkMobile,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    //   监听prop的editList属性
    editList: {
      handler(nVal) {
        if (nVal && Object.keys(nVal).length > 0) {
          this.addUser.userName = nVal.userName;
          this.addUser.userPhone = nVal.userPhone;
        } else {
          this.addUser.userName = "";
          this.addUser.userPhone = "";
        }
      },
      deep: true
    }
  },
  //   mounted() {
  //     if (Object.keys(this.editList).length > 0) {
  //       this.addUser.userName = this.editList.userName;
  //       this.addUser.userPhone = this.editList.userPhone;
  //     }
  //   },
  methods: {
    //   重置表单关闭弹框
    handleClose() {
      //   this.$refs.addRef.resetFields();
      //   this.$emit("clickClose", 1);
      this.$emit("update:addDialog", false);
      this.$emit("update:loading", false);
      this.$refs["addRef"].clearValidate();
    },
    // 添加功能
    addBtn() {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return;
        if (this.editList && Object.keys(this.editList).length > 0) {
          await editUser({
            id: this.editList.id,
            userName: this.addUser.userName,
            userPhone: this.addUser.userPhone,
            version: this.editList.version
          });
          this.$emit("clickClose", 1);
          this.$refs.addRef.resetFields();
        } else {
          await addUser(this.addUser);
          this.$emit("clickClose", 1);
          this.$refs.addRef.resetFields();
        }
      });
    }
  }
};
</script>

<style></style>
