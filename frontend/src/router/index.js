import Vue from 'vue'
import VueRouter from 'vue-router'
import signLog from "@/components/signLog";
import userLogin from "@/components/userLogin";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signLog',
    component: signLog
  },
  {
    path: '/id',
    name: 'userLogin',
    component: userLogin
  }
]

const router = new VueRouter({
  routes
})

export default router
