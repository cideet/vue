/**
 * Created by sf on 2017/11/23.
 */

import Vue from 'vue';
import Router from 'vue-router';

import Home from '../containers/home/index.vue';
import Login from '../containers/Login/index.vue';

Vue.use(Router);

export default new Router({

    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {path: '/home', component: Home},
        {path: '/login', component: Login},
    ]
})
