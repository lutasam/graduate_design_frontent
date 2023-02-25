<template>
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
</template>

<script>
import {findUserInquiries} from "@/api/inquiry";

export default {
  name: "myInquiries",
  data() {
    return {
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
    this.findUserInquiries();
  },
  methods: {
    findUserInquiries() {
      let params = {};
      findUserInquiries(params).then((res) => {
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
.card_title {
  padding-left: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>