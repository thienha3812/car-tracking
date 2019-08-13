import axios from 'axios'


var config = axios.create({
    baseURL : "http://117.2.128.107:5024",
    timeout : 5000
})
axios.interceptors.request
export default config;