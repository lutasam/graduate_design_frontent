<template>
  <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px"
           size="default" @submit.native.prevent>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" readonly="true" type="text" clearable></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="formData.password" type="text" clearable show-password></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="repassword">
      <el-input v-model="formData.repassword" type="text" clearable show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">激活新密码</el-button>
    </el-form-item>
    <el-form-item label="验证码" prop="activeCode" class="required">
      <el-input v-model="formData.activeCode" type="text" clearable>
        <template #append>
          <el-button size="large" type="primary" @click="active">验证</el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>

</template>

<script>
import {takeUserInfo} from "@/api/user";
import {activeResetPassword, resetPassword} from "@/api/login";

export default {
  components: {},
  props: {},
  data() {
    return {
      formData: {
        email: "",
        password: "",
        repassword: "",
        activeCode: "",
      },
      rules: {
        password: [{
          required: true,
          message: '字段值不可为空',
        }],
        repassword: [{
          required: true,
          message: '字段值不可为空',
        }],
      },
    }
  },
  created() {
    this.takeUserInfo();
  },
  methods: {
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) {
          return
        }
        //TODO: 提交表单
        let params = {
          email: this.formData.email,
        };
        resetPassword(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("申请成功，验证码已发到您的邮箱，请在5分钟内输入验证码激活新邮箱");
          } else {
            this.$message.error(res.msg);
          }
        });
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields()
    },
    takeUserInfo() {
      let params = {};
      takeUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.formData.email = res.data.user.email;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    active() {
      let params = {
        email: this.formData.email,
        password: this.formData.password,
        active_code: this.formData.activeCode,
      };
      activeResetPassword(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("激活成功!");
          this.formData.password = "";
          this.formData.repassword = "";
          this.formData.activeCode = "";
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
}

</script>

<style scoped>

</style>