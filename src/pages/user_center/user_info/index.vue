<template>
  <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="150px"
           size="default" @submit.native.prevent>
    <el-form-item label="头像" prop="avatar">
      <el-upload :file-list="avatarFileList" :headers="avatarUploadHeaders" :data="avatarUploadData"
                 list-type="picture-card" show-file-list :limit="1"> <template #default><i
          class="el-icon-plus"></i></template></el-upload>
    </el-form-item>
    <el-form-item label="用户id" prop="id">
      <el-input v-model="formData.id" readonly="true" type="text"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" type="text" clearable></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="formData.sex">
        <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                  :disabled="item.disabled" style="{display: inline}">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-date-picker v-model="formData.birthday" type="date" clearable></el-date-picker>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" readonly="true" type="text"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone_number">
      <el-input v-model="formData.phone_number" type="text" clearable></el-input>
    </el-form-item>
    <el-form-item label="所在城市" prop="city">
      <el-select v-model="formData.city" clearable>
        <el-option v-for="(item, index) in cityOptions" :key="index" :label="item.label" :value="item.value"
                   :disabled="item.disabled"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input type="textarea" v-model="formData.address" rows="3"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="large" @click="submitForm">更新</el-button>
      <el-button type="info" size="large" @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import {takeUserInfo, updateUserInfo} from "@/api/user";

export default {
  components: {},
  props: {},
  data() {
    return {
      formData: {
        avatar: null,
        id: "",
        name: "",
        sex: 3,
        birthday: null,
        email: "",
        phone_number: "",
        city: 4,
        address: "",
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空',
        }],
        sex: [{
          required: true,
          message: '字段值不可为空',
        }],
        birthday: [{
          required: true,
          message: '字段值不可为空',
        }],
        phone_number: [{
          pattern: /^[1][3-9][0-9]{9}$/,
          trigger: ['blur', 'change'],
          message: '请输入合法的手机号'
        }],
      },
      sexOptions: [{
        "label": "男",
        "value": 1
      }, {
        "label": "女",
        "value": 2
      }, {
        "value": 3,
        "label": "其他"
      }],
      cityOptions: [{
        "label": "北京",
        "value": "北京"
      }, {
        "label": "上海",
        "value": "上海"
      }, {
        "label": "武汉",
        "value": "武汉"
      }, {
        "value": "深圳",
        "label": "深圳"
      }],
      avatarFileList: [],
      avatarUploadHeaders: {},
      avatarUploadData: {},
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
          phone_number: this.formData.phone_number,
          name: this.formData.name,
          avatar: this.formData.avatar,
          birthday: this.formData.birthday,
          sex: this.formData.sex,
          city: this.formData.city,
          address: this.formData.address,
        };
        updateUserInfo(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("更新成功!");
            this.takeUserInfo();
          } else {
            this.$message.error(res.msg);
          }
        });
      })
    },
    resetForm() {
      this.takeUserInfo();
    },
    takeUserInfo() {
      let params = {};
      takeUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.formData = res.data.user;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

  }
}

</script>

<style>

</style>