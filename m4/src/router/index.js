/**
 * Created by sf on 2017/11/23.
 */

import Vue from 'vue';
import Router from 'vue-router';

import Recommend from '../components/recommend/index.vue';
import Singer from '../components/singer/index.vue';
import Search from '../components/search/index.vue';
import Rank from '../components/rank/index.vue';
import SingerDetail from '../components/singer-detail/index.vue';

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
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/rank',
            component: Rank
        }
    ]
})
