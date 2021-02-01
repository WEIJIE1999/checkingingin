<template>
  <div>
    <!-- 添加考勤组弹框 -->
    <el-dialog
      :title="
        editList && Object.keys(editList).length > 0
          ? '修改考勤组'
          : '添加考勤组'
      "
      :visible.sync="addDialog"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form
        label-width="110px"
        :model="addGroup"
        :rules="addRules"
        ref="addRef"
      >
        <el-form-item label="考勤组名称:" prop="name">
          <el-input
            placeholder="请输入考勤组名称，1-10个字符"
            style="width:500px"
            v-model="addGroup.name"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="参与考勤人员:" prop="userId">
          <el-button @click="addMan">{{ manNumber }}</el-button>
        </el-form-item>
        <el-form-item label-width="85px" label="考勤类型:" prop="chineseName">
          <div>
            <el-radio
              v-model="addGroup.chineseName"
              @change="checkOne"
              label="固定班制"
              >固定班制(每天考勤时间一样，适用于固定上班时间制的员工)</el-radio
            >
          </div>
          <div>
            <el-radio
              v-model="addGroup.chineseName"
              @change="checkTwo"
              label="大小周制"
              >大小周制(适用于大小周工作制的员工)</el-radio
            >
          </div>
        </el-form-item>
        <el-form-item label="考勤时间段:" prop="time">
          <p>{{ addGroup.time }}</p>
        </el-form-item>
        <el-form-item label="休息日选择:" prop="select">
          <el-checkbox-group v-model="addGroup.select">
            <el-checkbox disabled label="星期一"></el-checkbox>
            <el-checkbox disabled label="星期二"></el-checkbox>
            <el-checkbox disabled label="星期三"></el-checkbox>
            <el-checkbox disabled label="星期四"></el-checkbox>
            <el-checkbox disabled label="星期五"></el-checkbox>
            <el-checkbox
              :disabled="
                (addGroup.chineseName === '大小周制' &&
                  addGroup.select[0] === '星期日') ||
                  addGroup.chineseName === '固定班制'
              "
              label="星期六"
            ></el-checkbox>
            <el-checkbox
              :disabled="
                (addGroup.chineseName === '大小周制' &&
                  addGroup.select[0] === '星期六') ||
                  addGroup.chineseName === '固定班制'
              "
              label="星期日"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 日历显示 -->
        <el-calendar
          v-show="addGroup.chineseName === '固定班制'"
          v-model="yearData"
        >
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              style="background-color: #F0F0F0;width:100%;height:100%"
              v-if="date.getDay() === 0 || date.getDay() === 6"
            >
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">休息</p>
            </div>

            <div v-else>
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">上班</p>
            </div>
          </template>
        </el-calendar>
        <el-calendar
          v-show="
            addGroup.select[0] === '星期日' &&
              addGroup.chineseName === '大小周制'
          "
          v-model="yearData"
        >
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              style="background-color: #F0F0F0;width:100%;height:100%"
              v-if="
                date.getFullYear() === 2021 &&
                  (date.getMonth() + 1 === 1 ||
                    date.getMonth() + 1 === 4 ||
                    date.getMonth() + 1 === 5 ||
                    date.getMonth() + 1 === 8 ||
                    date.getMonth() + 1 === 12 ||
                    date.getMonth() + 1 === 11) &&
                  ((date.getDate() % 2 === 0 && date.getDay() === 6) ||
                    date.getDay() === 0)
              "
            >
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">休息</p>
            </div>
            <div
              style="background-color: #F0F0F0;width:100%;height:100%"
              v-else-if="
                date.getFullYear() === 2021 &&
                  (date.getMonth() + 1 === 2 ||
                    date.getMonth() + 1 === 3 ||
                    date.getMonth() + 1 === 7 ||
                    date.getMonth() + 1 === 6 ||
                    date.getMonth() + 1 === 9 ||
                    date.getMonth() + 1 === 10) &&
                  ((date.getDate() % 2 === 1 && date.getDay() === 6) ||
                    date.getDay() === 0)
              "
            >
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">休息</p>
            </div>
            <div v-else-if="date.getFullYear() === 2021">
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">上班</p>
            </div>

            <div v-else-if="date.getFullYear() > 2021">
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">待定</p>
            </div>
            <div v-else>
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">过去</p>
            </div>
          </template>
        </el-calendar>
        <el-calendar
          v-show="
            addGroup.select[0] === '星期六' &&
              addGroup.chineseName === '大小周制'
          "
          v-model="yearData"
        >
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              style="background-color: #F0F0F0;width:100%;height:100%"
              v-if="
                date.getFullYear() === 2021 &&
                  (date.getMonth() + 1 === 1 ||
                    date.getMonth() + 1 === 4 ||
                    date.getMonth() + 1 === 5 ||
                    date.getMonth() + 1 === 8 ||
                    date.getMonth() + 1 === 12 ||
                    date.getMonth() + 1 === 11) &&
                  ((date.getDate() % 2 === 1 && date.getDay() === 0) ||
                    date.getDay() === 6)
              "
            >
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">休息</p>
            </div>

            <div
              style="background-color: #F0F0F0;width:100%;height:100%"
              v-else-if="
                date.getFullYear() === 2021 &&
                  (date.getMonth() + 1 === 2 ||
                    date.getMonth() + 1 === 3 ||
                    date.getMonth() + 1 === 7 ||
                    date.getMonth() + 1 === 6 ||
                    date.getMonth() + 1 === 9 ||
                    date.getMonth() + 1 === 10) &&
                  ((date.getDate() % 2 === 0 && date.getDay() === 0) ||
                    date.getDay() === 6)
              "
            >
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">休息</p>
            </div>

            <div v-else-if="date.getFullYear() === 2021">
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">上班</p>
            </div>
            <div v-else-if="date.getFullYear() > 2021">
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">待定</p>
            </div>
            <div v-else>
              <p style="text-align:center;line-height:30px">
                {{
                  data.day
                    .split("-")
                    .slice(2)
                    .join("-")
                }}
              </p>
              <p style="text-align:center;line-height:50px">过去</p>
            </div>
          </template>
        </el-calendar>
        <el-form-item label="考勤状态设置:" prop="status">
          <p>根据已设置好的考勤状态执行。</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBtn">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
      <addMan
        :userList="addGroup.userList"
        :groupId="groupId"
        :key="`addmain_${updateKey}`"
        :addManDialog.sync="addManDialog"
        @clickClose="clickClose"
      />
    </el-dialog>
  </div>
