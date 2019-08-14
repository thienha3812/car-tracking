import {userLogin} from '../../api/user';
export default {
    login({commit},user){        
        return new Promise((resolve,reject)=>{
            userLogin(user).then(token=>{                
                commit("loginSuccess",token)
                resolve("Đăng nhập thành công")
            }).catch(err=>{
                resolve(new Error("Đăng nhập thất bại"))
            })
        })
    }   
}
