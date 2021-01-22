<template>
  <!-- 添加状态弹窗 -->
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
      <!-- 下拉 -->
      <el-form-item label="状态名称:" prop="statusName">
        <el-select
          class="status"
          v-model="addStatus.statusName"
          placeholder="请选择"
        >
          <el-option label="签到正常" value="签到正常"></el-option>
          <el-option label="迟到" value="迟到"></el-option>
          <el-option label="早退" value="早退"></el-option>
          <el-option label="迟到转事假" value="迟到转事件假"></el-option>
          <el-option label="签退正常" value="签退正常"></el-option>
          <el-option label="缺卡" value="缺卡"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态规则判断 -->
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
        <div
          v-show="
            this.addStatus.statusName === '早退' ||
              this.addStatus.statusName === '签到正常'
          "
        >
          <span>在 </span>
          <el-time-select
            v-model="addStatus.value"
            :picker-options="{
              step: '00:15'
            }"
            placeholder="选择时间"
          >
          </el-time-select>
          <span> 之前打卡</span>
        </div>
        <div
          v-show="
            this.addStatus.statusName === '迟到转事假' ||
              this.addStatus.statusName === '签退正常'
          "
        >
          <span>在 </span>
          <el-time-select
            v-model="addStatus.value"
            :picker-options="{
              step: '00:15'
            }"
            placeholder="选择时间"
          >
          </el-time-select>
          <span> 之后打卡</span>
        </div>
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
      // 添加状态参数
      addStatus: {
        statusName: "",
        value: ""
      },
      //   添加状态规则
      addRules: {
        statusName: [
          { required: true, message: "请输入状态名称", trigger: "blur" }
        ],
        value: [
          { required: true, message: "请选择签到状态", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.addStatus.statusName = "";
      this.$emit("update:addDialog", false);
    },
    addBtn() {}
  }
};
</script>

<style></style>
