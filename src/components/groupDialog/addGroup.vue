<template>
  <div>
    <!-- 添加考勤组弹框 -->
    <el-dialog
      title="添加状态"
      :visible.sync="addDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        label-width="100px"
        :model="addGroup"
        :rules="addRules"
        ref="addRef"
      >
        <el-form-item label="考勤组名称:" prop="groupName">
          <el-input
            placeholder="请输入考勤组名称，1-10个字符"
            style="width:500px"
            v-model="addGroup.groupName"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="参与考勤人员:" prop="allName">
          <el-button @click="addMan">{{ manNumber }}</el-button>
        </el-form-item>
        <el-form-item label-width="85px" label="考勤类型:" prop="radio">
          <div>
            <el-radio v-model="addGroup.radio" @change="checkOne" label="1"
              >固定班制(每天考勤时间一样，适用于固定上班时间制的员工)</el-radio
            >
          </div>
          <div>
            <el-radio v-model="addGroup.radio" @change="checkTwo" label="2"
              >大小周制(适用于大小周工作制的员工)</el-radio
            >
          </div>
        </el-form-item>
        <el-form-item label="考勤时间段:" prop="time">
          <p>9:00-12:30，14:00-18:00</p>
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
                addGroup.radio === '2' && addGroup.select[0] === '星期日'
              "
              label="星期六"
            ></el-checkbox>
            <el-checkbox
              :disabled="
                addGroup.radio === '2' && addGroup.select[0] === '星期六'
              "
              label="星期日"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-calendar v-show="addGroup.radio === '1'" v-model="yearData">
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
          v-show="addGroup.select[0] === '星期日' && addGroup.radio === '2'"
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
          v-show="addGroup.select[0] === '星期六' && addGroup.radio === '2'"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBtn">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
    <addMan :addManDialog="addManDialog" @addManClose="closeAddMan" />
  </div>
</template>

<script>
import addMan from "@/components/groupDialog/addMan.vue";
export default {
  components: { addMan },
  props: ["addDialog"],
  data() {
    return {
      yearData: new Date(),
      manNumber: "请选择>",
      addManDialog: false,
      addGroup: {
        groupName: "",
        allName: "",
        radio: "",
        time: "",
        select: []
      },
      addRules: {
        groupName: [
          { required: true, message: "请输入考勤组名称", trigger: "blur" }
        ],
        allName: [
          { required: true, message: "请选择参与考勤人员", trigger: "change" }
        ],
        radio: [
          { required: true, message: "请选择考勤类型", trigger: "change" }
        ],
        time: [
          { required: true, message: "请选择考勤时间段", trigger: "change" }
        ],
        select: [
          { required: true, message: "请选择休息时间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    checkOne() {
      if (this.addGroup.radio === "1") {
        this.addGroup.select = ["星期六", "星期日"];
      }
    },
    checkTwo() {
      if (this.addGroup.radio === "2") {
        this.addGroup.select = [];
      }
    },
    closeAddMan() {
      this.addManDialog = false;
    },
    handleClose() {
      this.$refs.addRef.resetFields();
      this.$emit("closeAdd", false);
    },
    addBtn() {
      console.log(this.addGroup);
    },
    addMan() {
      this.addManDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
  padding: 0;
}
</style>
