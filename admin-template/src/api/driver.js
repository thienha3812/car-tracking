import axios from '../ultis/axios'


export function getAllDriver(data){
    return axios.get('/drivers/getall').then((result=>{       
        return result
    })).catch(err=>{
        return err;
    })
}
export async function insertDriver(data){
    return axios.post('/drivers/insert',data).then((result)=>{
        return result
    }).catch(err=>{
        console.log(err)
        return err
    })
}
export function deleteDriver(data){
    return axios.post('/drivers/delete',data).then((result)=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function updateDriver(data){
    return axios.post('/drivers/update',data).then((result)=>{
        return result
    }).catch(err=>{
        return err;
    });
}