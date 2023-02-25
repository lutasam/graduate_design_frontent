<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-main class="center">
      <el-image style="width: 100%; height: 250px" :src="bgImgUrl"></el-image>
      <el-row :span="24">
        <el-col :span="4">
          <user-sidebar></user-sidebar>
        </el-col>
        <el-col :span="20">
          <div class="main">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-col>
      </el-row>
    </el-main>

  </div>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import UserSidebar from "@/components/UserSidebar.vue";
import collapse from "element-ui/packages/collapse";
import CommonTags from "@/components/common/commonTags.vue";

export default {
  name: "user_center",
  computed: {
    collapse() {
      return collapse
    }
  },
  components: {UserSidebar, HeaderNavBar},
  data() {
    return {
      bgImgUrl: require("../../assets/images/header_img.jpg")
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
.center .main {
  width: 100%;
  height: 100vh;
  padding-top: 20px;
  padding-left: 10px;
}
</style>