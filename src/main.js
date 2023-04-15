import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/styles/scss/_global.scss";
import axios from 'axios';

const baseURL = 'http://localhost:5000';
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL;
}

createApp(App).use(store).use(router).mount('#app')
