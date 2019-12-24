import axios from '../ultis/axios'




export function getAllCategory(){
    return axios({
        url : "/category/getall",
        method : "GET"        
    }).then((result)=>{
        return result;
    }).catch(err=>{
        return err;
    })
}