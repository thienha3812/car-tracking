import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './user/index';


Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        user : userModule
    }
});

export default store;