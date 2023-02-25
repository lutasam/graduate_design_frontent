import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../pages/home"),
      meta: { title: "首页" },
    },
    {
      path: "/login",
      component: () => import("../pages/login"),
      meta: { title: "登录" },
    },
    {
      path: "/find_hospitals",
      component: () => import("../pages/find_hospitals"),
      meta: { title: "找医院" },
    },
    {
      path: "/find_doctors",
      component: () => import("../pages/find_doctors"),
      meta: { title: "找医生" },
    },
    {
      path: "/online_inquiry",
      component: () => import("../pages/online_inquiry"),
      meta: { title: "在线问诊" },
    },
    {
      path: "/ask_us",
      component: () => import("../pages/ask_us"),
      meta: { title: "联系我们" },
    },
    {
      path: "/talk",
      component: () => import("../pages/talk"),
      meta: { title: "问诊通话" },
    },
    {
      path: "/hospital_detail/:id",
      component: () => import("../pages/hospital_detail"),
      meta: { title: "医院详情" },
    },
    {
      path: "/doctor_detail/:id",
      component: () => import("../pages/doctor_detail"),
      meta: { title: "医生详情" },
    },
    {
      path: "/inquiry_detail/:id",
      component: () => import("../pages/inquiry_detail"),
      meta: { title: "问诊详情" },
    },
    {
      path: "/create_inquiry",
      component: () => import("../pages/create_inquiry"),
      meta: { title: "发布问诊" },
    },
    {
      path: "/user_center",
      component: () => import("../pages/user_center"),
      meta: {title: "个人中心"},
      redirect: "/user_center/user_info",
      children: [
        {
          path: "user_info",
          component: () => import("../pages/user_center/user_info"),
          meta: { title: "个人信息" },
        },
        {
          path: "reset_password",
          component: () => import("../pages/user_center/reset_password"),
          meta: { title: "重置密码" },
        },
        {
          path: "change_email",
          component: () => import("../pages/user_center/change_email"),
          meta: { title: "更换邮箱" },
        },
        {
          path: "doctor_info",
          component: () => import("../pages/user_center/doctor_info"),
          meta: { title: "医生信息" },
        },
        {
          path: "my_inquiries",
          component: () => import("../pages/user_center/my_inquiries"),
          meta: { title: "我的问诊" },
        },
        {
          path: "my_suggestions",
          component: () => import("../pages/user_center/my_suggestions"),
          meta: { title: "我的诊断" },
        },
      ]
    },
  ],
});
