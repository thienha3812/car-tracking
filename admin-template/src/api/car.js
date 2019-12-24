import axios from '../ultis/axios'


export function getAllCar(){
    return axios.get('/car/getall').then((result=>{               
        return result
    })).catch(err=>{
        return err;
    })
}
export async function insertCar(data){
    return new Promise((resolve,reject)=>{
        axios.post('/car/insert',data).then((result)=>{            
            console.log(result)
            resolve(result)
        }).catch(err=>{
            console.log(err)            
            reject(new Error(err))
        })
    })
}
export function deleteCar(data){
    return new Promise((resolve,reject)=>{
        axios.post('/car/delete',data).then((result)=>{
            resolve(result)
        }).catch(err=>{
            resolve(err)
        })
    })
}
export function updateCar(data){
    console.log(data)
    return new Promise((resolve,reject)=>{
        axios.post('/car/update',data).then((result)=>{
            resolve(result)
        }).catch(err=>{
            resolve(err)
        })
    })
}
