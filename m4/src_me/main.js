/**
 * Created by sf on 2017/11/23.
 */
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import router from './router/index.js';
import VueLazyload from 'vue-lazyload';
import store from './store/index.js';

import App from './App.vue';

import '../src/common/less/index.less';

fastclick.attach(document.body);

// 图片懒加载
Vue.use(VueLazyload, {
    loading: require('common/images/default.jpg')
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: (function (h) {
        return h(App)
    })
    // render:h=>h(App)

});