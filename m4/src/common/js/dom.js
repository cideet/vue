/**
 * Created by sf on 2017/11/24.
 */

/**
 * 添加样式
 * @param el
 * @param className
 */
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

/**
 * 判断节点是否包含某个样式
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className);
}

/**
 * 节点设置或获取自定义属性
 * @param el
 * @param name
 * @param val
 * @returns {*}
 */
export function attr(el, name, val) {
    name = 'data-' + name;
    if (val) {
        return el.setAttribute(name, val);
    } else {
        return el.getAttribute(name);
    }
}

/**
 * 浏览器检测
 * @type {CSSStyleDeclaration}
 */
let elementStyle = document.createElement('div').style;
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();
export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}