import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//impordime momendi
import moment from "moment";

//modali jaoks Vmodal plugin
//import VModal from 'vue-js-modal'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './routes/router';

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Modali jaoks Vmodal
//Vue.use(VModal)

Vue.prototype.$moment = moment;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
