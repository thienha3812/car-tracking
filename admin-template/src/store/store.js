import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user/index';



Vue.use(Vuex)



export default new Vuex({
    modules : {
        user : userModule        
    }
})