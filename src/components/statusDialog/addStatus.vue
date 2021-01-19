<template>
  <el-dialog
    title="添加状态"
    :visible.sync="addDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      label-width="100px"
      :model="addStatus"
      :rules="addRules"
      ref="addRef"
    >
      <el-form-item label="状态名称:" prop="statusName">
        <el-select
          class="status"
          v-model="addStatus.statusName"
          placeholder="请选择"
        >
          <el-option label="1111" value="迟到"> </el-option>
          <el-option label="222" value="迟到"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态规则:" prop="value">
        <p v-show="this.addStatus.statusName === ''">-</p>
        <el-time-picker
          v-show="this.addStatus.statusName === '迟到'"
          is-range
          v-model="addStatus.value"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
        <p v-show="this.addStatus.statusName === '缺卡'">无打卡记录</p>
        <el-time-select
          v-show="
            this.addStatus.statusName === '早退' ||
              this.addStatus.statusName === '签到正常'
          "
          v-model="addStatus.value"
          :picker-options="{
            step: '00:15'
          }"
          placeholder="选择时间"
        >
          <p>在</p>
        </el-time-select>
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
    return {
      addStatus: {
        statusName: "",
        value: ""
      },
      addRules: {
        statusName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        value: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.addStatus.statusName = "";
      this.$emit("closeAdd", false);
    },
    addBtn() {}
  }
};
</script>

<style></style>
