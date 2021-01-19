import Vue from "vue";
import VueRouter from "vue-router";
import CheckingIn from "./CheckingIn";

Vue.use(VueRouter);

const routes = [
  CheckingIn,
  {
    path: "/",
    redirect: "/attendance"
  }
];

const router = new VueRouter({
  routes
});

export default router;
