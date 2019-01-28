/**
 * Created by zhangsf on 2019/1/28.
 */

import * as types from './mutations-type.js';

const mutations = {
    [types.SET_USERNAME](state, username){
        state.username = username;
    },

    [types.SET_TOKEN](state, token){
        state.token = token;
    },

    [types.SET_USERIMG](state, userimg){
        state.userimg = userimg;
    }
};

export default mutations;