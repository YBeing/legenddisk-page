import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/admin/Login'
import Index from '@/components/file/Index'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/Index',
      name: 'Index',
      component: Index
    }

  ]
})
