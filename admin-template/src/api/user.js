import axios from '../ultis/axios'


export function userLogin(){
    return axios.post('/user/login').then((result)=>{
        return result.data.token
    }).catch(err=>{
        return err
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