<template>
  <div class="sidebar">
    <el-menu
      :default-active="defaultActive"
      router
      class="sidebar-el-menu"
      background-color="#fff"
      text-color="#333"
      active-text-color="#6190e8"
      unique-opened
    >
      <el-menu-item index="user_info">
        <el-icon><icon-menu /></el-icon>
        <span slot="title" class="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="reset_password">
        <el-icon><icon-menu /></el-icon>
        <span slot="title" class="title">重置密码</span>
      </el-menu-item>
      <el-menu-item index="change_email">
        <el-icon><icon-menu /></el-icon>
        <span slot="title" class="title">更换邮箱</span>
      </el-menu-item>
      <el-menu-item v-if="characterType === '2'" index="doctor_info">
        <el-icon><document /></el-icon>
        <span slot="title" class="title">医生信息</span>
      </el-menu-item>
      <el-menu-item v-if="characterType === '1'" index="my_inquiries">
        <el-icon><setting /></el-icon>
        <span slot="title" class="title">我的问诊</span>
      </el-menu-item>
      <el-menu-item v-if="characterType === '2'" index="my_suggestions">
        <el-icon><setting /></el-icon>
        <span slot="title" class="title">我的诊断</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "userSidebar",
  data() {
    return {
      characterType: '1',
    }
  },
  created() {
    this.characterType = localStorage.getItem("character_type");
  },
  computed: {
    defaultActive() {
      return this.$route.path.split('/').reverse()[1];
    },
  },
  methods: {
    handleSelect(val) {
      this.$router.push("/user_center/"+val);
    },
  },
};
</script>

<style scoped>
.sidebar {
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  height: 100vh;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}

.title {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 18px;
}

.el-menu-item {
  border-left: #fff solid 6px;
}
/* 设置鼠标悬停时el-menu-item的样式 */
.el-menu-item:hover {
  border-left: #6190e8 solid 6px !important;
  background-color: #e2eff9 !important;
  color: #6190e8 !important;
}

.el-menu-item:hover i {
  color: #6190e8;
}

/* 设置选中el-menu-item时的样式 */
.el-menu-item.is-active {
  border-left: #6190e8 solid 6px !important;
  background-color: #e2eff9 !important;
  color: #6190e8 !important;
}
</style>
