import actions from './actions'
import getters from './getters'
import mutations from './mutations'


const userModule = {
    state : {
        token : localStorage.getItem("token")  || "",
        user : "123"
    },
    actions,
    getters,
    mutations
}
export  default userModule