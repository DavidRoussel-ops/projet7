import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Groupomania from '../components/Groupomania'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign',
    name: 'Inscription',
    component: SignUp
  },
  {
    path: '/log',
    name: 'Connexion',
    component: Login
  },
  {
    path: '/groupomania',
    name: 'Groupomania',
    component: Groupomania
  }
]

const router = new VueRouter({
  routes
})

export default router
