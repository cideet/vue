/**
 * Created by sf on 2017/12/1.
 */

import * as types from './mutation-types.js';

const mutations = {

    // 修改state中的singer
    // @param state 当前状态树的state，对应的就是state.js
    // @param singer 提交给mutation的参数
    [types.SET_SINGER](state, singer){
        state.singer = singer;
    },

    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAY_LIST](state, list) {
        state.playList = list;
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list;
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [types.SET_DISC](state, disc){
        state.disc = disc;
    },
    [types.SET_TOP_LIST](state, topList){
        state.topList = topList;
    }
};

export default mutations;