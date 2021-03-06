/**
 * Created by sf on 2017/12/13.
 */

import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;
const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;
const FAVORITE_KEY = '__favorite__';
const FAVORITE_LENGTH = 200;

/**
 * 插入数组
 * @param arr
 * @param val 要存的值
 * @param compare 比较函数
 * @param maxLen 最大值
 */
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare);
    //findIndex是ES6的方法，查找数组中是否有某个元素
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);  //删掉
    }
    arr.unshift(val);  //插入到第一个元素
    if (maxLen && arr.length > maxLen) {
        arr.pop();  //删除最后一个元素
    }
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

export function saveSearch(query) {
    let searchs = storage.get(SEARCH_KEY, []);
    insertArray(searchs, query, (item) => {
        return item === query;
    }, SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY, searchs);
    return searchs;
}

/**
 * 获取localstorage
 * @returns {*}
 */
export function loadSearch() {
    return storage.get(SEARCH_KEY, []);
}

/**
 * 删除localstorage
 * @param query
 * @returns {*}
 */
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query;
    });
    storage.set(SEARCH_KEY, searches);
    return searches;
}

export function clearSearch() {
    storage.remove(SEARCH_KEY);
    return [];
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, PLAY_MAX_LENGTH);

    storage.set(PLAY_KEY, songs);

    return songs;
}

export function loadPlay() {
    return storage.get(PLAY_KEY, []);
}

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, []);
    insertArray(songs, song, (item) => {
        return song.id === item.id;
    }, FAVORITE_LENGTH);
    storage.set(FAVORITE_KEY, songs);

    return songs;
}

export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, []);
    deleteFromArray(songs, (item) => {
        return song.id === item.id;
    });
    storage.set(FAVORITE_KEY, songs);

    return songs;
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, []);
}
