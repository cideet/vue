/**
 * Created by sf on 2017/11/24.
 */

import jsonp from '../common/js/jsonp.js';
import {commonParam, options} from './config.js';

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });
    return jsonp(url, data, options);
}