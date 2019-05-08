import Vue from "vue";
import App from "./App";
import axios from 'axios'
import router from "./router/index";
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import Vuetify from 'vuetify';
import { store } from './store';
import JsonViewer from 'vue-json-viewer'
import Notifications from 'vue-notifyjs'





const socketInstance = io('http://165.132.105.28:3000', {
  transports: ['websocket'],
});

Vue.use(JsonViewer);
Vue.use(new VueSocketIO({ debug: true, connection: socketInstance }));
Vue.use(Vuetify);
Vue.use(Notifications);

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import 'vuetify/dist/vuetify.min.css'


Vue.prototype.$http = axios

Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
