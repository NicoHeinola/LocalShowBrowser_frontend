import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/styles/scss/global.scss";
import axios from 'axios';
import vuexmixin from './store/vuexmixin';

const baseURL = 'http://localhost:5000';
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL;
}

const log = (...args) => {
    console.log([...args]);
}

window.log = log;


const app = createApp(App);
app.use(store);
app.use(router);
app.mixin(vuexmixin);

if (localStorage.getItem("token")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
}

app.mount('#app')
