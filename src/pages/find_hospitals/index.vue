<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-image class="img" :src="headerImgUrl"></el-image>
      <el-input
          class="input"
          v-model="searchHospitalName"
          @keyup.enter.native="handleSearch"
          clearable
          size="large"
          placeholder="输入医院名字以搜索您想要查询的医院"
      >
        <el-button slot="append" icon="el-icon-search" id="search" @click="handleSearch"></el-button>
      </el-input>

      <el-select v-model="selectedCity" class="select" placeholder="按地区" size="large" clearable>
        <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select v-model="selectedHospitalRank" class="select" style="margin-left: 5px" placeholder="按等级" size="large" clearable>
        <el-option
            v-for="item in hospitalRankOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-table class="table" :data="tableData">
        <el-table-column prop="name" label="医院"/>
        <el-table-column prop="address" label="地址"/>
        <el-table-column prop="hospital_rank" label="等级" />
        <el-table-column fixed="right" label="主页" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleGoToHospitalDetail(scope.$index, scope.row)"
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
import {findHospitals} from "@/api/hospital";

export default {
  name: "findHospitals",
  components: {HeaderNavBar},
  data() {
    return {
      searchHospitalName: "",
      headerImgUrl: require("@/assets/images/header_img.jpg"),
      currentPage: 1,
      pageSize: 5,
      total: 2,
      tableData: [
        {
          id: "10001",
          name: "武汉第一医院",
          address: "武汉武昌区1号",
          hospital_rank: "三甲"
        },
        {
          id: "10002",
          name: "武汉第二医院",
          address: "武汉武昌区2号",
          hospital_rank: "三甲"
        },
      ],
      selectedCity: null,
      selectedHospitalRank: null,
      cityOptions: [
        {
          label: "北京",
          value: "北京",
        },
        {
          label: "上海",
          value: "上海",
        },
        {
          label: "武汉",
          value: "武汉",
        },
        {
          label: "深圳",
          value: "深圳",
        },
      ],
      hospitalRankOptions: [
        {
          label: "三特",
          value: 7,
        },
        {
          label: "三甲",
          value: 8,
        },
        {
          label: "三乙",
          value: 9,
        },
        {
          label: "三丙",
          value: 10,
        },
      ],
    }
  },
  created() {
    this.findHospitals();
  },
  methods: {
    handleSearch() {
      this.findHospitals();
    },
    handleGoToHospitalDetail(index, row) {
      this.$router.push("/hospital_detail/" + this.tableData[index].id);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.findHospitals();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findHospitals();
    },
    findHospitals() {
      if (this.selectedHospitalRank === "") {
        this.selectedHospitalRank = null;
      }
      let params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
        hospital_name: this.searchHospitalName,
        city: this.selectedCity,
        hospital_rank: this.selectedHospitalRank,
      };
      findHospitals(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.hospitals;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
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