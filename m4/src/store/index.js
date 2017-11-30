/**
 * Created by sf on 2017/12/1.
 */

import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions.js';
import * as getters from './getters.js';
import * as state from './state.js';
import mutations from './mutations.js';
import createLogger from 'vuex/dist/logger'; //修改日志

// vue注册vuex插件
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export  default new Vuex.Store({
    actions: actions,
    getters: getters,
    state: state,
    mutations: mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})