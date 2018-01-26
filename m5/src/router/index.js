/**
 * Created by sf on 2017/11/23.
 */

import Vue from 'vue';
import Router from 'vue-router';

import Recommend from '../components/recommend/index.vue';

Vue.use(Router);

export default new Router({

    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        }
    ]
})
