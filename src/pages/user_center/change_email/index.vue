<template>
  <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px"
           size="default" @submit.native.prevent>
    <el-form-item label="新邮箱" prop="newEmail" class="required">
      <el-input v-model="formData.newEmail" type="text" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">激活新邮箱</el-button>
    </el-form-item>
    <el-form-item label="验证码" prop="activeCode">
      <el-input v-model="formData.activeCode" type="text" clearable>
        <template #append>
          <el-button type="primary" @click="active">验证</el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import {activeChangeUserEmail, applyChangeUserEmail} from "@/api/login";

export default {
  components: {},
  props: {},
  data() {
    return {
      formData: {
        newEmail: "",
        activeCode: "",
      },
      rules: {
        newEmail: [{
          required: true,
          message: '邮箱不可为空',
        }],
      },
    }
  },
  created() {},
  methods: {
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) {
          return
        }
        //TODO: 提交表单
        let params = {
          email: this.formData.newEmail,
        };
        applyChangeUserEmail(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("申请成功，验证码已发到您的邮箱，请在5分钟内输入验证码激活新邮箱");
          } else {
            this.$message.error(res.msg);
          }
        });
      })
    },
    active() {
      let params = {
        email: this.formData.newEmail,
        active_code: this.formData.activeCode,
      }
      activeChangeUserEmail(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("更新成功!");
        } else {
          this.$message.error(res.msg);
        }
      })
    },
  }
}

</script>

<style scoped>

</style>