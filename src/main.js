import './assets/scss/index.scss'

import Vue from 'vue'
import Master from './components/layouts/Master.vue'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import { ValidationObserver } from 'vee-validate'

import routes from './routes'
import VueRouter from 'vue-router'
import { store } from './store/store'

window.eventBus = new Vue()

Vue.component('ValidationProvider',ValidationProvider)
Vue.component('ValidationObserver',ValidationObserver)

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
      if(!store.getters.loggedIn){
        next({
          name: 'login'
        })
      }else{
        next()
      }
    }
    else if(to.matched.some(record => record.meta.requiresVisitor)){
      if(store.getters.loggedIn){
        next({
          name: 'todo'
        })
      }else{
        next()
      }
    }
    else{
      next()
    }
})




new Vue({
  render: h => h(Master),
  store:store,
  router:router
}).$mount('#app')
