<template>
  <div class="wrapper">
    <!-- 页面头部部分 -->
    <div class="header">
      <el-image class="logo" :src="logoUrl"></el-image>
      <div class="name">找大夫在线</div>
      <!-- 水平一级菜单 -->
      <div style="float:left;">
        <el-menu
            mode="horizontal"
            text-color="#000000"
            active-text-color="#3989fa"
            @select="handleSelect">
          <el-menu-item v-for="(item, index) in itemList" :index="item.path" :key="index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="header-right">
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="user-avatar">
            <img :src="user.avatar"/>
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link"> {{ user.name }} <i class="el-icon-caret-bottom"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user_center">个人中心</el-dropdown-item>
              <el-dropdown-item command="talk">问诊对话</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { takeUserInfo } from "@/api/user";

export default {
  name: "headerNavBar",
  data(){
    return{
      itemList: [    // 水平一级菜单栏的菜单
        { path: '/home', title: '首页' },
        { path: '/find_hospitals', title: '找医院' },
        { path: '/find_doctors', title: '找医生' },
        { path: '/online_inquiry', title: '在线问诊' },
        { path: '/ask_us', title: '联系我们' },
      ],
      logoUrl: require("../assets/images/logo.png"),
      user: {
        name: "小王",
        avatar: require("../assets/images/logo.png"),
      },
    }
  },
  created() {
    this.takeUserInfo();
  },
  methods: {
    handleSelect(path) {  // 切换菜单栏
      this.$router.push({
        path: path
      });
    },
    handleCommand(command) {  // 用户名下拉菜单选择事件
      if (command === 'logout') {
        this.$router.push({
          path: '/login'
        });
      } else if (command === 'user_center') {
        this.$router.push({
          path: '/user_center'
        });
      } else if (command === 'talk') {
        this.$router.push({
          path: '/talk'
        });
      }
    },
    takeUserInfo() {
      let params = {};
      takeUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.user = res.data.user;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
}
.header .logo {
  float: left;
  margin-left: 60px;
  margin-top: 14px;
  height: 40px;
  width: 40px;
  vertical-align: middle;
}
.header .name {
  float: left;
  margin-left: 5px;
  margin-top: 18px;
  height: 29px;
  width: 160px;
  vertical-align: middle;
}
/* --------------- 用户头像区域的样式 ---------------- */
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}
.user-avatar {
  margin-left: 20px;
}
.user-avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  float: left;
  margin-left: 50px;
  margin-top: 5px;
  background: transparent;
}
.el-menu--horizontal > .el-menu-item.is-active {
  /* border-bottom: 2px solid #3989fa;
  color: #3989fa; */
  font-weight: bold;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
}
</style>