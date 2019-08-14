import axios from '../ultis/axios'


export function getAllCar(){
    return axios.get('/car/getall').then((result=>{       
        console.log(result)
        return result
    })).catch(err=>{
        return err;
    })
}
export async function insertCar(data){
    return axios.post('/car/insert',data).then((result)=>{
        return result
    }).catch(err=>{
        return err;
    })
}
export function deleteCar(data){
    return axios.post('/car/delete',data).then((result)=>{
        return result
    }).catch(err=>{
        return err;
    })
}
