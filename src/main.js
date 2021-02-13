import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import firebaseConfig from '../private/firebase_credentials'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueGoogleCharts from 'vue-google-charts'
import '../public/styles.scss'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueGoogleCharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
