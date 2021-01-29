import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Addtrip from '../views/Addtrip.vue'
import Mytrips from '../views/Mytrips.vue'
import Viewtrip from '../views/Viewtrip.vue'
import Myspots from '../views/Myspots.vue'
import Addspot from '../views/Addspot.vue'
import Editspot from '../views/Editspot.vue'
import Targetspecies from '../views/Targetspecies.vue'
import Addspecies from '../views/Addspecies.vue'
import Editspecies from '../views/Editspecies.vue'
import Flybox from '../views/Flybox.vue'
import Addfly from '../views/Addfly.vue'
import Editfly from '../views/Editfly.vue'
import Conditions from '../views/Conditions.vue'
import Stats from '../views/Stats.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/mytrips/addtrip',
    name: 'Addtrip',
    component: Addtrip
  },
  {
    path: '/mytrips',
    name: 'Mytrips',
    component: Mytrips
  },
  {
    path: '/mytrips/:id',
    name: 'Viewtrip',
    component: Viewtrip
  },
  {
    path: '/myspots',
    name: 'Myspots',
    component: Myspots
  },
  {
    path: '/myspots/addspot',
    name: 'Addspot',
    component: Addspot
  },
  {
    path: '/myspots/editspot/:id',
    name: 'Editspot',
    component: Editspot
  },
  {
    path: '/targetspecies',
    name: 'Targetspecies',
    component: Targetspecies,
  },
  {
    path: '/targetspecies/addspecies',
    name: 'Addspecies',
    component: Addspecies,
  },
  {
    path: '/targetspecies/editspecies/:id',
    name: 'Editspecies',
    component: Editspecies,
  },
  {
    path: '/flybox',
    name: 'Flybox',
    component: Flybox,
  },
  {
    path: '/flybox/addfly',
    name: 'Addfly',
    component: Addfly,
  },
  {
    path: '/flybox/editfly/:id',
    name: 'Editfly',
    component: Editfly,
  },
  {
    path: '/conditions',
    name: 'Conditions',
    component: Conditions
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
