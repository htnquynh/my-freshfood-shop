import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "./index.css";
import "virtual:windi-utilities.css";
import Chat from 'vue3-beautiful-chat'

// vuex
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(Chat);


app.config.globalProperties.$filters = {
  toVND: function (value) {
    if (typeof value !== "number") {
      value = parseInt(value);
    }
    var formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  },
  toCODE: function (value) {
    return "#" + value.slice(-5);
  },
  toDateTime: function (value) {
    var date = new Date(value);
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    };
    return new Intl.DateTimeFormat("en-BG", options).format(date);
  },
};

app.mount("#app");
