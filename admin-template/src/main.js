// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

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


//Store 
import store from './store/store'

const options = { name: 'lodash' } // customize the way you want to call it
//
Vue.use(ElementUI, { locale });
//
Vue.use(VueLodash, options) // options is optional
//
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
