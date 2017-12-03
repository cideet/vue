/**
 * Created by sf on 2017/12/4.
 */

// export function shuffle(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         let j = getRandomInt(0, i);
//         let t = arr[i];
//         arr[i] = arr[j];
//         arr[j] = t;
//     }
//     return arr;
// }
//
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

export function shuffle(arr) {
    let _arr = arr.slice();
    let ret = [];
    let len = _arr.length;
    for (let i = 0; i < len; i++) {
        ret.push(_arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
    }
    return ret;
}