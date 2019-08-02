import axios from '../ultis/axios'


export function getAllCar(data){
    return axios.get('/cars/getall').then((result=>{       
        return result
    })).catch(err=>{
        return err;
    })
}
export async function insertCar(data){
    return axios.post('/cars/insert',data).then((result)=>{
        return result
    }).catch(err=>{
        return err;
    })
}
export function deleteCar(data){
    return axios.post('/cars/delete',data).then((result)=>{
        return result
    }).catch(err=>{
        return err;
    })
}
