import axios from 'axios'


var config = axios.create({
    baseURL : "http://localhost:4000",
    timeout : 5000
})

export default config;