import axios from '../ultis/axios'


export function userLogin(user){
    return new Promise((resolve,reject)=>{
        axios.post('/user/login',user).then((result)=>{            
            resolve(result.data.token)
        }).catch(err=>{    
            reject(err)
        })
    })
}

export function userLogout(){
    return axios.post('/user/logout').then((result)=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function userRegister(user){
    return axios.post('/user/register',user).then(()=>{
        return 
    }).catch(err=>{
        return err
    })
}