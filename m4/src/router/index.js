import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '@/components/HelloWorld1'
import HelloWorld2 from '@/components/HelloWorld2'

Vue.use(Router)

// const Recommend = (resolve) => {
//   import('components/recommend/recommend')
//         .then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
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
});


