import axios from 'axios'

// baseURL : "http://117.2.128.107:5024",
var request = axios.create({
    baseURL : "http://117.2.128.107:5024",
    // baseURL : "http://localhost:5024",
    timeout : 10000
})
request.interceptors.request.use((config)=>{
    let token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = token
    }
    return config
})
request.interceptors.response.use(function (response) {    
    return response;
  }, function (error) {
    // Do something with response error
    if(error.status == 401){
        this.$store.dispatch("user/logout").then(()=>{
            this.$router.push("/login")
          })
    }
});
 

export default request;