import axios from '../ultis/axios'



export function getLog(data){
    return axios.post('/log/getlog',data).then((result)=>{
        return result
    }).catch(err=>{
        return err
    })
}