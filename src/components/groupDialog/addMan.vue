<template>
  <!-- 选择人员弹框 -->
  <el-dialog
    :append-to-body="true"
    :modal-append-to-body="false"
    title="选择人员"
    :visible.sync="addManDialog"
    width="35%"
    :before-close="handleClose"
  >
    <!-- 穿梭框 -->
    <el-transfer
      filterable
      :filter-method="filterMethod"
      v-model="value"
      :props="{
        key: 'id',
        label: 'userName'
      }"
      :data="userData"
      :titles="['选择框', '选中框']"
      ref="myTransfer"
    >
    </el-transfer>
    <span slot="footer" class="dialog-footer"
      ><el-button type="primary" @click="addMan">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkMan } from "@/utils/request/group";
import { searchUser } from "@/utils/request/user";
export default {
  props: {
    addManDialog: Boolean,
    userList: Array,
    groupId: {
      type: Number
    }
  },
  data() {
    return {
      // 穿梭框绑定的值
      value: [],
      //   穿梭框默认数据
      userData: [],
      //   添加时候的数据转换
      manId: "",
      //   进入添加页面初始的选中值
      defaultValue: [],
      //   效验信息
      alertContent: [],
      //   穿梭框验证规则
      filterMethod(query, item) {
        return item.userName.indexOf(query) > -1;
      }
    };
  },
  //   初始化获取值
  mounted() {
    this.getUser();
    if (this.userList && this.userList.length > 0) {
      this.value = [];
      this.defaultValue = [];
      for (let i = 0; i < this.userList.length; i++) {
        this.value.push(this.userList[i].id);
        this.defaultValue.push(this.userList[i].id);
      }
    } else {
      this.value = [];
      this.defaultValue = [];
    }
  },
  //   watch: {
  //     //   监听传进来的userList属性
  //     userList: {
  //       handler(nVal) {}
  //     },
  //     deep: true
  //   },
  methods: {
    //   获取用户列表
    async getUser() {
      const data = await searchUser();
      this.userData = data;
    },
    //   确定添加
    async addMan() {
      this.manId = this.value.join(",");
      if (this.manId.length === 0) {
        this.$message.error("请选选择用户再点击确定按钮");
      } else {
        const data = await checkMan({
          peopleIds: this.manId,
          groupId: this.groupId
        });
        if (JSON.stringify(data.ExitGroup) === JSON.stringify([])) {
          this.$emit("clickClose", this.value, data.ExitGroup);
          //   清空左边搜索;
          this.$refs.myTransfer.$children["0"]._data.query = "";
          // 清空右边搜索
          this.$refs.myTransfer.$children["3"]._data.query = "";
          this.value = [];
          this.defaultValue = [];
        } else {
          for (let i = 0; i < data.ExitGroup.length; i++) {
            this.alertContent.push(
              `用户${data.ExitUserNames[i]}已存在于${data.ExitGroup[i]}`
            );
            if (i === data.ExitGroup.length - 1) {
              this.alertContent.push("是否将用户加入本考勤组?");
            }
          }

          this.$confirm(this.alertContent.join(","), "提醒", {
            distinguishCancelAndClose: true,
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          })
            .then(async () => {
              this.$emit("clickClose", this.value, data.ExitGroup);
              this.defaultValue = this.value;
              //   清空左边搜索;
              this.$refs.myTransfer.$children["0"]._data.query = "";
              // 清空右边搜索
              this.$refs.myTransfer.$children["3"]._data.query = "";
              this.alertContent = [];
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消"
              });
              this.alertContent = [];
            });
        }
      }
    },
    // 关闭弹框
    handleClose() {
      this.$emit("update:addManDialog", false);
      this.value = this.defaultValue;
      //   清空左边搜索;
      this.$refs.myTransfer.$children["0"]._data.query = "";
      // 清空右边搜索
      this.$refs.myTransfer.$children["3"]._data.query = "";
    }
  }
};
</script>

<style></style>
