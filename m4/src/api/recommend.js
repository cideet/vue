/**
 * Created by sf on 2017/11/24.
 */

import axios from 'axios';

import jsonp from '../common/js/jsonp.js';
import {commonParams, options} from './config.js';

/**
 * 抓取QQ音乐轮播图
 * jsonp请求
 */
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });
    return jsonp(url, data, options);
}

/**
 * 获取热门歌单推荐
 * ajax请求
 */
export function getDiscList() {
    const url = '/api/getDiscList';
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    });
    return axios.get(url, {params: data}).then((res) => {
        return Promise.resolve(res.data)
    })
}

/**
 * 获取歌曲列表
 * @param disstid
 */

export function getSongList(disstid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        g_tk: 1312469004,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        loginUin: 0,
        format: 'jsonp'
    })

    //return jsonp(url, data, options)
    return jsonp(url, data, Object.assign({}, options, {name: 'playlistinfoCallback'}));
}


// export function getSongList(disstid) {
//     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
//
//     const data = Object.assign({}, commonParams, {
//         type: 1,
//         json: 1,
//         utf8: 1,
//         onlysong: 0,
//         disstid,
//         g_tk: 1312469004,
//         loginUin: 0,
//         hostUin: 0,
//         platform: 'yqq',
//         needNewCode: 0,
//         format: 'jsonp'
//     });
//
//     return jsonp(url, data, Object.assign({}, options, {name: 'playlistinfoCallback'}));
// }
