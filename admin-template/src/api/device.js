import axios from '../ultis/axios'


export function getDeviceOnline(){
    return axios({
        url : "/device/getdeviceonline",
        method : "GET"
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}