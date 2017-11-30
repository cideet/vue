/**
 * Created by sf on 2017/12/1.
 */

import * as types from './mutation-types.js';

const mutations = {
    /**
     * 修改state中的singer
     * @param state 当前状态树的state，对应的就是state.js
     * @param singer 提交给mutation的参数
     */
    [types.SET_SINGER](state, singer){
        state.singer = singer;
    }
};

export default mutations;