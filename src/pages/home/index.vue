<template>
  <div>
    <header-nav-bar></header-nav-bar>
    <el-image style="width: 100%; height: 100%; opacity: 0.8" :src="this.homeBackground" fit="fill"></el-image>
  </div>
</template>

<script>
import headerNavBar from "@/components/HeaderNavBar.vue";

export default {
  components: {
    headerNavBar,
  },
  data(){
    return {
      homeBackground: require('../../assets/images/login_bg.jpg'),
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>