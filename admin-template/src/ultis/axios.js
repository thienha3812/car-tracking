import axios from 'axios'


var config = axios.create({
    baseURL : "http://localhost:5024",
    timeout : 10000
})

export default config;