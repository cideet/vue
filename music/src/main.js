/**
 * Created by sf on 2017/11/23.
 */

import Vue from 'vue';

import App from './App.vue';

// import '../src/common/less/index.less';

new Vue({
    el: '#app',
    render: (function (h) {
        return h(App)
    })
    // render:h=>h(App)
});