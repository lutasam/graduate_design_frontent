<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-image class="img" :src="headerImgUrl"></el-image>
      <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px"
               size="default" @submit.native.prevent style="margin-top: 10px">
        <el-form-item label="疾病名称" prop="disease_name" class="required">
          <el-input type="textarea" v-model="formData.disease_name" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" class="required">
          <el-input type="textarea" v-model="formData.description" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="身高体重" prop="weight_height">
          <el-input type="textarea" v-model="formData.weight_height" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="过敏史" prop="history_of_allergy">
          <el-input type="textarea" v-model="formData.history_of_allergy" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="既往病史" prop="past_medical_history">
          <el-input type="textarea" v-model="formData.past_medical_history" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="其他信息" prop="other_info">
          <el-input type="textarea" v-model="formData.other_info" rows="3"></el-input>
        </el-form-item>
        <el-form-item style="padding-bottom: 100px">
          <el-button type="primary" size="large" @click="submitForm">发布</el-button>
          <el-button type="info" size="large" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";

export default {
  name: "createInquiry",
  components: {HeaderNavBar},
  props: {},
  data() {
    return {
      headerImgUrl: require("@/assets/images/header_img.jpg"),
      formData: {
        disease_name: "",
        description: "",
        weight_height: "",
        history_of_allergy: "",
        past_medical_history: "",
        other_info: "",
      },
      rules: {
        disease_name: [{
          required: true,
          message: '字段值不可为空',
        }],
        description: [{
          required: true,
          message: '字段值不可为空',
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        //TODO: 提交表单
        let params = this.formData;
        createInquiry(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("发布成功!请等待专家候诊!");
            this.$router.push("/find_inquiries/");
          } else {
            this.$message.error(res.msg);
          }
        })
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields();
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
</style>