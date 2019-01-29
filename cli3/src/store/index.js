/**
 * Created by zhangsf on 2019/1/28.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'; // 修改日志
import * as actions from './actions.js';
import * as getters from './getters.js';
import state from './state.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug, // 开启严格模式 只在开发环境下使用
    plugins: debug ? [createLogger()] : []
});