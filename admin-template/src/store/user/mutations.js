export default {
    loginSuccess(state,payload){        
        localStorage.setItem("token",payload)
        state.token = payload        
    }
}