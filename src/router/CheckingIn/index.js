export default {
  path: "/attendance",
  name: "home",
  redirect: "/attendance/myAttendance",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
  children: [
    { path: "user", component: () => import("@/views/CheckingIn/User.vue") },
    {
      path: "attendanceGroup",
      component: () => import("@/views/CheckingIn/AttendanceGroup.vue")
    },
    {
      path: "attendanceStatus",
      component: () => import("@/views/CheckingIn/AttendanceStatus.vue")
    },
    {
      path: "myAttendance",
      component: () => import("@/views/CheckingIn/MyAttendance.vue")
    }
  ]
};
