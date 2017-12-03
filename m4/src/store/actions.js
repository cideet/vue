/**
 * Created by sf on 2017/12/1.
 */
//一种是异步操作
//另一种是对mutation的封装

import * as types from './mutation-types.js';

/**
 * 选择播放
 * 第一个参数是actions的对象，可以解构为commit和state
 * 第二个参数是传递过来的参数
 * @param commit
 * @param state
 * @param list
 * @param index
 * 提交mutation
 */
export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list);      //播放顺序列表
    commit(types.SET_PLAY_LIST, list);           //播放的音乐列表
    commit(types.SET_CURRENT_INDEX, index);     //当前播放的索引
    commit(types.SET_FULL_SCREEN, true);        //是否全屏
    commit(types.SET_PLAYING_STATE, true);      //播放状态
};