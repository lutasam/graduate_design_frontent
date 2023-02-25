<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-image class="img" :src="headerImgUrl"></el-image>
      <el-row :span="24">
        <el-col :span="12" class="input">
          <el-input
              v-model="searchDisease"
              @keyup.enter.native="handleSearch"
              clearable
              size="large"
              placeholder="输入您想要查询的疾病以搜索对应的医生"
          >
          </el-input>
        </el-col>
        <el-col :span="12" style="margin-top: 20px; padding-left: 5px">
          <el-input
              v-model="searchHospitalName"
              @keyup.enter.native="handleSearch"
              clearable
              size="large"
              placeholder="输入医院名称以搜索所属该机构的医生"
          >
            <el-button slot="append" icon="el-icon-search" id="search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-select v-model="selectedProfessionalRank" class="select" placeholder="按职称" size="large" clearable>
        <el-option
            v-for="item in professionalRankOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-table class="table" :data="tableData">
        <el-table-column prop="name" label="医生"/>
        <el-table-column prop="hospital_name" label="所属医院"/>
        <el-table-column prop="department_name" label="所属科室" />
        <el-table-column prop="professional_rank" label="职称" />
        <el-table-column prop="study_direction" label="专业方向" />
        <el-table-column fixed="right" label="主页" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleGoToDoctorDetail(scope.$index, scope.row)"
            >访问主页</el-button>
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
import { findDoctors } from "@/api/doctor";

export default {
  name: "findDoctors",
  components: {HeaderNavBar},
  data() {
    return {
      searchDisease: "",
      searchHospitalName: "",
      headerImgUrl: require("@/assets/images/header_img.jpg"),
      currentPage: 1,
      pageSize: 5,
      total: 2,
      tableData: [
        {
          id: "10001",
          name: "晨玮顾",
          hospital_name: "武汉第一医院",
          department_name: "呼吸科",
          professional_rank: "主任医师",
          study_direction: "擅长呼吸道相关疾病",
        },
        {
          id: "10001",
          name: "晨玮顾",
          hospital_name: "武汉第一医院",
          department_name: "呼吸科",
          professional_rank: "主任医师",
          study_direction: "擅长呼吸道相关疾病",
        },
      ],
      selectedProfessionalRank: null,
      professionalRankOptions: [
        {
          label: "主任医师",
          value: 1,
        },
        {
          label: "副主任医师",
          value: 2,
        },
        {
          label: "主治医师",
          value: 3,
        },
      ],
    }
  },
  created() {
    this.findDoctors();
  },
  methods: {
    handleSearch() {
      this.findDoctors();
    },
    handleGoToDoctorDetail(index, row) {
      this.$router.push("/doctor_detail/" + this.tableData[index].id);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.findDoctors();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findDoctors();
    },
    findDoctors() {
      if (this.selectedProfessionalRank === "") {
        this.selectedProfessionalRank = null;
      }
      let params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
        study_direction: this.searchDisease,
        hospital_name: this.searchHospitalName,
        professional_rank: this.selectedProfessionalRank,
      };
      findDoctors(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.doctors;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
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