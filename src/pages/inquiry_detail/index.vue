<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-row :span="24">
        <el-col :span="16">
          <div class="content_box">
            <h2 style="margin-left: 20px; padding-top: 20px">病例信息</h2>
            <h3 class="h3" v-if="inquiry.disease_name !== ''">疾病</h3>
            <p class="p" v-if="inquiry.disease_name !== ''">{{ inquiry.disease_name }}</p>
            <h3 class="h3" v-if="inquiry.description !== ''">疾病描述</h3>
            <p class="p" v-if="inquiry.description !== ''">{{ inquiry.description }}</p>
            <h3 class="h3" v-if="inquiry.weight_height !== ''">身高体重</h3>
            <p class="p" v-if="inquiry.weight_height !== ''">{{ inquiry.weight_height }}</p>
            <h3 class="h3" v-if="inquiry.history_of_allergy !== ''">过敏史</h3>
            <p class="p" v-if="inquiry.history_of_allergy !== ''">{{ inquiry.history_of_allergy }}</p>
            <h3 class="h3" v-if="inquiry.past_medical_history !== ''">用药历史</h3>
            <p class="p" v-if="inquiry.past_medical_history !== ''">{{ inquiry.past_medical_history }}</p>
            <h3 class="h3" v-if="inquiry.other_info !== ''">补充内容</h3>
            <p class="p" v-if="inquiry.other_info !== ''">{{ inquiry.other_info }}</p>
            <hr style="margin-top: 10px" />
            <h2 style="margin-left: 20px; padding-top: 20px; padding-bottom: 10px">问诊建议</h2>
            <label style="padding-left: 20px; font-size: 14px">以下为专业医师的建议，仅供您参考</label>
            <p class="p" style="padding-bottom: 20px">{{ inquiry.reply_suggestion }}</p>
          </div>

        </el-col>
        <el-col :span="8">
          <div class="content_box" style="margin-left: 10px; margin-right: 10px">
            <h2 style="padding-top: 10px; padding-left: 10px">| 接诊医生</h2>
            <hr style="margin-top: 20px" />
            <div style="padding-left: 20px; padding-top: 20px; font-size: 20px; font-weight: bold;">{{ doctor.name }} {{ doctor.professional_rank }}</div>
            <div style="margin-top: 20px; padding-left: 20px;">{{ doctor.hospital_name }} {{ doctor.department_name }}</div>
            <hr style="margin-top: 20px" />
            <div style="margin-top: 20px; padding-left: 20px; padding-right: 20px;">简介：{{ doctor.description }}</div>
            <hr style="margin-top: 20px" />
            <el-button-group style="padding-top: 20px; padding-left: 20px; margin-bottom: 20px">
              <el-button type="primary" size="large" @click="handleGoToDoctorDetail(doctor.id)">访问主页</el-button>
              <el-button type="info" size="large" style="margin-left: 20px" @click="handleGoToTalk">详细咨询</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>

    </el-main>
  </div>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import {findInquiry} from "@/api/inquiry";
import {takeDoctorInfo} from "@/api/doctor";
import {addTalkedUser} from "@/api/talk";

export default {
  name: "inquiryDetail",
  components: {HeaderNavBar},
  data() {
    return {
      inquiry: {
        id: "1620064718810578944",
        user_name: "顾晨玮",
        disease_name: "肾移植复诊（2020-08-27填写）",
        description: "我们2023年2月8日复查。用药情况：\n" +
            "1.他克莫司 早1mg（周二四六日0.5mg），晚0.5mg\n" +
            "2.晓悉早、晚各2颗。\n" +
            "3.倍他洛克50毫克的早晚各1颗。 4.多贝斯早晚各1颗。\n" +
            "5.合心爽早晚各1颗。\n" +
            "6.百令早晚各3颗。\n" +
            "7.代文晚上1颗。\n" +
            "8.降尿酸非布司他早上1颗。\n" +
            "9.苏打片3片。3次。\n" +
            "10.力平之中午1颗（2023-02-08填写）",
        weight_height: "178cm，87.5kg（2021-04-13测量）",
        history_of_allergy: "无(2022-11-12填写)",
        past_medical_history: "无",
        other_info: "这次检查肌酐有点高不知道什么原因",
        reply_doctor_id: "10001",
        reply_doctor_name: "晨玮顾",
        reply_doctor_hospital_name: "武汉第一医院",
        reply_suggestion: "多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水多喝热水",
        created_at: "2023-01-30"
      },
      doctor: {
        id: "10001",
        name: "晨玮顾",
        professional_rank: "主任医师",
        hospital_name: "武汉第一医院",
        department_name: "呼吸科",
        description: "糖尿病合并尿毒症的手术治疗——胰腺和肾脏联合移植 亲属肾移植、肝移植 肾移植后抗排药的应用艺术 移植后糖尿病防治 移植后各种疑难杂症的诊治",
      },
    }
  },
  created() {
    this.inquiry.id = this.$route.path.split("/").reverse()[0];
    this.findInquiry();
  },
  methods: {
    handleGoToTalk() {
      localStorage.setItem("current_talk_doctor", this.doctor.id);
      let params = {
        user_id: this.doctor.id,
      };
      addTalkedUser(params).then((res) => {
        if (res.code === 200) {
          this.$router.push("/talk");
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    findInquiry() {
      let params = {
        inquiry_id: this.inquiry.id,
      };
      findInquiry(params).then((res) => {
        if (res.code === 200) {
          this.inquiry = res.data.inquiry;
          this.doctor.id = this.inquiry.reply_doctor_id;
          this.takeDoctorInfo();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    takeDoctorInfo() {
      let params = {
        doctor_id: this.doctor.id,
      };
      takeDoctorInfo(params).then((res) => {
        if (res.code === 200) {
          this.doctor = res.data.doctor;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleGoToDoctorDetail(doctorID) {
      this.$router.push("/doctor_detail/" + doctorID);
    },
  },
}
</script>

<style scoped>
.center {
  margin-top: 10px;
  margin-left: 300px;
  margin-right: 300px;
  background-color: #fbf4f5;
  border-radius: 10px;
  height: 100vh;
}
.center .h3 {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
.center .p {
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 20px;
  margin-right: 20px;
}
.center .content_box {
  height: auto;
  background-color: #FFFFFF;
  border-radius: 5px;
}
</style>