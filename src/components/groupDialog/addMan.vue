<template>
  <!-- 选择人员弹框 -->
  <el-dialog
    title="提示"
    :visible.sync="addManDialog"
    width="35%"
    :before-close="handleClose"
  >
    <el-transfer>
      filterable :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音" v-model="value" :data="data" >
    </el-transfer>
    <span slot="footer" class="dialog-footer"
      ><el-button type="primary" @click="addMan">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["addManDialog"],

  methods: {
    addMan() {},
    handleClose() {
      this.$emit("addManClose");
    }
  }
};
</script>

<style></style>
