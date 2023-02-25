<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <div class="title_box">
        <h1 style="padding-top: 20px; padding-left: 20px">{{ hospital.name }}</h1>
        <h2 style="margin-top: 40px; padding-left: 20px">{{ hospital.hospital_rank }}</h2>
      </div>
      <div class="description_box">
        <h2 style="padding-top: 20px; padding-left: 20px">| 医院简介</h2>
        <p class="description">{{ hospital.description }}</p>
      </div>
      <div class="department_box">
        <h2 style="padding-top: 20px; padding-left: 20px; padding-bottom: 10px">| 医院科室</h2>
        <el-row style="padding-right: 20px; padding-bottom: 20px">
          <el-col :span="4" v-for="name in departmentNames" :key="name" style="padding-left: 20px; padding-top: 10px">
            <el-card :body-style="{ padding: '10px', height:'30px', textAlign: 'center'}" shadow="hover">
                  <div>{{ name }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="doctor_box">
        <h2 style="padding-top: 20px; padding-left: 20px; padding-bottom: 10px">| 推荐专家</h2>
        <el-row :span="24" style="padding-right: 20px; padding-bottom: 20px">
          <el-col :span="24" v-for="doctor in doctors" :key="doctor.id" style="padding-left: 20px; padding-top: 5px">
            <el-card :body-style="{ padding: '10px', height:'170px'}" shadow="hover">
              <el-row :span="24">
                <el-col :span="3" style="padding-left: 20px">
                  <div style="font-size: 20px; font-weight: bold">{{ doctor.name }}</div>
                </el-col>
                <el-col :span="3">
                  <div style="font-size: 20px; font-weight: bold">{{ doctor.professional_rank }}</div>
                </el-col>
                <el-col :span="2" :offset="16">
                    <el-button link type="primary" size="small" @click="handleGoToDoctorDetail(doctor.id)"
                    >访问主页</el-button>
                </el-col>
              </el-row>
              <el-row :span="24" style="padding-top: 10px">
                <el-col :span="3" style="padding-left: 20px">
                  <div>{{ doctor.hospital_name }}</div>
                </el-col>
                <el-col :span="3">
                  <div>{{ doctor.department_name }}</div>
                </el-col>
              </el-row>
              <p style="padding-left: 20px; padding-top: 10px; padding-right: 20px">{{ doctor.description }}</p>
              <p style="padding-left: 20px; padding-top: 10px; font-weight: bold">专攻方向：{{ doctor.study_direction }}</p>
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
import {findHospitalDepartmentNames, takeHospitalInfo} from "@/api/hospital";
import {findHospitalDoctors} from "@/api/doctor";

export default {
  name: "hospitalDetail",
  components: {HeaderNavBar},
  data() {
    return {
      hospital: {
        id: "10001",
        name: "武汉第一医院",
        hospital_rank: "三甲医院",
        description: "中日友好医院(简称“中日医院”)是国家卫生健康委员会直属大型综合性三级甲等医院,于1984年10月23日开院。时任中共中央总书记胡耀邦同志、时任全国政协主席邓颖超同志分别题写院名。中日医院现编制床位1610张(含北区、西区),集医疗、教学、科研和预防保健等功能为一体,并承担中央保健医疗任务、国家紧急医学救援任务。",
      },
      departmentNames: ["内科", "外科", "妇产科", "内科", "外科", "妇产科","内科", "外科", "妇产科"],
      doctors: [
        {
          id: "10001",
          name: "晨玮顾",
          hospital_name: "武汉第一医院",
          department_name: "呼吸科",
          professional_rank: "主任医师",
          study_direction: "擅长呼吸科相关疾病",
          description: "主要从事毛发疾病、头皮健康管理、面部年轻化、皮肤外科和医学美容，擅长各型斑秃、男性雄秃、女性脱发、瘢痕性脱发、瘢痕疙瘩、脂溢性皮炎、痤疮、银屑病、角化性湿疹中西医治疗，以及瘢痕疙瘩",
        },
        {
          id: "10002",
          name: "晨玮顾",
          hospital_name: "武汉第一医院",
          department_name: "呼吸科",
          professional_rank: "主任医师",
          study_direction: "擅长呼吸科相关疾病",
          description: "主要从事毛发疾病、头皮健康管理、面部年轻化、皮肤外科和医学美容，擅长各型斑秃、男性雄秃、女性脱发、瘢痕性脱发、瘢痕疙瘩、脂溢性皮炎、痤疮、银屑病、角化性湿疹中西医治疗，以及瘢痕疙瘩",
        },
      ],
    }
  },
  created() {
    this.hospital.id = this.$route.path.split("/").reverse()[0];
    this.takeHospitalInfo();
    this.findHospitalDepartmentNames();
    this.findHospitalDoctors();
  },
  methods: {
    takeHospitalInfo() {
      let params = {
        hospital_id: this.hospital.id,
      };
      takeHospitalInfo(params).then((res) => {
        if (res.code === 200) {
          this.hospital = res.data.hospital;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    findHospitalDepartmentNames() {
      let params = {
        hospital_id: this.hospital.id,
      };
      findHospitalDepartmentNames(params).then((res) => {
        if (res.code === 200) {
          this.departmentNames = res.data.department_names
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    findHospitalDoctors() {
      let params = {
        hospital_id: this.hospital.id,
      };
      findHospitalDoctors(params).then((res) => {
        if (res.code === 200) {
          this.doctors = res.data.doctors;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleGoToDoctorDetail(doctorID) {
      this.$router.push("/doctor_detail/" + doctorID);
    },
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
.center .department_box {
  background-color: #FFFFFF;
  margin-top: 20px;
  height: auto;
}
.center .doctor_box {
  background-color: #FFFFFF;
  margin-top: 20px;
  height: auto;
}
</style>