import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Telefoonnummer from '../views/Auth/Telefoonnummer.vue'
import Code from '../views/Auth/Code.vue'
import Age from '../views/Auth/Age.vue'
import Done from '../views/Auth/Done.vue'
import Match from '../views/Match/Match'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/telefoonnummer',
      name: 'Telefoonnummer',
      component: Telefoonnummer
   },
   {
      path: '/code',
      name: 'Code',
      component: Code,
      beforeEnter: (_, __, next) => {
         if(!store.getters['user/verificationId']){
            next({
               name:'Telefoonnummer'
            })
         }else{
            next()
         }
      }
   },
   {
      path: '/age',
      name: 'Age',
      component: Age,
      beforeEnter: (_, __, next) => {
         if(!store.getters['user/user']){
            next({
               name:'Code'
            })
         }else{
            next()
         }
      }
   },
   {
      path: '/done',
      name: 'Done',
      component: Done
   },
   {
      path: '/match',
      name: 'Match',
      component: Match,
      // beforeEnter: (_, __, next) => {
      //    if(!store.getters['user/user']){
      //       next({
      //          name:'Age'
      //       })
      //    }else{
      //       next()
      //    }
      // }
   },
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router