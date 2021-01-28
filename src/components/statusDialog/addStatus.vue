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
          @change="changeStatus"
        >
          <el-option label="签到正常" value="签到正常"></el-option>
          <el-option label="迟到" value="迟到"></el-option>
          <el-option label="早退" value="早退"></el-option>
          <el-option label="迟到转事假" value="迟到转事假"></el-option>
          <el-option label="签退正常" value="签退正常"></el-option>
          <el-option label="缺卡" value="缺卡"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态规则判断 -->
      <el-form-item label="状态规则:" prop="value">
        <p v-show="addStatus.statusName === ''">-</p>
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
        <p v-show="addStatus.statusName === '缺卡'">无打卡记录</p>
        <div
          v-show="
            addStatus.statusName === '早退' ||
              addStatus.statusName === '签到正常'
          "
        >
          <span>在 </span>
          <el-time-select
            v-model="addStatus.value"
            :picker-options="{
              step: '00:01'
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
              step: '00:01'
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
import { addStatus } from "@/utils/request/status";
export default {
  props: ["addDialog"],
  data() {
    return {
      // 添加状态参数
      addStatus: {
        statusName: "",
        value: ""
      },
      //   开始时间
      frontTime: "",
      //   结束时间
      backTime: "",
      //   规则描述
      explains: "",
      //   添加状态规则
      addRules: {
        statusName: [
          { required: true, message: "请输入状态名称", trigger: "blur" }
        ],
        value: [{ required: true, message: "请选择签到状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    //   下拉框改变
    changeStatus() {
      this.addStatus.value = "";
    },
    //   关闭表单
    handleClose() {
      this.addStatus.statusName = "";
      this.$emit("update:addDialog", false);
      this.$emit("update:loading", false);
    },
    // 添加按钮触发
    addBtn() {
      if (this.addStatus.statusName === "缺卡") {
        this.explains = "无打卡记录";
        this.addStatus.value = "无打卡记录";
      } else if (
        this.addStatus.statusName === "早退" ||
        this.addStatus.statusName === "签到正常"
      ) {
        this.explains = `在${this.addStatus.value}之前打卡`;
        this.frontTime = this.addStatus.value;
      } else if (
        this.addStatus.statusName === "迟到转事假" ||
        this.addStatus.statusName === "签退正常"
      ) {
        this.explains = `在${this.addStatus.value}之后打卡`;
        this.backTime = this.addStatus.value;
      } else if (this.addStatus.statusName === "迟到") {
        this.explains = `${(this.addStatus.value[0].getHours() + "").padStart(
          2,
          "0"
        ) +
          ":" +
          (this.addStatus.value[0].getMinutes() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[0].getSeconds() + "").padStart(2, "0")}至${(
          this.addStatus.value[1].getHours() + ""
        ).padStart(2, "0") +
          ":" +
          (this.addStatus.value[1].getMinutes() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[1].getSeconds() + "").padStart(
            2,
            "0"
          )}之间打卡`;
        this.frontTime =
          (this.addStatus.value[0].getHours() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[0].getMinutes() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[0].getSeconds() + "").padStart(2, "0");
        this.backTime =
          (this.addStatus.value[1].getHours() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[1].getMinutes() + "").padStart(2, "0") +
          ":" +
          (this.addStatus.value[1].getSeconds() + "").padStart(2, "0");
      }
      this.$refs.addRef.validate(async valid => {
        if (!valid) return;
        await addStatus({
          name: this.addStatus.statusName,
          explains: this.explains,
          frontTime: this.frontTime,
          backTime: this.backTime
        });
        this.addStatus.statusName = "";
        this.$emit("clickClose");
      });
    }
  }
};
</script>

<style></style>
