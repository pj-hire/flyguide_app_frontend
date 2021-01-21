import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';
import '../public/styles.scss'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD5qaGG_7LBVBC90vOsqwyOr4M3W3ZVHI",
  authDomain: "fly-guide-app.firebaseapp.com",
  projectId: "fly-guide-app",
  storageBucket: "fly-guide-app.appspot.com",
  messagingSenderId: "920264779850",
  appId: "1:920264779850:web:b9176fa9678638a201deb3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Bootstrap Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
