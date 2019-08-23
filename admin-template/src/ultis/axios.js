import axios from 'axios'


var request = axios.create({
    baseURL : "http://117.2.128.107:5024",
    timeout : 10000
})
request.interceptors.request.use((config)=>{
    let token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = token
    }
    return config
})
 

export default request;