import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '@/components/Hello1'
import HelloWorld2 from '@/components/Hello2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld1',
      component: HelloWorld
    },
    {
      path: '/h1',
      name: 'HelloWorld1',
      component: HelloWorld1
    },
    {
      path: '/h2',
      name: 'HelloWorld2',
      component: HelloWorld2
    }
  ]
})
