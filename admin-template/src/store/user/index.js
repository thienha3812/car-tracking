import actions from './actions'
import getters from './getters'
import mutations from './mutations'


const userModule = {
    namespaced: true,
    state : {
        token : localStorage.getItem("token")  || "",        
    },
    actions,
    getters,
    mutations
}
export  default userModule