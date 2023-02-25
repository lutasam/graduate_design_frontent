<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <div class="title_box">
        <div style="display: flex; justify-content: flex-end">
          <div style="padding-left: 20px; padding-top: 20px; font-size: 30px; font-weight: bold; margin-right: auto">{{ doctor.name }} {{ doctor.professional_rank }}</div>
          <el-button type="primary" link="true" style="margin-top: 20px; margin-right: 20px; font-size: 20px" size="large" @click="handleGoToTalk">在线问诊</el-button>
        </div>
        <div style="margin-top: 20px; padding-left: 20px; font-size: 20px">专业方向：{{ doctor.study_direction }}</div>
        <div style="margin-top: 20px; padding-left: 20px; font-size: 20px">{{ doctor.hospital_name }} {{ doctor.department_name }}</div>
      </div>
      <div class="description_box">
        <h2 style="padding-top: 20px; padding-left: 20px">| 医生简介</h2>
        <p class="description">{{ doctor.description }}</p>
      </div>
      <div class="inquiry_box">
        <h2 style="padding-top: 20px; padding-left: 20px; padding-bottom: 10px">| 该专家的问诊记录</h2>
        <label style="padding-left: 20px">以下是为您精选的问诊内容，供您参考</label>
        <hr style="margin: 20px;">
        <el-row :span="24" style="padding-right: 20px; padding-bottom: 20px">
          <el-col :span="24" v-for="inquiry in inquiries" :key="inquiry.id" style="padding-left: 20px; padding-top: 5px">
            <el-card :body-style="{ padding: '10px', height:'170px'}" shadow="hover" @click.native="handleGoToInquiryDetail(inquiry.id)">
              <div class="card_title">
                <div style="margin-right: auto; font-size: 24px">疾病：{{ inquiry.disease_name }}</div>
                <div style="padding-right: 20px">{{ inquiry.created_at }}</div>
              </div>
              <p style="padding-left: 20px; padding-top: 10px; padding-right: 20px">描述：{{ inquiry.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 100px"></div>
    </el-main>
  </div>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import {findDoctorInquiries} from "@/api/inquiry";
import {takeDoctorInfo} from "@/api/doctor";
import {addTalkedUser} from "@/api/talk";

export default {
  name: "hospitalDetail",
  components: {HeaderNavBar},
  data() {
    return {
      doctor: {
        id: "10001",
        name: "晨玮顾",
        professional_rank: "主任医师",
        study_direction: "擅长呼吸科疾病",
        hospital_name: "武汉第一医院",
        department_name: "呼吸科",
        description: "韩薇，主任医师，教授，博士研究生导师，美国心脏病学院专家会员（FACC），曾到美国圣路易斯华盛顿大学和Mayo clinic做访问学者。现任同济大学附属东方医院心衰科主任；中国医师协会心脏重症专业委员会副总干事；中华医学会心血管病学分会心力衰竭学组委员；中华医学会超声医学分会超声心动图学组委员；",
      },
      inquiries: [
        {
          id: "10001",
          disease_name: "气管炎",
          description: "患者1个月余前感染新冠，1周转阴。1月底前逐渐食欲不振，精神萎靡，不能久坐。1月初就诊于湖北医药学院附属医院，予以抗感染等治疗。出院后逐渐出现气短。1月26日至今于上海第四人民医院Eicu就诊。1月26日肺CT显示：双侧胸腔积液，两肺下叶部分实变不张。心影增大，心包积液，主动脉及冠状动脉硬化。2023-01-27床旁心脏彩超：双房增大;室间隔整体收缩运动减弱;心包积液;2023- 01-30心电图：1.心房扑动（不等比房室传导）2.肢导联低电压 3.T波变化（V5-v6低平）。予以抗感染、降负荷等对症治疗，症状改善不明显。为系统诊治遂于我院就诊。",
          created_at: "2023-02-02"
        },
        {
          id: "10002",
          disease_name: "气管炎",
          description: "患者1个月余前感染新冠，1周转阴。1月底前逐渐食欲不振，精神萎靡，不能久坐。1月初就诊于湖北医药学院附属医院，予以抗感染等治疗。出院后逐渐出现气短。1月26日至今于上海第四人民医院Eicu就诊。1月26日肺CT显示：双侧胸腔积液，两肺下叶部分实变不张。心影增大，心包积液，主动脉及冠状动脉硬化。2023-01-27床旁心脏彩超：双房增大;室间隔整体收缩运动减弱;心包积液;2023- 01-30心电图：1.心房扑动（不等比房室传导）2.肢导联低电压 3.T波变化（V5-v6低平）。予以抗感染、降负荷等对症治疗，症状改善不明显。为系统诊治遂于我院就诊。",
          created_at: "2023-02-02"
        },
      ],
    }
  },
  created() {
    this.doctor.id = this.$route.path.split("/").reverse()[0];
    this.takeDoctorInfo();
    this.findDoctorInquiries();
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
    findDoctorInquiries() {
      let params = {
        doctor_id: this.doctor.id,
      };
      findDoctorInquiries(params).then((res) => {
        if (res.code === 200) {
          this.inquiries = res.data.inquiries;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleGoToInquiryDetail(inquiryID) {
      this.$router.push("/inquiry_detail/" + inquiryID);
    }
  }
}
</script>

<style scoped>
.center {
  margin-top: 10px;
  margin-left: 200px;
  margin-right: 200px;
  background-color: #fbf4f5;
  border-radius: 10px;
  height: 100vh;
}
.center .title_box {
  height: 180px;
  background-image: url("../../assets/images/title_box_bg.jpg");
}
.center .description_box {
  background-color: #FFFFFF;
  margin-top: 20px;
  height: auto;
}
.center .description_box .description {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  line-height: 40px;
  font-size: 20px;
}
.center .inquiry_box {
  background-color: #FFFFFF;
  margin-top: 20px;
  height: auto;
}
.center .inquiry_box .card_title {
  padding-left: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>