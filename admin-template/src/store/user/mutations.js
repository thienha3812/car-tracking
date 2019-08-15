
export default {
    loginSuccess(state,token){          
        localStorage.setItem("token",token)
        state.token = token        
    }
}