import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import https from "./utils/https";
ElementUI.Dialog.props.closeOnClickModal.default = false;

Vue.config.productionTip = false;
Vue.prototype.$https = https;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
