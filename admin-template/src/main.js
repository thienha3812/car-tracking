
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

//import js

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
// Gg map
import * as VueGoogleMaps from 'vue2-google-maps'
//Vue material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
//Lodash
import VueLodash from 'vue-lodash'
// Elemenetial
import locale from 'element-ui/lib/locale/lang/vi'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Axios config

import axios from './ultis/axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(VueLodash)
//Store 
import store from './store/store'
import { Script } from "vm";

const options = { name: 'lodash' } // customize the way you want to call it
//
Vue.use(ElementUI)

Vue.use(VueMaterial)
// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

//

router.beforeEach((to,from,next)=>{
  if(to.path !== '/login' && !store.getters['user/isLoggedIn']){        
    next("/login")
  }
  if(to.path === '/login' && store.getters['user/isLoggedIn']){
    next("/dashboard")
  }
  next()
})

Vue.prototype.$Chartist = Chartist;
Vue.use(VueGoogleMaps, {
  load: {
    region: 'VI',
    language: 'VI',
    key: 'AIzaSyDjc2vgeLo3K-Ts3fDUzhgczsqOqHNjou8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
// Config header token
if(store.getters['user/isLoggedIn']){  
  axios.defaults.headers.common['Authorization']  = store.state.user.token
}

// Event bus
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});

