import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";
// import { socketUrl} from "./request/server";

import "./assets/styles/common/common.scss";
import "./assets/styles/common/animation.scss";
import "./assets/styles/PageCommon.scss";

Vue.config.productionTip = false;
console.log(process.env.NODE_ENV);
let socketUrl =
  process.env.NODE_ENV === "development" ? "" : "http://localhost:8900";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(socketUrl),
  })
);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
