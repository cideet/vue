/**
 * Created by sf on 2017/11/23.
 */
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import router from './router/index.js';

import App from './App.vue';

import '../src/common/less/index.less';

fastclick.attach(document.body);

new Vue({
    el: '#app',
    router: router,
    render: (function (h) {
        return h(App)
    })
    // render:h=>h(App)

});