</template>

<script>
import { addGroup, editGroup } from "@/utils/request/group";
import addMan from "@/components/groupDialog/addMan.vue";
export default {
  components: { addMan },
  props: { addDialog: Boolean, editList: Object },
  data() {
    return {
      updateKey: 0,
      // 日历绑定值
      yearData: new Date(),
      //   按钮文字显示
      //   按钮显示文字
      manNumber: "请选择>",
      //   添加人员显示控制
      addManDialog: false,
      //   添加提交的数据
      offtype: "",
      //   组id
      groupId: null,
      //   编辑时选中的人员
      value: [],
      //   添加表单
      addGroup: {
        //   组名
        name: "",
        // 考勤类型
        chineseName: "",
        // 考勤时间
        time: "9:00-12:30，14:00-18:00",
        // 编辑时人员列表
        userList: [],
        // 选中人员ID（字符串）
        userId: "",
        // 选中星期x
        select: [],
        // 冲突数组
        conflict: [],
        // 考勤状态
        status: "1"
      },
      //   验证规则
      addRules: {
        name: [
          { required: true, message: "请输入考勤组名称", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "请选择参与考勤人员", trigger: "change" }
        ],
        chineseName: [
          { required: true, message: "请选择考勤类型", trigger: "change" }
        ],
        time: [
          { required: true, message: "请选择考勤时间段", trigger: "change" }
        ],
        select: [
          { required: true, message: "请选择休息时间", trigger: " blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: " blur" }]
      }
    };
  },
  //   监听是编辑还是添加按钮
  watch: {
    editList: {
      handler(nVal) {
        if (nVal && Object.keys(nVal).length > 0) {
          this.addGroup.name = nVal.name;
          this.addGroup.chineseName = nVal.chineseName;
          this.addGroup.userList = nVal.userList;
          this.groupId = nVal.id;
          this.manNumber = `共${nVal.userList.length}人`;
          if (nVal.offtype === "6,7") {
            this.addGroup.select = ["星期六", "星期日"];
          } else if (nVal.offtype === "6") {
            this.addGroup.select = ["星期六"];
          } else if (nVal.offtype === "7") {
            this.addGroup.select = ["星期日"];
          }
          this.updateKey++;
        } else {
          this.addGroup.name = "";
          this.addGroup.chineseName = "";
          this.addGroup.select = [];
          this.addGroup.userList = [];
          this.groupId = null;
          this.manNumber = "请选择>";
          this.addGroup.userId = "";
        }
      },
      deep: true
    }
  },
  methods: {
    // //   选中第一个单选框change事件
    checkOne() {
      if (this.addGroup.chineseName === "固定班制") {
        this.addGroup.select = ["星期六", "星期日"];
      }
    },
    // 选中第二个单选框change事件
    checkTwo() {
      if (this.addGroup.chineseName === "大小周制") {
        this.addGroup.select = [];
      }
    },
    // 关闭添加人员弹框
    clickClose(val, list) {
      this.manNumber = `共${val.length}人`;
      this.addManDialog = false;
      this.addGroup.userId = val.join(",");
      this.conflict = list.join(",");
    },
    // 关闭弹框
    handleClose() {
      this.updateKey++;
      this.$emit("update:addDialog", false);
      this.$emit("update:loading", false);
      this.value = [];
      this.addGroup.userId = "";
      this.manNumber = `共${this.addGroup.userList.length}人`;
    },
    // 点击添加事件
    addBtn() {
      if (this.addGroup.userId === "") {
        for (let i = 0; i < this.addGroup.userList.length; i++) {
          this.value.push(this.addGroup.userList[i].id);
          this.addGroup.userId = this.value.join(",");
        }
      }
      this.$refs.addRef.validate(async valid => {
        if (!valid) return;
        if (
          JSON.stringify(this.addGroup.select) ===
          JSON.stringify(["星期六", "星期日"])
        ) {
          this.offtype = "6,7";
        } else if (
          JSON.stringify(this.addGroup.select) === JSON.stringify(["星期六"])
        ) {
          this.offtype = "6";
        } else if (
          JSON.stringify(this.addGroup.select) === JSON.stringify(["星期日"])
        ) {
          this.offtype = "7";
        }
        if (this.editList && Object.keys(this.editList).length > 0) {
          await editGroup({
            name: this.addGroup.name,
            ids: this.addGroup.userId,
            offtype: this.offtype,
            version: this.editList.version,
            id: this.editList.id,
            conflict: this.conflict
          });
          this.value = [];
          this.addGroup.userId = "";
          this.$emit("closeAdd");
        } else {
          await addGroup({
            name: this.addGroup.name,
            ids: this.addGroup.userId,
            offtype: this.offtype,
            conflict: this.conflict
          });
          this.value = [];
          this.addGroup.userId = "";
          this.$emit("closeAdd");
        }
      });
    },
    // 添加人员框体
    addMan() {
      this.addManDialog = true;
      this.value = [];
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
  padding: 0;
}
</style>
