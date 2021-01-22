import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import request from "./utils/https";
ElementUI.Dialog.props.closeOnClickModal.default = false;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$request = request;

// 时间过滤器
Vue.filter("dataFormat", function(originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");
  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
