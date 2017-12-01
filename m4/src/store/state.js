/**
 * Created by sf on 2017/12/1.
 */

import {playMode} from 'common/js/config.js';

const state = {
    singer: {},  //歌手
    playing: false,  //播放状态
    fullScreen: false,  //是否全屏
    playList: [],  //播放的音乐列表
    sequenclList: [],  //播放顺序列表
    mode: playMode.sequence,  //播放模式
    currentIndex: -1  //当前播放的索引
};

export default state;