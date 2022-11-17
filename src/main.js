import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/common/comm.scss";
import "@/assets/icon/font.scss";
import "@/utill/directives";
import Scroll from "@/components/Bs_Scroll/BS_Scroll.vue";
Vue.component("BS_Scroll", Scroll);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
