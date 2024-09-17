import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./global-components";
import "./utils";
import "./libs";
import axios from "axios";
import vSelect from 'vue-select'

// 
import "./assets/sass/app.scss";
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

// Vue.config.devtools = false;

Vue.component('v-select', vSelect)

// const baseURL = `https://api.noszelda.eu`;
const baseURL = `http://localhost:8000`;

const token = localStorage.getItem('token');

if (typeof baseURL !== `undefined`) {
  axios.defaults.baseURL = baseURL;
}

if(!token){
  axios.defaults.headers = {
    "Content-Type": "application/json",
    token: token,
  };
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
