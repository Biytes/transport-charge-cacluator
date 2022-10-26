import { STORAGE_KEY } from '@/constant'

/**
 * 安全地获取嵌套对象的属性
 * 特别注意：为了简化判断流程，undefined 和 null 均返回 undefined
 * @param {object} target - 目标对象
 * @param {string} path - 属性路径
 * @param {any} defaultValue - 默认值
 * @return {any} 目标属性
 */
export function path(target, _path, defaultValue) {
    // 判断是否为无值，即 undefined 或者 null
    const isNil = value => value === null || value === undefined;
    const value = _path
        .split('.')
        .reduce((last, key) => (key && last && !isNil(last[key]) ? last[key] : undefined), target);

    return isNil(value) ? defaultValue : value;
}

// 防抖
export const debounce = (fn, delay = 1000, ...rest) => {
    let timer = null; //借助闭包
    return function () {
        const that = this;
        const args = rest;
        if (!timer) {
            fn.apply(that, args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
        }, delay); // 简化写法
    };
};

/**
 * 函数节流
 * @param {function} fn - 需要节流的函数
 * @param {number} threshold - 执行间隔阈值，单位：ms
 * @return {function} 封装后的节流函数
 */
export function throttle(fn, threshold = 500) {
    // 定时器
    let timer;
    // 记录上次执行的时间
    let last = +new Date();

    return function () {
        // 保存函数调用时的上下文和参数，用于传递给 fn
        const that = this;
        const args = arguments;
        // 记录函数的调用时间
        const now = +new Date();
        clearTimeout(timer);

        // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃执行 fn，并重新计时
        if (now - last < threshold) {
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(() => {
                last = now;
                fn.apply(that, args);
            }, threshold);
        } else {
            // 在大于指定时间阈值后执行一次 fn
            last = now;
            fn.apply(that, args);
        }
    };
}

/**
 * 格式化URL参数
 * @param url
 * @param params
 * @return {string}
 */
export const formatParams = (url, params) => {
    let urlString = ''

    for (const key of Object.keys(params)) {
        if (!urlString) {
            urlString = `${urlString}?${key}=${params[key]}`
        } else {
            urlString = `${urlString}&${key}=${params[key]}`
        }
    }
    return url + urlString
}


const DEFAULT_CACHE_SPAN = 3600 * 24 * 1000 // 这里写了1000天，默认1000天


// 设置本地缓存的办法
export const setStorageSync = (key, value, seconds = DEFAULT_CACHE_SPAN ) => myCache(key, value, seconds)

/**
   * 获取本地缓存方法
   * @param key
   */
export const getStorageSync = key => {
    return myCache(key)
}

/**
 * @description 清除缓存
 * @param {*} key
 * @returns
 */
export const clearStorageSync = key => {
    const finalKey = `${STORAGE_KEY}_${key}`
    console.log(`清除${finalKey}`)
    uni.setStorageSync(finalKey, '')
}

// 缓存的函数
const myCache = (key, value, seconds) => {
    const nowTime = Date.parse(new Date()) / 1000;
    const finalKey = `${STORAGE_KEY}_${key}`

    if (finalKey && value) {
        const expire = nowTime + Number(seconds);
        uni.setStorageSync(finalKey, `${JSON.stringify(value)}|${expire}`)
        console.log(`已经把${finalKey}存入缓存,过期时间为${expire}`)
    } else if (finalKey && !value) {
        const val = uni.getStorageSync(finalKey);
        if (val) {
            // 缓存存在，判断是否过期
            const temp = val.split('|')
            if (!temp[1] || temp[1] <= nowTime) {
                uni.removeStorageSync(finalKey)
                console.log(`${finalKey}缓存已失效`)
                return '';
            }
            return JSON.parse(temp[0]);

        }
    }

}

