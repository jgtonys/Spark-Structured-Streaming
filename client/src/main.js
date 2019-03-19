import Vue from "vue";
import App from "./App";
import axios from 'axios'
import router from "./router/index";
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

const socketInstance = io('http://localhost:8090', {
  transports: ['websocket'],
});

Vue.use(new VueSocketIO({ debug: true, connection: socketInstance }))

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.prototype.$http = axios

Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
