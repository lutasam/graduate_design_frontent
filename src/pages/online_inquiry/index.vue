<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-image class="img" :src="headerImgUrl"></el-image>
      <el-input
          class="input"
          v-model="searchDisease"
          @keyup.enter.native="handleSearch"
          clearable
          size="large"
          placeholder="输入您想要查询的疾病"
      >
        <el-button slot="append" icon="el-icon-search" id="search" @click="handleSearch"></el-button>
      </el-input>
      <div style="padding-top: 10px">
        <label>没有相关的内容？试试</label>
        <el-button size="large" style="margin-left: 5px" @click="handleGoToCreateInquiry">发布问诊</el-button>
      </div>
      <el-table class="table" :data="tableData">
        <el-table-column prop="disease_name" label="疾病"/>
        <el-table-column prop="description" :formatter="descriptionStateFormat" label="描述"/>
        <el-table-column prop="reply_doctor_hospital_name" label="回复医生所属医院" />
        <el-table-column prop="reply_doctor_name" label="回复医生" />
        <el-table-column prop="created_at" label="发布日期" />
        <el-table-column fixed="right" label="主页" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleGoToInquiryDetail(scope.$index, scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 50]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import {findDoctors} from "@/api/doctor";
import {findInquiryTitles} from "@/api/inquiry";

export default {
  name: "onlineInquiry",
  components: {HeaderNavBar},
  data() {
    return {
      headerImgUrl: require("../../assets/images/header_img.jpg"),
      searchDisease: "",
      currentPage: 1,
      pageSize: 5,
      total: 2,
      tableData: [
        {
          id: "10001",
          disease_name: "气管炎",
          description: "患者1个月余前感染新冠，1周转阴。1月底前逐渐食欲不振，精神萎靡，不能久坐。1月初就诊于湖北医药学院附属医院，予以抗感染等治疗。出院后逐渐出现气短。1月26日至今于上海第四人民医院Eicu就诊。1月26日肺CT显示：双侧胸腔积液，两肺下叶部分实变不张。心影增大，心包积液，主动脉及冠状动脉硬化。2023-01-27床旁心脏彩超：双房增大;室间隔整体收缩运动减弱;心包积液;2023- 01-30心电图：1.心房扑动（不等比房室传导）2.肢导联低电压 3.T波变化（V5-v6低平）。予以抗感染、降负荷等对症治疗，症状改善不明显。为系统诊治遂于我院就诊。",
          created_at: "2023-02-02",
          reply_doctor_hospital_name: "武汉第一医院",
          reply_doctor_name: "晨玮顾",
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
    this.findInquiries();
  },
  methods: {
    handleSearch() {
      this.findInquiries();
    },
    handleGoToInquiryDetail(index, row) {
      this.$router.push("/inquiry_detail/" + this.tableData[index].id);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.findInquiries();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findInquiries();
    },
    descriptionStateFormat(row, column, cellValue) {
      if (!cellValue) return ''
      if (cellValue.length > 10) {       //最长固定显示10个字符
        return cellValue.slice(0, 10) + '...'
      }
      return cellValue
    },
    findInquiries() {
      let params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
        disease_name: this.searchDisease,
        reply_status: 3,
      };
      findInquiryTitles(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.inquiries;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleGoToCreateInquiry() {
      this.$router.push("/create_inquiry");
    },
  }
}
</script>

<style scoped>
.center {
  margin-top: 10px;
  margin-left: 200px;
  margin-right: 200px;
  height: 100vh;
}
.center .img {
  width: 100%;
  height: 300px;
}
.center .input {
  margin-top: 20px;
}
.center .table {
  margin-top: 20px;
  width: 100%;
  font-size: large;
}
.center .pagination {
  margin-top: 10px;
}
.center .select {
  margin-top: 5px;
}
</style>