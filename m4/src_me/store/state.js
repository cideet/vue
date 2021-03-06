/**
 * Created by sf on 2017/12/1.
 */

import {playMode} from '../common/js/config.js';
import {loadSearch} from '../common/js/cache.js';

const state = {
    singer: {},  //歌手
    playing: false,  //播放状态
    fullScreen: false,  //是否全屏
    playList: [],  //播放的音乐列表
    sequenceList: [],  //播放顺序列表
    mode: playMode.sequence,  //播放模式
    currentIndex: -1,  //当前播放的索引
    disc: {},  //歌单
    topList: {},
    searchHistory: loadSearch()  //搜索历史
};

export default state;