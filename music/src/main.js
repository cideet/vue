/**
 * Created by sf on 2017/11/23.
 */
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';

import App from './App.vue';

import '../src/common/less/index.less';

fastclick.attach(document.body);

new Vue({
    el: '#app',
    render: (function (h) {
        return h(App)
    })
    // render:h=>h(App)
});