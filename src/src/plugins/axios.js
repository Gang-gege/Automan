import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
axios.interceptors.response.use(res => res.data)
Vue.prototype.$axios = axios
export default axios